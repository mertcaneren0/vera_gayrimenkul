import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/team');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Validation şemaları
const createTeamMemberSchema = z.object({
  fullName: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(10)
});

const updateTeamMemberSchema = z.object({
  fullName: z.string().min(2).optional(),
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional()
});

// Ekip üyelerini listele
router.get('/', async (req, res) => {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: 'Ekip üyeleri listelenirken bir hata oluştu.' });
  }
});

// Ekip üyesi detayı
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: req.params.id }
    });

    if (!teamMember) {
      return res.status(404).json({ error: 'Ekip üyesi bulunamadı.' });
    }

    res.json(teamMember);
  } catch (error) {
    res.status(500).json({ error: 'Ekip üyesi detayı alınırken bir hata oluştu.' });
  }
});

// Yeni ekip üyesi ekle
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const validatedData = createTeamMemberSchema.parse(req.body);
    
    if (!req.file) {
      return res.status(400).json({ error: 'Fotoğraf yüklenmedi.' });
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        ...validatedData,
        image: `/uploads/team/${req.file.filename}`
      }
    });

    res.status(201).json(teamMember);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Ekip üyesi eklenirken bir hata oluştu.' });
  }
});

// Ekip üyesini güncelle
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const validatedData = updateTeamMemberSchema.parse(req.body);
    
    const updateData: any = { ...validatedData };
    if (req.file) {
      updateData.image = `/uploads/team/${req.file.filename}`;
    }

    const teamMember = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: updateData
    });

    res.json(teamMember);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Ekip üyesi güncellenirken bir hata oluştu.' });
  }
});

// Ekip üyesini sil
router.delete('/:id', async (req, res) => {
  try {
    await prisma.teamMember.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ekip üyesi silinirken bir hata oluştu.' });
  }
});

export const teamMembersRouter = router; 