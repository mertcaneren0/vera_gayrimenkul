import { NextRequest, NextResponse } from 'next/server';

// Geçici olarak in-memory storage kullanıyoruz
// Gerçek uygulamada bu veriler veritabanında saklanacak
let applications: any[] = [];
let nextId = 1;

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: applications 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Başvurular getirilemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Gerekli alanları kontrol et
    if (!data.fullName || !data.phone || !data.type) {
      return NextResponse.json(
        { success: false, error: 'Ad Soyad, Telefon ve Gayrimenkul Tipi alanları zorunludur' },
        { status: 400 }
      );
    }
    
    // Başvuru verilerini hazırla
    const applicationData = {
      id: nextId++,
      fullName: data.fullName,
      phone: data.phone,
      type: data.type,
      ada: data.ada || null,
      parsel: data.parsel || null,
      address: data.address || null,
      createdAt: new Date().toISOString(),
      status: 'Beklemede' // Beklemede, İnceleniyor, Tamamlandı
    };
    
    // Listeye ekle
    applications.push(applicationData);
    
    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
      data: applicationData
    });
    
  } catch (error) {
    console.error('Application creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Başvuru gönderilirken hata oluştu' },
      { status: 500 }
    );
  }
}

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
    
    const index = applications.findIndex(app => app.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Başvuru bulunamadı' },
        { status: 404 }
      );
    }
    
    applications.splice(index, 1);
    
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