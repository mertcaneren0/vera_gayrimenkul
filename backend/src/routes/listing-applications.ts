import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

// Validation şeması
const createListingApplicationSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  type: z.enum(["arsa", "daire"]),
  ada: z.string().optional(),
  parsel: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => {
  if (data.type === "arsa") {
    return data.ada && data.parsel;
  }
  if (data.type === "daire") {
    return data.address;
  }
  return true;
}, {
  message: "Arsa için ada ve parsel, daire için adres zorunludur"
});

const updateStatusSchema = z.object({
  status: z.enum(["pending", "reviewed", "rejected"])
});

// Başvuruları listele
router.get('/', async (req, res) => {
  try {
    const applications = await prisma.listingApplication.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Başvurular listelenirken bir hata oluştu.' });
  }
});

// Yeni başvuru oluştur
router.post('/', async (req, res) => {
  try {
    const validatedData = createListingApplicationSchema.parse(req.body);
    
    const application = await prisma.listingApplication.create({
      data: validatedData
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
    const validatedData = updateStatusSchema.parse(req.body);

    const application = await prisma.listingApplication.update({
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
    await prisma.listingApplication.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Başvuru silinirken bir hata oluştu.' });
  }
});

export const listingApplicationsRouter = router; 