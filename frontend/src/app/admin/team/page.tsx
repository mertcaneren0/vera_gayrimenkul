'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  fullName: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export default function TeamPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    description: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      const result = await response.json();
      if (result.success) {
        setTeamMembers(result.data);
      }
    } catch (error) {
      console.error('Ekip üyeleri alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      if (formData.image) {
        // File selected for upload
        submitData.append('image', formData.image);
      }

      const response = await fetch('/api/team', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        alert('Ekip üyesi başarıyla eklendi!');
        setIsAddModalOpen(false);
        setFormData({
          fullName: '',
          title: '',
          description: '',
          image: null
        });
        setImagePreview(null);
        fetchTeamMembers();
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      alert('Ekip üyesi eklenirken hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string, fullName: string) => {
    if (confirm(`${fullName} adlı ekip üyesini silmek istediğinizden emin misiniz?`)) {
      try {
        const response = await fetch(`/api/team?id=${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Ekip üyesi başarıyla silindi!');
          fetchTeamMembers();
        } else {
          alert('Hata: ' + result.error);
        }
      } catch (error) {
        alert('Ekip üyesi silinirken hata oluştu.');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Ekip Yönetimi</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-vera-600 hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Yeni Ekip Üyesi
        </button>
      </div>

      {/* Ekip Üyeleri Listesi */}
      <div className="bg-white shadow rounded-lg">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Henüz ekip üyesi bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4">
                  <div className="w-full overflow-hidden rounded-lg" style={{ aspectRatio: '1080/1350' }}>
                    <img
                      src={member.image}
                      alt={member.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/1080x1350/21375e/ffffff?text=Yüklenmedi';
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{member.fullName}</h3>
                    <p className="text-sm font-medium text-vera-600">{member.title}</p>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">{member.description}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => handleDelete(member.id, member.fullName)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Yeni Ekip Üyesi Ekleme Modalı */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-medium mb-4">Yeni Ekip Üyesi Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  İsim Soyisim *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Örn: Ahmet Yılmaz"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-500 focus:ring-vera-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Ünvan *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Örn: Satış Danışmanı"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-500 focus:ring-vera-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Açıklama *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Ekip üyesi hakkında kısa bir açıklama..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-vera-500 focus:ring-vera-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Fotoğraf
                </label>
                {imagePreview ? (
                  <div className="mt-1">
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Önizleme" 
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs text-green-600 mt-2">Seçilen dosya: {formData.image?.name}</p>
                  </div>
                ) : (
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
                          htmlFor="image-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-vera-600 hover:text-vera-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-vera-500"
                        >
                          <span>Fotoğraf Yükle</span>
                          <input
                            id="image-upload"
                            name="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">veya sürükleyip bırakın</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF max 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-vera-600 hover:bg-vera-700'
                  }`}
                >
                  {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 