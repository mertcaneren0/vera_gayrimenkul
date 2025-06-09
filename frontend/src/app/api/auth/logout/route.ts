import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Başarıyla çıkış yapıldı' },
      { status: 200 }
    );

    // HTTP-only cookie'yi sil
    response.cookies.set('adminToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Çıkış işleminde hata oluştu' },
      { status: 500 }
    );
  }
} 