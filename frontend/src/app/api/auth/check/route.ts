import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vera-admin-jwt-secret-key-production-2024'
);

export async function GET(request: NextRequest) {
  try {
    // Token'ı önce cookie'den al
    let token = request.cookies.get('adminToken')?.value;
    
    // Cookie'de yoksa Authorization header'dan al
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token bulunamadı' },
        { status: 401 }
      );
    }

    // Token'ı doğrula
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return NextResponse.json(
        { 
          success: true, 
          user: payload,
          message: 'Token geçerli' 
        },
        { status: 200 }
      );
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Token kontrolünde hata oluştu' },
      { status: 500 }
    );
  }
} 