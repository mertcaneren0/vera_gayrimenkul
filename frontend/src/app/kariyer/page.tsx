'use client';

import { useState } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  message: string;
}

export default function KariyerPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const experienceOptions = [
    'Yeni mezun',
    '1 yıldan az',
    '1-2 yıl',
    '3-5 yıl',
    '5-10 yıl',
    '10 yıldan fazla'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/career-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          address: '',
          experience: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kariyer Fırsatları
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Gayrimenkul ailesine katılmak istiyorsanız, aşağıdaki formu doldurarak 
            başvurunuzu yapabilirsiniz. Başarılı adaylarla en kısa sürede iletişime geçeceğiz.
          </p>
        </div>

        {/* Form */}
        <div className="mx-auto mt-16 max-w-2xl">
          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{submitMessage}</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{submitMessage}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad Soyad */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                Ad Soyad *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vera-600 sm:text-sm sm:leading-6"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Telefon *
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vera-600 sm:text-sm sm:leading-6"
                  placeholder="0532 123 45 67"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                E-posta *
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vera-600 sm:text-sm sm:leading-6"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            {/* Adres */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Adres *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vera-600 sm:text-sm sm:leading-6"
                  placeholder="Şehir, İlçe"
                />
              </div>
            </div>

            {/* Deneyim */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">
                Deneyim *
              </label>
              <div className="mt-2">
                <select
                  name="experience"
                  id="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-vera-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Deneyim seviyenizi seçin</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mesaj */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                Ek Bilgiler
              </label>
              <div className="mt-2">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vera-600 sm:text-sm sm:leading-6"
                  placeholder="Kendinizi tanıtın, yetenekleriniz ve motivasyonunuz hakkında bilgi verin..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vera-600 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-vera-600 hover:bg-vera-500'
                }`}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Başvuru Gönder'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Neden Vera Gayrimenkul?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-vera-600 mr-2">•</span>
                Dinamik ve genç bir ekip ortamı
              </li>
              <li className="flex items-start">
                <span className="text-vera-600 mr-2">•</span>
                Sürekli eğitim ve gelişim imkanları
              </li>
              <li className="flex items-start">
                <span className="text-vera-600 mr-2">•</span>
                Rekabetçi maaş ve komisyon sistemi
              </li>
              <li className="flex items-start">
                <span className="text-vera-600 mr-2">•</span>
                Kariyer gelişimi için fırsatlar
              </li>
              <li className="flex items-start">
                <span className="text-vera-600 mr-2">•</span>
                Modern teknoloji ve araçlar
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 