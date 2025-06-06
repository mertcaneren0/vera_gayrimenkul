export default function Analiz() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Analiz Hizmetleri</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Gayrimenkul olarak, gayrimenkul sektöründe detaylı analiz ve araştırma hizmetleri sunuyoruz.
            Güncel veriler ve ileri analiz yöntemleri ile piyasa trendlerini, yatırım fırsatlarını ve
            risk faktörlerini değerlendiriyoruz.
          </p>
        </div>

        {/* Analiz Hizmetlerimiz */}
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Analiz Hizmetlerimiz</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Piyasa Analizi',
                description: 'Gayrimenkul piyasasının detaylı analizi ve trend değerlendirmesi',
                icon: '📊',
                details: [
                  'Piyasa trend analizi',
                  'Fiyat analizi',
                  'Talep analizi',
                  'Arz analizi',
                ],
              },
              {
                title: 'Yatırım Analizi',
                description: 'Gayrimenkul yatırımlarının detaylı analizi ve değerlendirmesi',
                icon: '📈',
                details: [
                  'Getiri analizi',
                  'Risk analizi',
                  'Nakit akışı analizi',
                  'Yatırım performans analizi',
                ],
              },
              {
                title: 'Bölge Analizi',
                description: 'Bölgesel gelişim ve yatırım potansiyeli analizi',
                icon: '🗺️',
                details: [
                  'Bölgesel gelişim analizi',
                  'Altyapı analizi',
                  'Ulaşım analizi',
                  'Sosyo-ekonomik analiz',
                ],
              },
              {
                title: 'Proje Analizi',
                description: 'Gayrimenkul projelerinin detaylı analizi ve değerlendirmesi',
                icon: '🏗️',
                details: [
                  'Fizibilite analizi',
                  'Pazar analizi',
                  'Finansal analiz',
                  'Risk analizi',
                ],
              },
              {
                title: 'Rekabet Analizi',
                description: 'Rakip analizi ve pazar payı değerlendirmesi',
                icon: '🎯',
                details: [
                  'Rakip analizi',
                  'Pazar payı analizi',
                  'Rekabet stratejisi analizi',
                  'SWOT analizi',
                ],
              },
              {
                title: 'Ekonomik Analiz',
                description: 'Makroekonomik göstergelerin gayrimenkul sektörüne etkisi analizi',
                icon: '💹',
                details: [
                  'Makroekonomik analiz',
                  'Sektörel analiz',
                  'Regülasyon analizi',
                  'Trend analizi',
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

        {/* Analiz Metodolojimiz */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Analiz Metodolojimiz</h2>
          <div className="mt-16">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Analiz Süreci</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: '1. Veri Toplama',
                  description: 'Güncel ve güvenilir verilerin toplanması ve doğrulanması',
                  icon: '📥',
                },
                {
                  title: '2. Veri Analizi',
                  description: 'İleri analiz yöntemleri ile verilerin değerlendirilmesi',
                  icon: '🔍',
                },
                {
                  title: '3. Modelleme',
                  description: 'Analitik modellerin geliştirilmesi ve uygulanması',
                  icon: '📊',
                },
                {
                  title: '4. Raporlama',
                  description: 'Detaylı analiz raporlarının hazırlanması ve sunulması',
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

        {/* Analiz Araçlarımız */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Analiz Araçlarımız</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Veri Tabanları',
                description: 'Güncel ve kapsamlı gayrimenkul veri tabanları',
                icon: '💾',
              },
              {
                title: 'Analiz Yazılımları',
                description: 'İleri analiz ve modelleme yazılımları',
                icon: '💻',
              },
              {
                title: 'Coğrafi Bilgi Sistemleri',
                description: 'Harita tabanlı analiz ve görselleştirme araçları',
                icon: '🗺️',
              },
              {
                title: 'İstatistiksel Analiz',
                description: 'İleri istatistiksel analiz ve tahminleme modelleri',
                icon: '📈',
              },
              {
                title: 'Yapay Zeka',
                description: 'Yapay zeka destekli analiz ve tahminleme sistemleri',
                icon: '🤖',
              },
              {
                title: 'Görselleştirme',
                description: 'İnteraktif veri görselleştirme ve raporlama araçları',
                icon: '📊',
              },
            ].map((tool) => (
              <div key={tool.title} className="relative rounded-2xl bg-gray-50 p-8">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{tool.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İletişim CTA */}
        <div className="mx-auto mt-32 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Analiz Hizmeti Alın</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gayrimenkul yatırımlarınız için detaylı analiz ve araştırma hizmetlerimizden yararlanın.
            Uzman ekibimiz size en kısa sürede dönüş yapacaktır.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/iletisim"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              İletişime Geçin
            </a>
            <a href="/hizmetler/analiz/randevu" className="text-sm font-semibold leading-6 text-gray-900">
              Online Randevu Alın <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 