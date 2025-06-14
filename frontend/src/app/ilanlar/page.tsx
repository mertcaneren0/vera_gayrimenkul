'use client';

import { useState, useEffect } from 'react';
import { MapPinIcon, HomeIcon, CalendarIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

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
  zoningType?: string;
  businessType?: string;
  images: string[];
  createdAt: string;
}

export default function IlanlarPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  const propertyTypes = [
    'Satılık Daire',
    'Kiralık Daire', 
    'Satılık Arsa',
    'Tarla',
    'Satılık İş Yeri',
    'Kiralık İş Yeri'
  ];

  // Fetch listings
  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      const result = await response.json();
      if (result.success) {
        setListings(result.data);
      }
    } catch (error) {
      console.error('İlanlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !selectedType || listing.type === selectedType;
    const matchesCity = !selectedCity || listing.city === selectedCity;
    
    const price = parseInt(listing.price);
    const minPrice = priceRange.min ? parseInt(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseInt(priceRange.max) : Infinity;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });

  // Get unique cities
  const cities = [...new Set(listings.map(listing => listing.city))];

  // Format price
  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M ₺`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K ₺`;
    }
    return `${num.toLocaleString('tr-TR')} ₺`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  // Get property icon
  const getPropertyIcon = (type: string) => {
    if (type.includes('Daire')) {
      return <HomeIcon className="h-5 w-5" />;
    }
    return <HomeIcon className="h-5 w-5" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gayrimenkul İlanları
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Size en uygun gayrimenkul seçeneklerini keşfedin.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="İlan başlığı, açıklama, şehir, ilçe veya mahalle ile arayın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vera-600 focus:border-vera-600 sm:text-sm"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredListings.length} ilan bulundu
              </span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filtrele
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Property Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Emlak Tipi
                  </label>
                  <select
                    id="type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-600 focus:ring-vera-600 sm:text-sm"
                  >
                    <option value="">Tümü</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir
                  </label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-600 focus:ring-vera-600 sm:text-sm"
                  >
                    <option value="">Tümü</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Min Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    placeholder="0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-600 focus:ring-vera-600 sm:text-sm"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Max Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    placeholder="Sınırsız"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-600 focus:ring-vera-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedType('');
                    setSelectedCity('');
                    setPriceRange({ min: '', max: '' });
                    setSearchTerm('');
                  }}
                  className="text-sm text-vera-600 hover:text-vera-800"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vera-600"></div>
            <span className="ml-2 text-gray-500">İlanlar yükleniyor...</span>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20">
            <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">İlan bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              {listings.length === 0 
                ? "Henüz ilan eklenmemiş. Admin panelinden ilan ekleyebilirsiniz."
                : "Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                {/* Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="flex items-center justify-center h-48 bg-gradient-to-r from-vera-100 to-vera-200 relative">
                    {listing.images && listing.images.length > 0 ? (
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title}
                        className="w-full h-full object-cover absolute inset-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <HomeIcon className="h-12 w-12 text-vera-600" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getPropertyIcon(listing.type)}
                      <span className="text-sm font-medium text-vera-600">
                        {listing.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(listing.price)}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 h-14 overflow-hidden">
                    {listing.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{listing.neighborhood}, {listing.district}, {listing.city}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {listing.roomType && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Oda Sayısı:</span>
                        <span className="font-medium">{listing.roomType}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Brüt Alan:</span>
                      <span className="font-medium">{listing.grossArea} m²</span>
                    </div>
                    {listing.floor && listing.totalFloors && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Kat:</span>
                        <span className="font-medium">{listing.floor}/{listing.totalFloors}</span>
                      </div>
                    )}
                    {listing.buildingAge && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Yapı Yaşı:</span>
                        <span className="font-medium">{listing.buildingAge}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {(listing.hasBalcony || listing.hasElevator || listing.isFurnished) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listing.hasBalcony && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Balkonlu
                        </span>
                      )}
                      {listing.hasElevator && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Asansörlü
                        </span>
                      )}
                      {listing.isFurnished && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Eşyalı
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {formatDate(listing.createdAt)}
                    </div>
                    <a
                      href={`/ilanlar/${listing.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-vera-600 hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500 transition-colors duration-200"
                    >
                      Detay Gör
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        {!loading && filteredListings.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Aradığınız Gayrimenkulü Bulamadınız mı?
              </h3>
              <p className="text-gray-600 mb-6">
                Uzman ekibimiz size özel seçenekler sunmak için hazır. İhtiyaçlarınızı paylaşın, size en uygun fırsatları getirelim.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-md bg-vera-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  İletişime Geçin
                </a>
                <a
                  href="/hizmetler"
                  className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-vera-600 shadow-sm ring-1 ring-vera-600 hover:bg-vera-50 focus:outline-none focus:ring-2 focus:ring-vera-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Hizmetlerimizi İnceleyin
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 