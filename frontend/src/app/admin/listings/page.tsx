"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon,
  MapIcon
} from "@heroicons/react/24/outline";

// Tip tanımlamaları
type PropertyType = "Satılık Daire" | "Kiralık Daire" | "Satılık Arsa" | "Tarla" | "Satılık İş Yeri" | "Kiralık İş Yeri";
type PropertyStatus = "Aktif" | "Pasif";
type CreditEligibility = "Evet" | "Hayır" | "Bilinmiyor";
type DeedType = "Müstakil" | "Hisseli" | "Tahsis" | "Diğer";
type ListingSource = "Sahibinden" | "Emlak Ofisinden";
type SwapOption = "Evet" | "Hayır";
type RoomType = "1+0" | "1+1" | "2+1" | "3+1" | "4+1" | "5+ ve üzeri";
type BuildingAge = "0" | "1-5" | "5-10" | "10-15" | "15-20" | "20+";
type HeatingType = "Merkezi" | "Kombi" | "Klima" | "Doğalgaz" | "Soba" | "Yok";
type KitchenType = "Açık" | "Kapalı";
type ParkingType = "Açık" | "Kapalı" | "Yok";
type UsageStatus = "Boş" | "Kiracılı" | "Mal Sahibi";
type ZoningType = "Konut" | "Ticari" | "Tarla" | "Arsa" | "Diğer";
type BusinessType = "Ofis" | "Dükkan" | "İmalathane" | "Depo" | "Diğer";
type PropertyCondition = "İlk Sahip" | "İkinci El";

interface BaseProperty {
  // Genel Ortak Alanlar
  title: string;
  description: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  grossArea: string;
  netArea: string;
  creditEligible: CreditEligibility;
  deedType: DeedType;
  listingSource: ListingSource;
  swapOption: SwapOption;
  listingDate: string;
  status: PropertyStatus;
  type: PropertyType;
  images: File[];
}

interface Apartment extends BaseProperty {
  roomType: RoomType;
  buildingAge: BuildingAge;
  floor: string;
  totalFloors: string;
  heatingType: HeatingType;
  bathroomCount: string;
  kitchenType: KitchenType;
  hasBalcony: boolean;
  hasElevator: boolean;
  parkingType: ParkingType;
  isFurnished: boolean;
  usageStatus: UsageStatus;
  isInComplex: boolean;
  complexName?: string;
  dues?: string;
  deposit?: string; // Sadece kiralık için
}

interface Land extends BaseProperty {
  zoningType: ZoningType;
  blockNumber: string;
  parcelNumber: string;
  mapNumber: string;
  floorAreaRatio: string;
  heightLimit: string;
}

interface Field extends BaseProperty {
  zoningType: ZoningType;
  blockNumber: string;
  parcelNumber: string;
  topography?: string;
  irrigation?: string;
  roadStatus?: string;
}

interface Business extends BaseProperty {
  roomCount: string;
  floorCount: string;
  buildingAge: BuildingAge;
  heatingType: HeatingType;
  elevatorCount: string;
  hasTenant: boolean;
  condition: PropertyCondition;
  deposit?: string; // Sadece kiralık için
  businessType: BusinessType;
}

type Property = Apartment | Land | Field | Business;

// Form için başlangıç değerleri
const initialFormData: Partial<Property> = {
  title: "",
  description: "",
  price: "",
  city: "",
  district: "",
  neighborhood: "",
  grossArea: "",
  netArea: "",
  creditEligible: "Bilinmiyor",
  deedType: "Müstakil",
  listingSource: "Sahibinden",
  swapOption: "Hayır",
  listingDate: new Date().toISOString().split('T')[0],
  status: "Aktif",
  type: "Satılık Daire",
  images: [],
};

