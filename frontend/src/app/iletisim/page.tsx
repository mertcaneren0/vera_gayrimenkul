export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              İletişim
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Vera Grup olarak sizlere en iyi hizmeti sunmak için buradayız. Sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">İletişim Bilgileri</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ofisimizi ziyaret edebilir veya telefon ve e-posta yoluyla bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h3 className="border-l-4 border-indigo-600 pl-6 font-semibold text-gray-900">Adres</h3>
            <address className="mt-2 border-l-4 border-gray-200 pl-6 text-gray-600">
              İnönü Mahallesi Murat Hüdavendigar Caddesi
              <br />
              No: 112 / 1A, 39750
              <br />
              Lüleburgaz/Kırklareli, Türkiye
            </address>
          </div>
          <div>
            <h3 className="border-l-4 border-indigo-600 pl-6 font-semibold text-gray-900">Telefon</h3>
            <div className="mt-2 border-l-4 border-gray-200 pl-6 text-gray-600">
              <a href="tel:+905422414541" className="hover:text-indigo-600">
                +90 (542) 241 45 41
              </a>
            </div>
          </div>
          <div>
            <h3 className="border-l-4 border-indigo-600 pl-6 font-semibold text-gray-900">E-posta</h3>
            <div className="mt-2 border-l-4 border-gray-200 pl-6 text-gray-600">
              <a href="mailto:info@veragrup.com" className="hover:text-indigo-600">
                info@veragrup.com
              </a>
            </div>
          </div>
          <div>
            <h3 className="border-l-4 border-indigo-600 pl-6 font-semibold text-gray-900">Çalışma Saatleri</h3>
            <dl className="mt-2 border-l-4 border-gray-200 pl-6 text-gray-600">
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

      {/* Map Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Konum</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ofisimizin konumunu harita üzerinden inceleyebilirsiniz.
          </p>
        </div>
        <div className="mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
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
    </div>
  );
} 