'use client';

import Link from 'next/link';

const quickLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Kurumsal', href: '/kurumsal' },
  { name: 'Ekibimiz', href: '/ekibimiz' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Referanslar', href: '/referanslar' },
  { name: 'Kariyer', href: '/kariyer' },
  { name: 'İlanlar', href: '/ilanlar' },
  { name: 'İletişim', href: '/iletisim' },
];

const contactInfo = {
  address: 'Örnek Mahallesi, Örnek Sokak No:1, İstanbul',
  phone: '+90 (212) 123 45 67',
  email: 'info@veragayrimenkul.com',
};

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Hızlı Bağlantılar - %20 */}
          <div className="lg:col-span-1">
            
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Hızlı Bağlantılar</h3>
            <ul role="list" className="space-y-4">
              <li>
                <a href="/kurumsal/vera-gayrimenkul" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Vera Gayrimenkul
                </a>
              </li>
              <li>
                <a href="/kurumsal/vera-medya" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Vera Medya
                </a>
              </li>
              <li>
                <a href="/kurumsal/vera-grup" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Vera Grup
                </a>
              </li>
              <li>
                <a href="/hizmetler/degerleme" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Değerleme
                </a>
              </li>
              <li>
                <a href="/hizmetler/danismanlik" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Danışmanlık
                </a>
              </li>
              <li>
                <a href="/hizmetler/analiz" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Analiz
                </a>
              </li>
              <li>
                <a href="/ekibimiz" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Ekibimiz
                </a>
              </li>
              <li>
                <a href="/referanslar" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Referanslar
                </a>
              </li>
              <li>
                <a href="/kariyer" className="text-sm leading-6 text-gray-300 hover:text-white">
                  Kariyer
                </a>
              </li>
              <li>
                <a href="/ilanlar" className="text-sm leading-6 text-gray-300 hover:text-white">
                  İlanlar
                </a>
              </li>
            </ul>
            <div className="mt-6 flex space-x-6">
              
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
            </div>
          </div>

          {/* Google Maps - %50 */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">Konum</h3>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.7181650435487!2d27.357004176957318!3d41.401926595091744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4a5d692575e35%3A0x4fc31ed773397b5e!2sVera%20Grup%20Gayrimenkul!5e0!3m2!1str!2suk!4v1749220885290!5m2!1str!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* İletişim Bilgileri - %30 */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-white mb-4">İletişim Bilgileri</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-300">Adres</h4>
                <p className="mt-2 text-sm text-gray-300">
                  İnönü Mahallesi Murat Hüdavendigar Caddesi
                  <br />
                  No: 112 / 1A, 39750
                  <br />
                  Lüleburgaz/Kırklareli, Türkiye
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">Telefon</h4>
                <p className="mt-2">
                  <a href="tel:+905422414541" className="text-sm text-gray-300 hover:text-white">
                    +90 (542) 241 45 41
                  </a>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">Email</h4>
                <p className="mt-2">
                  <a href="mailto:info@veragrup.com" className="text-sm text-gray-300 hover:text-white">
                    info@veragrup.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">Çalışma Saatleri</h4>
                <dl className="mt-2 space-y-1 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <dt>Pazartesi - Cumartesi</dt>
                    <dd>09:00 - 19:00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Pazar</dt>
                    <dd>Kapalı</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8 sm:mt-12 lg:mt-16">
          <p className="text-xs leading-5 text-gray-400" style={{textAlign: "center"}}>
              Good design speaks. Our design flirts. – <b>21collective™</b>
          </p>
        </div>
      </div>
    </footer>
  );
} 