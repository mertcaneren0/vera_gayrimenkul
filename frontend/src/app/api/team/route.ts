import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

interface TeamMember {
  id: string;
  fullName: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

// In-memory storage for development
let teamMembers: TeamMember[] = [
  {
    id: '1',
    fullName: 'Ahmet Yılmaz',
    title: 'Gayrimenkul Uzmanı',
    description: 'Gayrimenkul sektöründe 10 yıllık deneyime sahip uzmanımız. Müşteri memnuniyeti odaklı çalışır.',
    image: 'https://via.placeholder.com/400x400/21375e/ffffff?text=Ahmet+Y%C4%B1lmaz',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    fullName: 'Ayşe Demir',
    title: 'Satış Danışmanı',
    description: 'Profesyonel satış danışmanlığı ile müşterilerimize en uygun gayrimenkul çözümlerini sunar.',
    image: 'https://via.placeholder.com/400x400/21375e/ffffff?text=Ay%C5%9Fe+Demir',
    createdAt: new Date().toISOString(),
  }
];

// GET - Tüm ekip üyelerini getir
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: teamMembers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ekip üyeleri alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - Yeni ekip üyesi ekle
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;

    if (!fullName || !title || !description) {
      return NextResponse.json(
        { success: false, error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // Handle file upload
    let imageUrl = 'https://via.placeholder.com/400x400/21375e/ffffff?text=Yeni+%C3%9Cye';
    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate unique filename
        const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filepath = path.join(process.cwd(), 'public/uploads/team', filename);
        
        // Write file to public directory
        await writeFile(filepath, buffer);
        imageUrl = `/uploads/team/${filename}`;
      } catch (fileError) {
        console.error('File upload error:', fileError);
        // Keep placeholder if upload fails
      }
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      fullName,
      title,
      description,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    teamMembers.push(newMember);

    return NextResponse.json({
      success: true,
      message: 'Ekip üyesi başarıyla eklendi',
      data: newMember
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ekip üyesi eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE - Ekip üyesi sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Ekip üyesi ID gerekli' },
        { status: 400 }
      );
    }

    const memberIndex = teamMembers.findIndex(member => member.id === id);
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Ekip üyesi bulunamadı' },
        { status: 404 }
      );
    }

    teamMembers.splice(memberIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Ekip üyesi başarıyla silindi'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ekip üyesi silinirken hata oluştu' },
      { status: 500 }
    );
  }
} 