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
    cb(null, 'uploads/cvs');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Sadece PDF ve Word dosyaları yüklenebilir.'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Validation şemaları
const createApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  listingTitle: z.string().min(2)
});

const updateApplicationSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'rejected']),
  notes: z.string().optional()
});

// Başvuruları listele
router.get('/', async (req, res) => {
  try {
    const applications = await prisma.careerApplication.findMany({
      orderBy: {
        applicationDate: 'desc'
      }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Başvurular listelenirken bir hata oluştu.' });
  }
});

// Başvuru detayı
router.get('/:id', async (req, res) => {
  try {
    const application = await prisma.careerApplication.findUnique({
      where: { id: req.params.id }
    });

    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı.' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Başvuru detayı alınırken bir hata oluştu.' });
  }
});

// Yeni başvuru oluştur
router.post('/', upload.single('cv'), async (req, res) => {
  try {
    const validatedData = createApplicationSchema.parse(req.body);
    
    if (!req.file) {
      return res.status(400).json({ error: 'CV dosyası yüklenmedi.' });
    }

    const application = await prisma.careerApplication.create({
      data: {
        ...validatedData,
        cvUrl: `/uploads/cvs/${req.file.filename}`
      }
    });

    res.status(201).json(application);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Başvuru oluşturulurken bir hata oluştu.' });
  }
});

// Başvuru durumunu güncelle
router.patch('/:id', async (req, res) => {
  try {
    const validatedData = updateApplicationSchema.parse(req.body);

    const application = await prisma.careerApplication.update({
      where: { id: req.params.id },
      data: validatedData
    });

    res.json(application);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Başvuru güncellenirken bir hata oluştu.' });
  }
});

// Başvuruyu sil
router.delete('/:id', async (req, res) => {
  try {
    await prisma.careerApplication.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Başvuru silinirken bir hata oluştu.' });
  }
});

export const careerApplicationsRouter = router; 