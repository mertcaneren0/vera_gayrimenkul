import { NextRequest, NextResponse } from 'next/server';

interface CareerApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  message?: string;
  createdAt: string;
}

// In-memory storage for development
let careerApplications: CareerApplication[] = [
  {
    id: '1',
    fullName: 'Mehmet Kaya',
    phone: '+90 532 123 45 67',
    email: 'mehmet.kaya@email.com',
    address: 'İstanbul, Türkiye',
    experience: '3 yıl',
    message: 'Gayrimenkul sektöründe deneyimli biriyim ve ekibinize katılmak istiyorum.',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    fullName: 'Ayşe Demir',
    phone: '+90 541 987 65 43',
    email: 'ayse.demir@email.com',
    address: 'Ankara, Türkiye',
    experience: 'Yeni mezun',
    message: 'Üniversitede işletme okudum ve kariyerime gayrimenkul sektöründe başlamak istiyorum.',
    createdAt: new Date('2024-01-10').toISOString(),
  }
];

// GET - Tüm kariyer başvurularını getir
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: careerApplications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Kariyer başvuruları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - Yeni kariyer başvurusu ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { fullName, phone, email, address, experience, message } = body;

    // Validation
    if (!fullName || !phone || !email || !address || !experience) {
      return NextResponse.json(
        { success: false, error: 'İsim, telefon, email, adres ve deneyim alanları zorunludur' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }

    // Phone validation (Turkish format)
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
    const cleanPhone = phone.replace(/\s|-|\(|\)/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir telefon numarası giriniz' },
        { status: 400 }
      );
    }

    const newApplication: CareerApplication = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      experience: experience.trim(),
      message: message ? message.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    careerApplications.push(newApplication);

    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alındı! En kısa sürede size dönüş yapacağız.',
      data: newApplication
    });

  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { success: false, error: 'Başvuru gönderilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE - Kariyer başvurusu sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Başvuru ID gerekli' },
        { status: 400 }
      );
    }

    const applicationIndex = careerApplications.findIndex(app => app.id === id);
    
    if (applicationIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Başvuru bulunamadı' },
        { status: 404 }
      );
    }

    careerApplications.splice(applicationIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Başvuru başarıyla silindi'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Başvuru silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 