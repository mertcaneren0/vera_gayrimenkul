'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  fullName: string;
  title: string;
  description: string;
  image: string;
}

export default function TeamPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

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
        {teamMembers.length === 0 ? (
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
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                    <img
                      src={member.image}
                      alt={member.fullName}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{member.fullName}</h3>
                    <p className="text-sm font-medium text-indigo-600">{member.title}</p>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">{member.description}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-sm text-indigo-600 hover:text-indigo-900">
                      Düzenle
                    </button>
                    <button className="text-sm text-red-600 hover:text-red-900">
                      Sil
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Yeni Ekip Üyesi Ekle</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Örn: Ahmet Yılmaz"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Örn: Satış Danışmanı"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Açıklama
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Ekip üyesi hakkında kısa bir açıklama..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Fotoğraf
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
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Fotoğraf Yükle</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">veya sürükleyip bırakın</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF max 10MB</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-vera-600 border border-transparent rounded-md hover:bg-vera-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vera-500"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 