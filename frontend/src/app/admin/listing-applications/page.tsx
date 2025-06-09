'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ListingApplicationsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Doğru URL'ye yönlendir
    router.replace('/admin/applications');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">Yönlendiriliyor...</h2>
        <p className="mt-2 text-sm text-gray-600">
          İlan başvuruları sayfasına yönlendiriliyorsunuz.
        </p>
      </div>
    </div>
  );
} 