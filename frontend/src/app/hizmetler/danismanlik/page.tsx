export default function Danismanlik() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Danışmanlık Hizmetleri</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Gayrimenkul olarak, gayrimenkul sektöründe uzman kadromuz ile kapsamlı danışmanlık hizmetleri
            sunuyoruz. Yatırımcılara, şirketlere ve bireylere özel çözümler üretiyor, gayrimenkul yatırımlarında
            doğru kararlar almalarını sağlıyoruz.
          </p>
        </div>

        {/* Danışmanlık Hizmetlerimiz */}
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Danışmanlık Hizmetlerimiz</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Yatırım Danışmanlığı',
                description: 'Gayrimenkul yatırımlarında stratejik danışmanlık ve portföy yönetimi',
                icon: '📈',
                details: [
                  'Yatırım stratejisi geliştirme',
                  'Portföy optimizasyonu',
                  'Risk analizi ve yönetimi',
                  'Getiri analizi ve projeksiyon',
                ],
              },
              {
                title: 'Proje Danışmanlığı',
                description: 'Gayrimenkul projelerinin geliştirilmesi ve yönetimi',
                icon: '🏗️',
                details: [
                  'Proje fizibilite analizi',
                  'Pazar araştırması',
                  'Finansal modelleme',
                  'Proje yönetimi danışmanlığı',
                ],
              },
              {
                title: 'Finansal Danışmanlık',
                description: 'Gayrimenkul finansmanı ve yatırım analizi',
                icon: '💰',
                details: [
                  'Finansman stratejisi',
                  'Kredi danışmanlığı',
                  'Yatırım analizi',
                  'Finansal modelleme',
                ],
              },
              {
                title: 'Pazar Araştırması',
                description: 'Detaylı piyasa analizi ve trend araştırması',
                icon: '📊',
                details: [
                  'Piyasa trend analizi',
                  'Rakip analizi',
                  'Talep analizi',
                  'Fiyat analizi',
                ],
              },
              {
                title: 'Hukuki Danışmanlık',
                description: 'Gayrimenkul hukuku ve mevzuat danışmanlığı',
                icon: '⚖️',
                details: [
                  'Sözleşme danışmanlığı',
                  'Mevzuat analizi',
                  'Hukuki risk değerlendirmesi',
                  'Uyuşmazlık çözümü',
                ],
              },
              {
                title: 'Stratejik Danışmanlık',
                description: 'Gayrimenkul stratejisi ve kurumsal danışmanlık',
                icon: '🎯',
                details: [
                  'Stratejik planlama',
                  'Kurumsal danışmanlık',
                  'Organizasyon yapılandırma',
                  'Süreç optimizasyonu',
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

        {/* Çalışma Metodolojimiz */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Çalışma Metodolojimiz</h2>
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
                  title: '1. İhtiyaç Analizi',
                  description: 'Müşteri ihtiyaçlarının detaylı analizi ve hedef belirleme',
                  icon: '🎯',
                },
                {
                  title: '2. Veri Toplama',
                  description: 'Piyasa verilerinin toplanması ve analizi',
                  icon: '📊',
                },
                {
                  title: '3. Strateji Geliştirme',
                  description: 'Özel çözümlerin geliştirilmesi ve strateji oluşturma',
                  icon: '💡',
                },
                {
                  title: '4. Uygulama ve Takip',
                  description: 'Stratejilerin uygulanması ve sürekli takibi',
                  icon: '📈',
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
                title: 'Uzman Ekip',
                description: 'Sektörde deneyimli ve uzman danışmanlar',
                icon: '👥',
              },
              {
                title: 'Kapsamlı Analiz',
                description: 'Detaylı piyasa ve veri analizi',
                icon: '📊',
              },
              {
                title: 'Özel Çözümler',
                description: 'Müşteriye özel stratejiler ve çözümler',
                icon: '🎯',
              },
              {
                title: 'Güncel Bilgi',
                description: 'Sürekli güncellenen piyasa bilgisi',
                icon: '📈',
              },
              {
                title: 'Güvenilirlik',
                description: 'Şeffaf ve dürüst danışmanlık hizmeti',
                icon: '🤝',
              },
              {
                title: 'Sürekli Destek',
                description: '7/24 danışmanlık ve destek hizmeti',
                icon: '💪',
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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Danışmanlık Hizmeti Alın</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gayrimenkul yatırımlarınızda doğru kararlar almak için uzman danışmanlarımızdan destek alın.
            Size özel çözümler için hemen iletişime geçin.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/iletisim"
                className="rounded-md bg-vera-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-vera-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vera-600"
            >
              İletişime Geçin
            </a>
            <a href="/hizmetler/danismanlik/randevu" className="text-sm font-semibold leading-6 text-gray-900">
              Online Randevu Alın <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 