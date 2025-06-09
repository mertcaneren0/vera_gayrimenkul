'use client';

import { useState, useRef } from 'react';

export default function ListingApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">İlanım Var</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">
        Gayrimenkulünüzü satmak veya kiralamak mı istiyorsunuz? Hemen ilan verin.
      </p>
      <form ref={formRef} className="mt-8 space-y-6" onSubmit={async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return; // Çoklu gönderimi engelle
        
        setIsSubmitting(true);
        
        try {
          const formData = new FormData(e.currentTarget);
          const data = {
            fullName: formData.get('name'),
            phone: formData.get('phone'),
            type: formData.get('type'),
            ada: formData.get('ada'),
            parsel: formData.get('parsel'),
            address: formData.get('address')
          };

          const res = await fetch('/api/listing-applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          const result = await res.json();
          
          if (result.success) {
            alert(result.message);
            
            // Form reset işlemini güvenli şekilde yap
            if (formRef.current) {
              formRef.current.reset();
            }
            
            // Form alanlarını gizle
            const adaParselDiv = document.getElementById('adaParselFields');
            const addressDiv = document.getElementById('addressField');
            if (adaParselDiv) adaParselDiv.style.display = 'none';
            if (addressDiv) addressDiv.style.display = 'none';
          } else {
            alert('Hata: ' + result.error);
          }
        } catch (err) {
          console.error('Form gönderim hatası:', err);
          alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
          setIsSubmitting(false);
        }
      }}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Ad Soyad
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
            Telefon
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
            Gayrimenkul Tipi
          </label>
          <select
            name="type"
            id="type"
            required
            onChange={(e) => {
              const adaParselDiv = document.getElementById('adaParselFields');
              const addressDiv = document.getElementById('addressField');
              if (adaParselDiv) adaParselDiv.style.display = e.target.value === 'arsa' ? 'block' : 'none';
              if (addressDiv) addressDiv.style.display = e.target.value === 'daire' ? 'block' : 'none';
            }}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Seçiniz</option>
            <option value="arsa">Arsa</option>
            <option value="daire">Daire</option>
          </select>
        </div>
        <div id="adaParselFields" style={{ display: 'none' }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ada" className="block text-sm font-medium leading-6 text-gray-900">
                Ada
              </label>
              <input
                type="text"
                name="ada"
                id="ada"
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="parsel" className="block text-sm font-medium leading-6 text-gray-900">
                Parsel
              </label>
              <input
                type="text"
                name="parsel"
                id="parsel"
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div id="addressField" style={{ display: 'none' }}>
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Adres
          </label>
          <textarea
            name="address"
            id="address"
            rows={3}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-vera-600 hover:bg-vera-500'
          }`}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  );
} 