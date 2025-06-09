'use client';

import { useState, useEffect } from 'react';
import { ClockIcon, BuildingOfficeIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function ReferanslarPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-vera-100 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className={`mx-auto mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="mx-auto h-24 w-24 rounded-full bg-vera-600 flex items-center justify-center shadow-lg">
                <BuildingOfficeIcon className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-vera-yellow-400 flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-vera-700" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Referanslarımız
              <span className="block text-vera-600 mt-2">Yakında Burada!</span>
            </h1>
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Değerli müşterilerimizle gerçekleştirdiğimiz başarılı projeler ve memnun müşteri 
              yorumlarını yakında sizlerle paylaşacağız. Güveninizi kazanan hizmet kalitemizin 
              kanıtlarını burada bulabileceksiniz.
            </p>
          </div>

          {/* Features */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mx-auto h-12 w-12 rounded-full bg-vera-100 flex items-center justify-center mb-4">
                  <CheckBadgeIcon className="h-6 w-6 text-vera-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Başarılı Projeler</h3>
                <p className="text-sm text-gray-600">
                  Tamamladığımız projelerin detayları ve görsellerini paylaşacağız
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mx-auto h-12 w-12 rounded-full bg-vera-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-vera-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Müşteri Yorumları</h3>
                <p className="text-sm text-gray-600">
                  Memnun müşterilerimizin deneyim ve geri bildirimlerini sunacağız
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="mx-auto h-12 w-12 rounded-full bg-vera-100 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-vera-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">İstatistikler</h3>
                <p className="text-sm text-gray-600">
                  Sayılarla ifade edilen başarılarımızı detaylı olarak sunacağız
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`mt-16 transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Siz de Referanslarımız Arasında Yer Alın
              </h3>
              <p className="text-gray-600 mb-6">
                Gayrimenkul ihtiyaçlarınız için bizimle iletişime geçin ve başarılı bir deneyim yaşayın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-md bg-vera-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                >
                  İletişime Geçin
                </a>
                
              </div>
            </div>
          </div>

          {/* Timeline Hint */}
          <div className={`mt-12 transition-all duration-1000 delay-1100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center rounded-full bg-vera-yellow-100 px-6 py-2 text-sm font-medium text-vera-800">
              <ClockIcon className="mr-2 h-4 w-4" />
              Sayfa güncellemeleri için bizi takip edin
            </div>
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