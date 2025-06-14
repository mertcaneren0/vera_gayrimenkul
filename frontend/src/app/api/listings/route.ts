import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Geçici olarak file-based storage kullanıyoruz
// Gerçek uygulamada bu veriler veritabanında saklanacak
const DATA_FILE = path.join(process.cwd(), 'data', 'listings.json');

// Data klasörünü oluştur
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Verileri dosyadan oku
function readListings() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading listings:', error);
  }
  return { listings: [], nextId: 1 };
}

// Verileri dosyaya yaz
function writeListings(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing listings:', error);
  }
}

export async function GET() {
  try {
    const data = readListings();
    return NextResponse.json({ 
      success: true, 
      data: data.listings 
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
    console.log('POST request received');
    const formData = await request.formData();
    console.log('FormData received, parsing...');
    
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
      if (value) {
        listingData[field] = value.toString();
        console.log(`${field}: ${value}`);
      }
    });
    
    // Validation
    if (!listingData.title || !listingData.type || !listingData.price) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { success: false, error: 'Zorunlu alanlar eksik: title, type, price' },
        { status: 400 }
      );
    }
    
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
    
    // Resimler - doğrudan burada işle
    const images = formData.getAll('images') as File[];
    let uploadedImagePaths: string[] = [];
    
    if (images && images.length > 0 && images[0].size > 0) {
      try {
        // Upload klasörünü oluştur
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        for (const file of images) {
          if (file.size === 0) continue;

          // Dosya adını benzersiz yap
          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 15);
          const extension = path.extname(file.name);
          const fileName = `${timestamp}_${randomString}${extension}`;
          
          // Dosyayı kaydet
          const filePath = path.join(uploadDir, fileName);
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          fs.writeFileSync(filePath, buffer);
          uploadedImagePaths.push(`/uploads/${fileName}`);
        }
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
      }
    }
    
    listingData.images = uploadedImagePaths;
    
    // Mevcut verileri oku
    const data = readListings();
    
    // ID ve tarih ekle
    listingData.id = data.nextId++;
    listingData.createdAt = new Date().toISOString();
    
    // Listeye ekle
    data.listings.push(listingData);
    console.log('Listing added successfully:', listingData);
    console.log('Total listings count:', data.listings.length);
    
    // Dosyaya kaydet
    writeListings(data);
    
    return NextResponse.json({
      success: true,
      message: 'İlan başarıyla eklendi',
      data: listingData
    });
    
  } catch (error) {
    console.error('Listing creation error:', error);
    console.error('Error details:', error);
    return NextResponse.json(
      { success: false, error: 'İlan eklenirken hata oluştu: ' + (error as Error).message },
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
    
    const data = readListings();
    const index = data.listings.findIndex((listing: any) => listing.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'İlan bulunamadı' },
        { status: 404 }
      );
    }
    
    data.listings.splice(index, 1);
    writeListings(data);
    
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