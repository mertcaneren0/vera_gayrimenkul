'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, BriefcaseIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface CareerApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  message?: string;
  createdAt: string;
}

export default function CareerApplicationsPage() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);

  // Fetch career applications
  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/career-applications');
      const result = await response.json();
      if (result.success) {
        setApplications(result.data);
      }
    } catch (error) {
      console.error('Kariyer başvuruları alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle delete
  const handleDelete = async (id: string, fullName: string) => {
    if (confirm(`${fullName} adlı kişinin başvurusunu silmek istediğinizden emin misiniz?`)) {
      try {
        const response = await fetch(`/api/career-applications?id=${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Başvuru başarıyla silindi!');
          fetchApplications();
          if (selectedApplication?.id === id) {
            setSelectedApplication(null);
          }
        } else {
          alert('Hata: ' + result.error);
        }
      } catch (error) {
        alert('Başvuru silinirken hata oluştu.');
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Applications List */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Kariyer Başvuruları</h1>
            <span className="text-sm text-gray-500">
              {applications.length} başvuru
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vera-600"></div>
              <span className="ml-2 text-gray-500">Yükleniyor...</span>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Henüz kariyer başvurusu bulunmuyor.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {applications.map((application) => (
                <div
                  key={application.id}
                  onClick={() => setSelectedApplication(application)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedApplication?.id === application.id ? 'bg-vera-50 border-r-4 border-r-vera-600' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{application.fullName}</h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(application.createdAt)}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        {application.experience}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(application.id, application.fullName);
                      }}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Detail */}
      <div className="w-1/2 bg-white flex flex-col">
        {selectedApplication ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.fullName}</h2>
                  <p className="text-lg text-vera-600 font-medium mt-1">Kariyer Başvurusu</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Yeni Başvuru
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Başvuru Tarihi: {formatDate(selectedApplication.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* İletişim Bilgileri */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">E-posta</p>
                        <a href={`mailto:${selectedApplication.email}`} className="text-sm text-vera-600 hover:text-vera-700">
                          {selectedApplication.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Telefon</p>
                        <a href={`tel:${selectedApplication.phone}`} className="text-sm text-vera-600 hover:text-vera-700">
                          {selectedApplication.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Adres</p>
                        <p className="text-sm text-gray-600">{selectedApplication.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deneyim Bilgileri */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Deneyim</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Deneyim Seviyesi</p>
                        <p className="text-sm text-gray-600">{selectedApplication.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ek Bilgiler */}
                {selectedApplication.message && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ek Bilgiler</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedApplication.message}</p>
                    </div>
                  </div>
                )}

                {/* İletişim Butonları */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Hızlı İşlemler</h3>
                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${selectedApplication.email}?subject=Kariyer Başvurunuz Hakkında&body=Merhaba ${selectedApplication.fullName},%0D%0A%0D%0AKariyer başvurunuz hakkında...`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-vera-600 hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
                    >
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      E-posta Gönder
                    </a>
                    <a
                      href={`tel:${selectedApplication.phone}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
                    >
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Telefon Aç
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Başvuru Seçin</h3>
              <p className="mt-1 text-sm text-gray-500">
                Detaylarını görmek için sol taraftan bir başvuru seçin.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 