'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPinIcon, 
  HomeIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShareIcon,
  HeartIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  grossArea: string;
  netArea: string;
  type: string;
  roomType?: string;
  buildingAge?: string;
  floor?: string;
  totalFloors?: string;
  heatingType?: string;
  parkingType?: string;
  hasBalcony?: boolean;
  hasElevator?: boolean;
  isFurnished?: boolean;
  isInComplex?: boolean;
  complexName?: string;
  dues?: string;
  deposit?: string;
  zoningType?: string;
  businessType?: string;
  roomCount?: string;
  floorCount?: string;
  elevatorCount?: string;
  hasTenant?: boolean;
  condition?: string;
  blockNumber?: string;
  parcelNumber?: string;
  mapNumber?: string;
  floorAreaRatio?: string;
  heightLimit?: string;
  topography?: string;
  irrigation?: string;
  roadStatus?: string;
  creditEligible?: string;
  deedType?: string;
  listingSource?: string;
  swapOption?: string;
  usageStatus?: string;
  kitchenType?: string;
  bathroomCount?: string;
  images: string[];
  createdAt: string;
}

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchListing = async () => {
    try {
      const response = await fetch('/api/listings');
      const result = await response.json();
      
      if (result.success) {
        const foundListing = result.data.find((item: Listing) => item.id === parseInt(params.id as string));
        if (foundListing) {
          setListing(foundListing);
        } else {
          setError('İlan bulunamadı');
        }
      } else {
        setError('İlan yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('İlan detayı yüklenirken hata:', error);
      setError('İlan yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  // Format price
  const formatPrice = (price: string) => {
    const num = parseInt(price);
    return num.toLocaleString('tr-TR') + ' ₺';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get property type icon
  const getPropertyIcon = (type: string) => {
    if (type.includes('Daire')) {
      return <HomeIcon className="h-6 w-6" />;
    } else if (type.includes('İş Yeri')) {
      return <BuildingOfficeIcon className="h-6 w-6" />;
    }
    return <HomeIcon className="h-6 w-6" />;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vera-600"></div>
            <span className="ml-2 text-gray-500">İlan detayı yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="bg-gray-50 min-h-screen py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center py-20">
            <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">{error}</h3>
            <div className="mt-6">
              <button
                onClick={() => router.push('/ilanlar')}
                className="inline-flex items-center rounded-md bg-vera-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-vera-700"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                İlanlara Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <button
                  onClick={() => router.push('/ilanlar')}
                  className="text-vera-600 hover:text-vera-800 flex items-center"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  İlanlar
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-500">{listing.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-96 bg-gradient-to-r from-vera-100 to-vera-200">
                  {getPropertyIcon(listing.type)}
                  <div className="ml-4">
                    <p className="text-vera-600 font-medium">Fotoğraf Yüklenmedi</p>
                    <p className="text-sm text-gray-500">İlan fotoğrafları yakında eklenecek</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getPropertyIcon(listing.type)}
                    <span className="text-sm font-medium text-vera-600">{listing.type}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{listing.neighborhood}, {listing.district}, {listing.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-vera-600">{formatPrice(listing.price)}</p>
                  {listing.type.includes('Kiralık') && (
                    <p className="text-sm text-gray-500">Aylık</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Açıklama</h3>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">İlan Detayları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Details */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brüt Alan:</span>
                    <span className="font-medium">{listing.grossArea} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Alan:</span>
                    <span className="font-medium">{listing.netArea} m²</span>
                  </div>
                  {listing.roomType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Oda Sayısı:</span>
                      <span className="font-medium">{listing.roomType}</span>
                    </div>
                  )}
                  {listing.floor && listing.totalFloors && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kat:</span>
                      <span className="font-medium">{listing.floor}/{listing.totalFloors}</span>
                    </div>
                  )}
                  {listing.buildingAge && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yapı Yaşı:</span>
                      <span className="font-medium">{listing.buildingAge} yıl</span>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  {listing.heatingType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Isıtma:</span>
                      <span className="font-medium">{listing.heatingType}</span>
                    </div>
                  )}
                  {listing.parkingType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Otopark:</span>
                      <span className="font-medium">{listing.parkingType}</span>
                    </div>
                  )}
                  {listing.creditEligible && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Krediye Uygun:</span>
                      <span className="font-medium">{listing.creditEligible}</span>
                    </div>
                  )}
                  {listing.deedType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tapu Durumu:</span>
                      <span className="font-medium">{listing.deedType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">İlan Tarihi:</span>
                    <span className="font-medium">{formatDate(listing.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {(listing.hasBalcony || listing.hasElevator || listing.isFurnished || listing.isInComplex) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Özellikler</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {listing.hasBalcony && (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Balkonlu</span>
                      </div>
                    )}
                    {listing.hasElevator && (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Asansörlü</span>
                      </div>
                    )}
                    {listing.isFurnished && (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Eşyalı</span>
                      </div>
                    )}
                    {listing.isInComplex && (
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Sitede</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">İletişim</h3>
              
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-vera-600 mb-2">{formatPrice(listing.price)}</p>
                  {listing.type.includes('Kiralık') && (
                    <p className="text-sm text-gray-500">Aylık kira bedeli</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href="tel:+905422414541"
                  className="w-full inline-flex items-center justify-center rounded-md bg-vera-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Hemen Ara
                </a>
                
                <a
                  href="mailto:info@veragrup.com?subject=İlan Hakkında Bilgi Talebi&body=Merhaba, ${listing.title} ilanı hakkında bilgi almak istiyorum."
                  className="w-full inline-flex items-center justify-center rounded-md bg-white px-4 py-3 text-base font-medium text-vera-600 shadow-sm ring-1 ring-vera-600 hover:bg-vera-50 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  E-posta Gönder
                </a>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Paylaş</h4>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: listing.title,
                          text: listing.description,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link kopyalandı!');
                      }
                    }}
                    className="flex-1 inline-flex items-center justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <ShareIcon className="h-4 w-4 mr-1" />
                    Paylaş
                  </button>
                </div>
              </div>

              {/* Property Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Özet Bilgiler</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tip:</span>
                    <span className="font-medium">{listing.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alan:</span>
                    <span className="font-medium">{listing.grossArea} m²</span>
                  </div>
                  {listing.roomType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Oda:</span>
                      <span className="font-medium">{listing.roomType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Konum:</span>
                    <span className="font-medium">{listing.district}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Benzer İlanlar</h2>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <HomeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Yakında!</h3>
            <p className="text-gray-600">Benzer ilanlar özelliği yakında eklenecek.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 