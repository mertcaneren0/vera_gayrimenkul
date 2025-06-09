import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Environment variables - secure credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@veragrup.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'vera-admin-secret-key-production-2024';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'E-posta ve şifre gerekli' },
        { status: 400 }
      );
    }

    // Simple credential check for deployment
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz kimlik bilgileri' },
        { status: 401 }
      );
    }

    // JWT token oluşturma
    const token = jwt.sign(
      { 
        email: ADMIN_EMAIL,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { 
        expiresIn: '24h',
        issuer: 'vera-admin'
      }
    );

    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Set secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      token,
      expiry
    });

    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server hatası' },
      { status: 500 }
    );
  }
} 