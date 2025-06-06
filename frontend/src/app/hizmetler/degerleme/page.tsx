export default function Degerleme() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Değerleme Hizmetleri</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Gayrimenkul olarak, uzman kadromuz ve güncel teknolojik altyapımız ile gayrimenkul değerleme
            hizmetlerini en yüksek standartlarda sunuyoruz. Her türlü gayrimenkulün değerlemesini, uluslararası
            standartlara uygun olarak gerçekleştiriyoruz.
          </p>
        </div>

        {/* Değerleme Türleri */}
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Değerleme Türleri</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Konut Değerleme',
                description: 'Daire, villa, müstakil ev gibi konut türlerinin değerlemesi',
                icon: '🏠',
                details: [
                  'Satış değeri tespiti',
                  'Kira değeri tespiti',
                  'İpotek değeri tespiti',
                  'Sigorta değeri tespiti',
                ],
              },
              {
                title: 'Ticari Gayrimenkul Değerleme',
                description: 'Ofis, dükkan, plaza gibi ticari gayrimenkullerin değerlemesi',
                icon: '🏢',
                details: [
                  'Yatırım değeri tespiti',
                  'Gelir değeri tespiti',
                  'Piyasa değeri tespiti',
                  'Kira değeri tespiti',
                ],
              },
              {
                title: 'Arsa Değerleme',
                description: 'Arsa, tarla, bağ, bahçe gibi arazi türlerinin değerlemesi',
                icon: '🌳',
                details: [
                  'Geliştirme potansiyeli analizi',
                  'İmar durumu değerlendirmesi',
                  'Piyasa değeri tespiti',
                  'Yatırım değeri tespiti',
                ],
              },
              {
                title: 'Endüstriyel Gayrimenkul Değerleme',
                description: 'Fabrika, depo, atölye gibi endüstriyel gayrimenkullerin değerlemesi',
                icon: '🏭',
                details: [
                  'Üretim kapasitesi analizi',
                  'Yatırım değeri tespiti',
                  'Gelir değeri tespiti',
                  'Piyasa değeri tespiti',
                ],
              },
              {
                title: 'Karma Kullanımlı Gayrimenkul Değerleme',
                description: 'AVM, otel, rezidans gibi karma kullanımlı gayrimenkullerin değerlemesi',
                icon: '🏪',
                details: [
                  'Gelir potansiyeli analizi',
                  'Yatırım değeri tespiti',
                  'Piyasa değeri tespiti',
                  'Kira değeri tespiti',
                ],
              },
              {
                title: 'Özel Amaçlı Gayrimenkul Değerleme',
                description: 'Okul, hastane, spor tesisi gibi özel amaçlı gayrimenkullerin değerlemesi',
                icon: '🎯',
                details: [
                  'Kullanım değeri tespiti',
                  'Yatırım değeri tespiti',
                  'Piyasa değeri tespiti',
                  'Özel kullanım analizi',
                ],
              },
            ].map((service) => (
              <div key={service.title} className="relative rounded-2xl bg-gray-50 p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{service.title}</h3>
                <p className="mt-2 text-base text-gray-600">{service.description}</p>
                <ul className="mt-4 list-disc pl-8 space-y-2 text-base leading-7 text-gray-600">
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Değerleme Süreci */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Değerleme Sürecimiz</h2>
          <div className="mt-16">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Süreç Adımları</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: '1. Görüşme ve Bilgi Toplama',
                  description: 'Müşteri ihtiyaçlarının belirlenmesi ve gerekli bilgilerin toplanması',
                  icon: '🤝',
                },
                {
                  title: '2. Sahada İnceleme',
                  description: 'Gayrimenkulün detaylı incelenmesi ve veri toplanması',
                  icon: '🔍',
                },
                {
                  title: '3. Piyasa Araştırması',
                  description: 'Benzer gayrimenkullerin analizi ve piyasa değerlerinin tespiti',
                  icon: '📊',
                },
                {
                  title: '4. Raporlama',
                  description: 'Detaylı değerleme raporunun hazırlanması ve sunulması',
                  icon: '📝',
                },
              ].map((step) => (
                <div key={step.title} className="relative rounded-2xl bg-gray-50 p-8">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{step.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neden Biz */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Neden Vera Gayrimenkul?</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Uzman Kadro',
                description: 'Sektörde deneyimli ve sertifikalı değerleme uzmanları',
                icon: '👥',
              },
              {
                title: 'Teknolojik Altyapı',
                description: 'Güncel değerleme yazılımları ve veri tabanları',
                icon: '💻',
              },
              {
                title: 'Hızlı Hizmet',
                description: 'Kısa sürede detaylı ve güvenilir değerleme raporları',
                icon: '⚡',
              },
              {
                title: 'Uluslararası Standartlar',
                description: 'REID ve diğer uluslararası standartlara uygun değerleme',
                icon: '🌍',
              },
              {
                title: 'Kapsamlı Analiz',
                description: 'Detaylı piyasa araştırması ve analiz',
                icon: '📊',
              },
              {
                title: 'Müşteri Odaklı',
                description: 'Müşteri ihtiyaçlarına özel çözümler',
                icon: '🎯',
              },
            ].map((feature) => (
              <div key={feature.title} className="relative rounded-2xl bg-gray-50 p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İletişim CTA */}
        <div className="mx-auto mt-32 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Değerleme Hizmeti Alın</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gayrimenkulünüzün değerini öğrenmek için hemen bizimle iletişime geçin. Uzman ekibimiz size
            en kısa sürede dönüş yapacaktır.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/iletisim"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              İletişime Geçin
            </a>
            <a href="/hizmetler/degerleme/randevu" className="text-sm font-semibold leading-6 text-gray-900">
              Online Randevu Alın <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 