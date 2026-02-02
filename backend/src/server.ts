import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Statik dosya servisi

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir!'));
    }
  }
});

// İlk admin oluştur
async function createInitialAdmin() {
  const adminExists = await prisma.admin.findUnique({
    where: { username: 'admin' }
  });

  if (!adminExists) {
    await prisma.admin.create({
      data: {
        username: 'admin',
        password: 'admin123'
      }
    });
    console.log('✅ İlk admin kullanıcısı oluşturuldu: admin / admin123');
  }
}

createInitialAdmin();

// Test route
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    message: 'Backend TypeScript ile çalışıyor!',
    status: 'success' 
  });
});

// Ana sayfa
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Plastik Cerrahi API - Server çalışıyor' });
});

// ============= DOSYA YÜKLEME =============

app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenmedi' });
    }
    
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      url: fileUrl 
    });
  } catch (error) {
    res.status(500).json({ error: 'Dosya yükleme hatası' });
  }
});

// ============= SERVİSLER =============

app.get('/api/services', async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Servisler getirilemedi' });
  }
});

app.get('/api/services/:id', async (req: Request, res: Response) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!service) {
      return res.status(404).json({ error: 'Servis bulunamadı' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Servis getirilemedi' });
  }
});

app.post('/api/services', async (req: Request, res: Response) => {
  try {
    const { title, description, price, image } = req.body;
    const service = await prisma.service.create({
      data: {
        title,
        description,
        price: price || null,
        image: image || null
      }
    });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ error: 'Hizmet eklenemedi' });
  }
});

app.put('/api/services/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, price, image } = req.body;
    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        description,
        price: price || null,
        image: image || null
      }
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Hizmet güncellenemedi' });
  }
});

app.delete('/api/services/:id', async (req: Request, res: Response) => {
  try {
    await prisma.service.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true, message: 'Hizmet silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Hizmet silinemedi' });
  }
});

// ============= RANDEVULAR =============

app.get('/api/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        service: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Randevular getirilemedi' });
  }
});

app.post('/api/appointments', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, serviceId, date, notes } = req.body;

    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { 
          name, 
          email, 
          phone: phone || null 
        }
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        serviceId: parseInt(serviceId),
        date: new Date(date),
        notes: notes || null,
        status: 'pending'
      },
      include: {
        service: true,
        user: true
      }
    });

    res.json({ 
      success: true, 
      message: 'Randevunuz başarıyla oluşturuldu!',
      appointment 
    });
  } catch (error) {
    console.error('Randevu hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Randevu oluşturulurken hata oluştu' 
    });
  }
});

app.patch('/api/appointments/:id', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const appointment = await prisma.appointment.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
      include: {
        user: true,
        service: true
      }
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Randevu güncellenemedi' });
  }
});

app.delete('/api/appointments/:id', async (req: Request, res: Response) => {
  try {
    await prisma.appointment.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true, message: 'Randevu silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Randevu silinemedi' });
  }
});

// ============= ADMIN AUTH =============

app.post('/api/admin/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Kullanıcı adı veya şifre hatalı' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Giriş başarılı',
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Giriş hatası' 
    });
  }
});

// ============= ADMIN - İSTATİSTİKLER =============

app.get('/api/admin/stats', async (req: Request, res: Response) => {
  try {
    const totalAppointments = await prisma.appointment.count();
    const pendingAppointments = await prisma.appointment.count({
      where: { status: 'pending' }
    });
    const approvedAppointments = await prisma.appointment.count({
      where: { status: 'approved' }
    });
    const totalServices = await prisma.service.count();
    const totalUsers = await prisma.user.count();

    res.json({
      totalAppointments,
      pendingAppointments,
      approvedAppointments,
      totalServices,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ error: 'İstatistikler getirilemedi' });
  }
});

// ============= GALERİ =============

app.get('/api/gallery', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const gallery = await prisma.gallery.findMany({
      where: category ? { category: category as string } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Galeri getirilemedi' });
  }
});

app.post('/api/gallery', async (req: Request, res: Response) => {
  try {
    const { title, category, beforeImage, afterImage, description } = req.body;
    const gallery = await prisma.gallery.create({
      data: {
        title,
        category,
        beforeImage,
        afterImage,
        description: description || null
      }
    });
    res.json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ error: 'Galeri eklenemedi' });
  }
});

app.delete('/api/gallery/:id', async (req: Request, res: Response) => {
  try {
    await prisma.gallery.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true, message: 'Galeri öğesi silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Galeri silinemedi' });
  }
});

app.get('/api/gallery/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.gallery.findMany({
      select: { category: true },
      distinct: ['category']
    });
    res.json(categories.map(c => c.category));
  } catch (error) {
    res.status(500).json({ error: 'Kategoriler getirilemedi' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
});