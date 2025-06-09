"use client";

import { useState, useEffect } from "react";
import { 
  TrashIcon,
  EyeIcon,
  PhoneIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

interface Application {
  id: number;
  fullName: string;
  phone: string;
  type: string;
  ada?: string;
  parsel?: string;
  address?: string;
  createdAt: string;
  status: 'Beklemede' | 'İnceleniyor' | 'Tamamlandı';
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/listing-applications');
      const result = await response.json();
      if (result.success) {
        setApplications(result.data);
      }
    } catch (error) {
      console.error('Başvurular yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: number) => {
    if (confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/listing-applications?id=${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Başvuru başarıyla silindi!');
          fetchApplications();
        } else {
          alert('Hata: ' + result.error);
        }
      } catch (error) {
        alert('Başvuru silinirken hata oluştu.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return 'bg-yellow-100 text-yellow-800';
      case 'İnceleniyor':
        return 'bg-blue-100 text-blue-800';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daire':
        return <HomeIcon className="h-5 w-5 text-gray-400" />;
      case 'arsa':
        return <MapPinIcon className="h-5 w-5 text-gray-400" />;
      default:
        return <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">İlan Başvuruları</h1>
            <p className="mt-1 text-sm text-gray-600">
              Müşterilerden gelen ilan başvurularını buradan yönetebilirsiniz
            </p>
          </div>
        </div>

        {/* Başvurular Tablosu */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Müşteri Bilgileri
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gayrimenkul Tipi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Konum Bilgisi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">İşlemler</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Yükleniyor...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Henüz başvuru bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.fullName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-1" />
                              {application.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(application.type)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">
                            {application.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.type === 'arsa' ? (
                          application.ada && application.parsel ? (
                            `Ada: ${application.ada}, Parsel: ${application.parsel}`
                          ) : (
                            'Belirtilmemiş'
                          )
                        ) : (
                          application.address ? (
                            application.address.length > 50 
                              ? `${application.address.substring(0, 50)}...`
                              : application.address
                          ) : (
                            'Belirtilmemiş'
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setIsDetailModalOpen(true);
                          }}
                          className="text-vera-600 hover:text-vera-900 mr-3"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteApplication(application.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detay Modal */}
        {isDetailModalOpen && selectedApplication && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Başvuru Detayları
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gayrimenkul Tipi</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{selectedApplication.type}</p>
                </div>
                
                {selectedApplication.type === 'arsa' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ada</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.ada || 'Belirtilmemiş'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parsel</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.parsel || 'Belirtilmemiş'}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adres</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.address || 'Belirtilmemiş'}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Durum</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Başvuru Tarihi</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedApplication.createdAt).toLocaleDateString('tr-TR')} {new Date(selectedApplication.createdAt).toLocaleTimeString('tr-TR')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Kapat
                </button>
                <a
                  href={`tel:${selectedApplication.phone}`}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vera-600 hover:bg-vera-700"
                >
                  Ara
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 