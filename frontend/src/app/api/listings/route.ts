import { NextRequest, NextResponse } from 'next/server';

// Geçici olarak in-memory storage kullanıyoruz
// Gerçek uygulamada bu veriler veritabanında saklanacak
let listings: any[] = [];
let nextId = 1;

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      data: listings 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'İlanlar getirilemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Form verilerini parse et
    const listingData: any = {};
    
    // Text alanları
    const textFields = [
      'title', 'description', 'price', 'city', 'district', 'neighborhood',
      'grossArea', 'netArea', 'creditEligible', 'deedType', 'listingSource',
      'swapOption', 'listingDate', 'status', 'type'
    ];
    
    textFields.forEach(field => {
      const value = formData.get(field);
      if (value) listingData[field] = value.toString();
    });
    
    // Property type'a göre özel alanları ekle
    const propertyType = listingData.type;
    
    if (propertyType?.includes('Daire')) {
      const apartmentFields = [
        'roomType', 'buildingAge', 'floor', 'totalFloors', 'heatingType',
        'bathroomCount', 'kitchenType', 'parkingType', 'usageStatus',
        'complexName', 'dues', 'deposit'
      ];
      
      apartmentFields.forEach(field => {
        const value = formData.get(field);
        if (value) listingData[field] = value.toString();
      });
      
      // Boolean alanlar
      const booleanFields = ['hasBalcony', 'hasElevator', 'isFurnished', 'isInComplex'];
      booleanFields.forEach(field => {
        listingData[field] = formData.get(field) === 'true';
      });
    }
    
    if (propertyType === 'Satılık Arsa' || propertyType === 'Tarla') {
      const landFields = [
        'zoningType', 'blockNumber', 'parcelNumber', 'mapNumber',
        'floorAreaRatio', 'heightLimit'
      ];
      
      landFields.forEach(field => {
        const value = formData.get(field);
        if (value) listingData[field] = value.toString();
      });
      
      if (propertyType === 'Tarla') {
        const fieldSpecific = ['topography', 'irrigation', 'roadStatus'];
        fieldSpecific.forEach(field => {
          const value = formData.get(field);
          if (value) listingData[field] = value.toString();
        });
      }
    }
    
    if (propertyType?.includes('İş Yeri')) {
      const businessFields = [
        'businessType', 'roomCount', 'floorCount', 'buildingAge',
        'heatingType', 'elevatorCount', 'condition', 'deposit'
      ];
      
      businessFields.forEach(field => {
        const value = formData.get(field);
        if (value) listingData[field] = value.toString();
      });
      
      listingData.hasTenant = formData.get('hasTenant') === 'true';
    }
    
    // Resimler (şimdilik sadece dosya isimlerini saklıyoruz)
    const images = formData.getAll('images');
    listingData.images = images.map((file: any) => file.name || 'unknown');
    
    // ID ve tarih ekle
    listingData.id = nextId++;
    listingData.createdAt = new Date().toISOString();
    
    // Listeye ekle
    listings.push(listingData);
    
    return NextResponse.json({
      success: true,
      message: 'İlan başarıyla eklendi',
      data: listingData
    });
    
  } catch (error) {
    console.error('Listing creation error:', error);
    return NextResponse.json(
      { success: false, error: 'İlan eklenirken hata oluştu' },
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
        { success: false, error: 'İlan ID gerekli' },
        { status: 400 }
      );
    }
    
    const index = listings.findIndex(listing => listing.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'İlan bulunamadı' },
        { status: 404 }
      );
    }
    
    listings.splice(index, 1);
    
    return NextResponse.json({
      success: true,
      message: 'İlan başarıyla silindi'
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'İlan silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 