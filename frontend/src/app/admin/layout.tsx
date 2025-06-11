'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Login sayfasında auth check yapmayalım
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    // Token kontrolü yap
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      // Önce localStorage'dan token'ı kontrol et
      const localToken = localStorage.getItem('adminToken');
      const localExpiry = localStorage.getItem('adminExpiry');
      
      // Token süresi dolmuş mu kontrol et
      if (localToken && localExpiry) {
        const expiryDate = new Date(localExpiry);
        const now = new Date();
        
        if (now > expiryDate) {
          // Token süresi dolmuş, temizle
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminExpiry');
          router.push('/admin/login');
          return;
        }
      }

      // API'den token kontrolü yap (cookie veya localStorage token'ı)
      const response = await fetch('/api/auth/check', {
        credentials: 'include',
        headers: localToken ? {
          'Authorization': `Bearer ${localToken}`
        } : {}
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        // Token geçersiz, localStorage'ı temizle
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminExpiry');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminExpiry');
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      // localStorage'ı temizle
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminExpiry');
      
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout on error
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminExpiry');
      router.push('/admin/login');
    }
  };

  // Login sayfası için layout gösterme
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  // Authenticated olmamışsa hiçbir şey gösterme (redirect olacak)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Vera Gayrimenkul Admin
              </h1>
              <nav className="flex space-x-8">
                <Link
                  href="/admin/dashboard"
                  className={`text-sm font-medium ${
                    pathname?.includes('/admin/dashboard')
                      ? 'text-vera-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/team"
                  className={`text-sm font-medium ${
                    pathname?.includes('/admin/team')
                      ? 'text-vera-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Ekip Yönetimi
                </Link>
                <Link
                  href="/admin/career-applications"
                  className={`text-sm font-medium ${
                    pathname?.includes('/admin/career-applications')
                      ? 'text-vera-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Kariyer Başvuruları
                </Link>
                <Link
                  href="/admin/listings"
                  className={`text-sm font-medium ${
                    pathname?.includes('/admin/listings')
                      ? 'text-vera-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  İlan Yönetimi
                </Link>
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
} 