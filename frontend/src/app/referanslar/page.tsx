'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function ReferanslarPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate array of investor photo numbers (1-90)
  const investorPhotos = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-vera-100 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Referanslarımız
            </h1>
            <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Güvenilir iş ortaklarımız ve değerli yatırımcılarımızla birlikte başarılı projeler gerçekleştiriyoruz.
            </p>
          </div>
        </div>

        {/* İnşaat Firmalarımız Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-vera-600 flex items-center justify-center mb-6">
              <BuildingOfficeIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">İnşaat Firmalarımız</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sektörün önde gelen inşaat firmaları ile stratejik ortaklıklarımız bulunmaktadır. 
              Bu güçlü iş birlikleri sayesinde müşterilerimize en kaliteli hizmeti sunuyoruz.
            </p>
          </div>
        </div>

        {/* Değerli Yatırımcılarımız Section */}
        <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="mx-auto h-16 w-16 rounded-full bg-vera-600 flex items-center justify-center mb-6">
              <UserGroupIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerli Yatırımcılarımız</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bize güvenen ve projelerimizde yer alan değerli yatırımcılarımızın bir kısmı.
            </p>
          </div>

          {/* Investor Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {investorPhotos.map((photoNumber) => (
              <div 
                key={photoNumber} 
                className="aspect-square relative overflow-hidden rounded-lg bg-gray-200 hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md"
              >
                <img
                  src={`/refo/${photoNumber}.jpg`}
                  alt={`Yatırımcı ${photoNumber}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.log(`Failed to load image: /refo/${photoNumber}.jpg`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Siz de Referanslarımız Arasında Yer Alın
            </h3>
            <p className="text-gray-600 mb-6">
              Gayrimenkul yatırımlarınızda güvenilir bir partner arıyorsanız, bizimle iletişime geçin.
            </p>
            <a
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-md bg-vera-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              İletişime Geçin
            </a>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-vera-200 to-vera-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
} 