export default function ListingsPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>(initialFormData);
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Form input ve select stilleri için ortak sınıflar
  const inputBaseClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
  const placeholderClasses = "placeholder:text-navy-600 placeholder:opacity-70";
  const selectedTextClasses = "text-gray-900";

  // İlanları yükle
  useEffect(() => {
    fetchListings();
  }, []);

  // Property type değiştiğinde form alanlarını sıfırla
  useEffect(() => {
    if (isAddModalOpen) {
      setFormData(prev => ({
        ...initialFormData,
        type: prev.type,
      }));
    }
  }, [formData.type, isAddModalOpen]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        images: fileArray
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // FormData oluştur
      const submitFormData = new FormData();
      
      // Tüm form verilerini FormData'ya ekle
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          // Resimler için özel işlem
          value.forEach((file: File) => {
            submitFormData.append('images', file);
          });
        } else if (typeof value === 'boolean') {
          submitFormData.append(key, value.toString());
        } else if (value !== undefined && value !== null && value !== '') {
          submitFormData.append(key, value.toString());
        }
      });
      
      // API'ye gönder
      const response = await fetch('/api/listings', {
        method: 'POST',
        body: submitFormData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(selectedListing ? 'İlan başarıyla güncellendi!' : 'İlan başarıyla eklendi!');
        setIsAddModalOpen(false);
        setSelectedListing(null);
        setFormData(initialFormData);
        // Listeyi güncelle
        fetchListings();
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      console.error('Form gönderim hatası:', error);
      alert('İlan eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // Property type'a göre form alanlarını render et
  const renderPropertySpecificFields = () => {
    const type = formData.type;

    if (type?.includes("Daire")) {
      return (
        <>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
              Oda Sayısı
            </label>
            <select
              name="roomType"
              id="roomType"
              value={(formData as Apartment).roomType || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="1+0">1+0</option>
              <option value="1+1">1+1</option>
              <option value="2+1">2+1</option>
              <option value="3+1">3+1</option>
              <option value="4+1">4+1</option>
              <option value="5+ ve üzeri">5+ ve üzeri</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="buildingAge" className="block text-sm font-medium text-gray-700">
              Bina Yaşı
            </label>
            <select
              name="buildingAge"
              id="buildingAge"
              value={(formData as Apartment).buildingAge || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="0">0</option>
              <option value="1-5">1-5</option>
              <option value="5-10">5-10</option>
              <option value="10-15">10-15</option>
              <option value="15-20">15-20</option>
              <option value="20+">20+</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
              Bulunduğu Kat
            </label>
            <input
              type="text"
              name="floor"
              id="floor"
              value={(formData as Apartment).floor || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="totalFloors" className="block text-sm font-medium text-gray-700">
              Kat Sayısı
            </label>
            <input
              type="text"
              name="totalFloors"
              id="totalFloors"
              value={(formData as Apartment).totalFloors || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="heatingType" className="block text-sm font-medium text-gray-700">
              Isıtma Tipi
            </label>
            <select
              name="heatingType"
              id="heatingType"
              value={(formData as Apartment).heatingType || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="Merkezi">Merkezi</option>
              <option value="Kombi">Kombi</option>
              <option value="Klima">Klima</option>
              <option value="Doğalgaz">Doğalgaz</option>
              <option value="Soba">Soba</option>
              <option value="Yok">Yok</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="bathroomCount" className="block text-sm font-medium text-gray-700">
              Banyo Sayısı
            </label>
            <input
              type="text"
              name="bathroomCount"
              id="bathroomCount"
              value={(formData as Apartment).bathroomCount || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="kitchenType" className="block text-sm font-medium text-gray-700">
              Mutfak Tipi
            </label>
            <select
              name="kitchenType"
              id="kitchenType"
              value={(formData as Apartment).kitchenType || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="Açık">Açık</option>
              <option value="Kapalı">Kapalı</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Özellikler
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasBalcony"
                  id="hasBalcony"
                  checked={(formData as Apartment).hasBalcony || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="hasBalcony" className="ml-2 block text-sm text-gray-700">
                  Balkon
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasElevator"
                  id="hasElevator"
                  checked={(formData as Apartment).hasElevator || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="hasElevator" className="ml-2 block text-sm text-gray-700">
                  Asansör
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFurnished"
                  id="isFurnished"
                  checked={(formData as Apartment).isFurnished || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isFurnished" className="ml-2 block text-sm text-gray-700">
                  Eşyalı
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isInComplex"
                  id="isInComplex"
                  checked={(formData as Apartment).isInComplex || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isInComplex" className="ml-2 block text-sm text-gray-700">
                  Site İçerisinde
                </label>
              </div>
            </div>
          </div>

          {(formData as Apartment).isInComplex && (
            <>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="complexName" className="block text-sm font-medium text-gray-700">
                  Site Adı
                </label>
                <input
                  type="text"
                  name="complexName"
                  id="complexName"
                  value={(formData as Apartment).complexName || ""}
                  onChange={handleInputChange}
                  className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="dues" className="block text-sm font-medium text-gray-700">
                  Aidat
                </label>
                <input
                  type="text"
                  name="dues"
                  id="dues"
                  value={(formData as Apartment).dues || ""}
                  onChange={handleInputChange}
                  className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                />
              </div>
            </>
          )}

          {type === "Kiralık Daire" && (
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                Depozito (TL)
              </label>
              <input
                type="text"
                name="deposit"
                id="deposit"
                value={(formData as Apartment).deposit || ""}
                onChange={handleInputChange}
                className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
              />
            </div>
          )}
        </>
      );
    }

    if (type === "Satılık Arsa" || type === "Tarla") {
      return (
        <>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="zoningType" className="block text-sm font-medium text-gray-700">
              İmar Durumu
            </label>
            <select
              name="zoningType"
              id="zoningType"
              value={(formData as Land).zoningType || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="Konut">Konut</option>
              <option value="Ticari">Ticari</option>
              <option value="Tarla">Tarla</option>
              <option value="Arsa">Arsa</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="blockNumber" className="block text-sm font-medium text-gray-700">
              Ada No
            </label>
            <input
              type="text"
              name="blockNumber"
              id="blockNumber"
              value={(formData as Land).blockNumber || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="parcelNumber" className="block text-sm font-medium text-gray-700">
              Parsel No
            </label>
            <input
              type="text"
              name="parcelNumber"
              id="parcelNumber"
              value={(formData as Land).parcelNumber || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="mapNumber" className="block text-sm font-medium text-gray-700">
              Pafta No
            </label>
            <input
              type="text"
              name="mapNumber"
              id="mapNumber"
              value={(formData as Land).mapNumber || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="floorAreaRatio" className="block text-sm font-medium text-gray-700">
              Kaks (Emsal)
            </label>
            <input
              type="text"
              name="floorAreaRatio"
              id="floorAreaRatio"
              value={(formData as Land).floorAreaRatio || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="heightLimit" className="block text-sm font-medium text-gray-700">
              Gabari
            </label>
            <input
              type="text"
              name="heightLimit"
              id="heightLimit"
              value={(formData as Land).heightLimit || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          {type === "Tarla" && (
            <>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="topography" className="block text-sm font-medium text-gray-700">
                  Topografya
                </label>
                <input
                  type="text"
                  name="topography"
                  id="topography"
                  value={(formData as Field).topography || ""}
                  onChange={handleInputChange}
                  className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="irrigation" className="block text-sm font-medium text-gray-700">
                  Sulama
                </label>
                <input
                  type="text"
                  name="irrigation"
                  id="irrigation"
                  value={(formData as Field).irrigation || ""}
                  onChange={handleInputChange}
                  className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="roadStatus" className="block text-sm font-medium text-gray-700">
                  Yol Durumu
                </label>
                <input
                  type="text"
                  name="roadStatus"
                  id="roadStatus"
                  value={(formData as Field).roadStatus || ""}
                  onChange={handleInputChange}
                  className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                />
              </div>
            </>
          )}
        </>
      );
    }

    if (type?.includes("İş Yeri")) {
      return (
        <>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
              İş Yeri Tipi
            </label>
            <select
              name="businessType"
              id="businessType"
              value={(formData as Business).businessType || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="Ofis">Ofis</option>
              <option value="Dükkan">Dükkan</option>
              <option value="İmalathane">İmalathane</option>
              <option value="Depo">Depo</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="roomCount" className="block text-sm font-medium text-gray-700">
              Oda/Bölüm Sayısı
            </label>
            <input
              type="text"
              name="roomCount"
              id="roomCount"
              value={(formData as Business).roomCount || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="floorCount" className="block text-sm font-medium text-gray-700">
              Kat Sayısı
            </label>
            <input
              type="text"
              name="floorCount"
              id="floorCount"
              value={(formData as Business).floorCount || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="buildingAge" className="block text-sm font-medium text-gray-700">
              Bina Yaşı
            </label>
            <select
              name="buildingAge"
              id="buildingAge"
              value={(formData as Business).buildingAge || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="0">0</option>
              <option value="1-5">1-5</option>
              <option value="5-10">5-10</option>
              <option value="10-15">10-15</option>
              <option value="15-20">15-20</option>
              <option value="20+">20+</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="heatingType" className="block text-sm font-medium text-gray-700">
              Isıtma Tipi
            </label>
            <select
              name="heatingType"
              id="heatingType"
              value={(formData as Business).heatingType || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="Merkezi">Merkezi</option>
              <option value="Kombi">Kombi</option>
              <option value="Klima">Klima</option>
              <option value="Doğalgaz">Doğalgaz</option>
              <option value="Soba">Soba</option>
              <option value="Yok">Yok</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="elevatorCount" className="block text-sm font-medium text-gray-700">
              Asansör Sayısı
            </label>
            <input
              type="text"
              name="elevatorCount"
              id="elevatorCount"
              value={(formData as Business).elevatorCount || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Özellikler
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasTenant"
                  id="hasTenant"
                  checked={(formData as Business).hasTenant || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="hasTenant" className="ml-2 block text-sm text-gray-700">
                  Kiracılı
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Durumu
            </label>
            <select
              name="condition"
              id="condition"
              value={(formData as Business).condition || ""}
              onChange={handleInputChange}
              className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
            >
              <option value="İlk Sahip">İlk Sahip</option>
              <option value="İkinci El">İkinci El</option>
            </select>
          </div>

          {type === "Kiralık İş Yeri" && (
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                Depozito (TL)
              </label>
              <input
                type="text"
                name="deposit"
                id="deposit"
                value={(formData as Business).deposit || ""}
                onChange={handleInputChange}
                className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
              />
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">İlan Yönetimi</h1>
            <p className="mt-1 text-sm text-gray-600">
              Tüm gayrimenkul ilanlarını buradan yönetebilirsiniz
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedListing(null);
              setFormData(initialFormData);
              setIsAddModalOpen(true);
            }}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vera-600 hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Yeni İlan Ekle
          </button>
        </div>

        {/* İlanlar Tablosu */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İlan Başlığı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tür
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Konum
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
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      Yükleniyor...
                    </td>
                  </tr>
                ) : listings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                      Henüz ilan bulunmuyor. İlk ilanınızı ekleyin.
                    </td>
                  </tr>
                ) : (
                  listings.map((listing: any) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {listing.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {listing.description?.substring(0, 50)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {listing.type?.includes('Daire') && <HomeIcon className="h-5 w-5 text-gray-400 mr-2" />}
                          {listing.type?.includes('Arsa') && <MapIcon className="h-5 w-5 text-gray-400 mr-2" />}
                          {listing.type?.includes('İş Yeri') && <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />}
                          {listing.type === 'Tarla' && <BuildingStorefrontIcon className="h-5 w-5 text-gray-400 mr-2" />}
                          <span className="text-sm text-gray-900">{listing.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          listing.type?.includes('Satılık') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {listing.type?.includes('Satılık') ? 'Satılık' : 'Kiralık'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {listing.price ? `₺${Number(listing.price).toLocaleString('tr-TR')}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {listing.city}, {listing.district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          listing.status === 'Aktif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(listing.listingDate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedListing(listing);
                            setFormData(listing);
                            setIsAddModalOpen(true);
                          }}
                          className="text-vera-600 hover:text-vera-900 mr-3"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
                              try {
                                const response = await fetch(`/api/listings?id=${listing.id}`, {
                                  method: 'DELETE',
                                });
                                const result = await response.json();
                                if (result.success) {
                                  alert('İlan başarıyla silindi!');
                                  fetchListings();
                                } else {
                                  alert('Hata: ' + result.error);
                                }
                              } catch (error) {
                                alert('İlan silinirken hata oluştu.');
                              }
                            }
                          }}
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

        {/* İlan Ekleme/Düzenleme Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {selectedListing ? "İlanı Düzenle" : "Yeni İlan Ekle"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* İlan Türü */}
                  <div className="col-span-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      İlan Türü
                    </label>
                    <select
                      name="type"
                      id="type"
                      value={formData.type || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    >
                      <option value="" disabled className={placeholderClasses}>İlan türü seçiniz</option>
                      <option value="Satılık Daire" className={selectedTextClasses}>Satılık Daire</option>
                      <option value="Kiralık Daire" className={selectedTextClasses}>Kiralık Daire</option>
                      <option value="Satılık Arsa" className={selectedTextClasses}>Satılık Arsa</option>
                      <option value="Tarla" className={selectedTextClasses}>Tarla</option>
                      <option value="Satılık İş Yeri" className={selectedTextClasses}>Satılık İş Yeri</option>
                      <option value="Kiralık İş Yeri" className={selectedTextClasses}>Kiralık İş Yeri</option>
                    </select>
                  </div>

                  {/* Genel Ortak Alanlar */}
                  <div className="col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      İlan Başlığı <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={formData.title || ""}
                      onChange={handleInputChange}
                      placeholder="İlan başlığını giriniz"
                      className={`${inputBaseClasses} ${formData.title ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Açıklama
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder="İlan açıklamasını giriniz"
                      className={`${inputBaseClasses} ${formData.description ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Fiyat
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        value={formData.price || ""}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className={`${inputBaseClasses} pr-12 ${formData.price ? selectedTextClasses : placeholderClasses}`}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">TL</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      İl
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city || ""}
                      onChange={handleInputChange}
                      placeholder="İl seçiniz"
                      className={`${inputBaseClasses} ${formData.city ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                      İlçe
                    </label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      value={formData.district || ""}
                      onChange={handleInputChange}
                      placeholder="İlçe seçiniz"
                      className={`${inputBaseClasses} ${formData.district ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                      Mahalle
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      value={formData.neighborhood || ""}
                      onChange={handleInputChange}
                      placeholder="Mahalle seçiniz"
                      className={`${inputBaseClasses} ${formData.neighborhood ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="grossArea" className="block text-sm font-medium text-gray-700">
                      Brüt Alan (m²)
                    </label>
                    <input
                      type="text"
                      name="grossArea"
                      id="grossArea"
                      value={formData.grossArea || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="netArea" className="block text-sm font-medium text-gray-700">
                      Net Alan (m²)
                    </label>
                    <input
                      type="text"
                      name="netArea"
                      id="netArea"
                      value={formData.netArea || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="creditEligible" className="block text-sm font-medium text-gray-700">
                      Krediye Uygunluk
                    </label>
                    <select
                      name="creditEligible"
                      id="creditEligible"
                      value={formData.creditEligible || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    >
                      <option value="" disabled className={placeholderClasses}>Krediye uygunluk seçiniz</option>
                      <option value="Evet" className={selectedTextClasses}>Evet</option>
                      <option value="Hayır" className={selectedTextClasses}>Hayır</option>
                      <option value="Bilinmiyor" className={selectedTextClasses}>Bilinmiyor</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="deedType" className="block text-sm font-medium text-gray-700">
                      Tapu Durumu
                    </label>
                    <select
                      name="deedType"
                      id="deedType"
                      value={formData.deedType || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    >
                      <option value="Müstakil">Müstakil</option>
                      <option value="Hisseli">Hisseli</option>
                      <option value="Tahsis">Tahsis</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="listingSource" className="block text-sm font-medium text-gray-700">
                      Kimden
                    </label>
                    <select
                      name="listingSource"
                      id="listingSource"
                      value={formData.listingSource || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    >
                      <option value="Sahibinden">Sahibinden</option>
                      <option value="Emlak Ofisinden">Emlak Ofisinden</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="swapOption" className="block text-sm font-medium text-gray-700">
                      Takas
                    </label>
                    <select
                      name="swapOption"
                      id="swapOption"
                      value={formData.swapOption || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    >
                      <option value="Evet">Evet</option>
                      <option value="Hayır">Hayır</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="listingDate" className="block text-sm font-medium text-gray-700">
                      İlan Tarihi
                    </label>
                    <input
                      type="date"
                      name="listingDate"
                      id="listingDate"
                      value={formData.listingDate || ""}
                      onChange={handleInputChange}
                      className={`${inputBaseClasses} ${formData.type ? selectedTextClasses : placeholderClasses}`}
                    />
                  </div>

                  {/* Property Type'a göre özel alanlar */}
                  {renderPropertySpecificFields()}

                  {/* Fotoğraflar */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Fotoğraflar
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-vera-600 hover:text-vera-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-vera-500"
                          >
                            <span>Fotoğraf Yükle</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">veya sürükleyip bırakın</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF max 10MB
                        </p>
                      </div>
                    </div>
                    
                    {/* Yüklenen dosyaları göster */}
                    {formData.images && formData.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Seçilen Dosyalar ({formData.images.length})
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {formData.images.map((file: File, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                              <span className="text-sm text-gray-600 truncate">
                                {file.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    images: prev.images?.filter((_, i) => i !== index) || []
                                  }));
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setSelectedListing(null);
                      setFormData(initialFormData);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vera-600 hover:bg-vera-700"
                  >
                    {selectedListing ? "Güncelle" : "Kaydet"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 