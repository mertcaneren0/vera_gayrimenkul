import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vera-admin-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Token'ı cookie'den al
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token bulunamadı' },
        { status: 401 }
      );
    }

    // Token'ı doğrula
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return NextResponse.json(
        { 
          success: true, 
          user: decoded,
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