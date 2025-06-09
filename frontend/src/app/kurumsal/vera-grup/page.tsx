export default function VeraGrup() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Vera Grup</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gayrimenkul sektöründe güvenilir çözüm ortağınız. Vera Grup olarak, sektördeki tüm ihtiyaçlarınıza
            kapsamlı çözümler sunuyoruz.
          </p>
        </div>

        {/* Şirketlerimiz */}
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Şirketlerimiz</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Vera Gayrimenkul',
                description: 'Gayrimenkul danışmanlığı, değerleme ve yatırım danışmanlığı hizmetleri.',
                icon: '🏢',
                link: '/kurumsal/vera-gayrimenkul',
              },
              {
                title: 'Vera Proje',
                description: 'Gayrimenkul proje geliştirme ve yatırım danışmanlığı hizmetleri.',
                icon: '📈',
                link: '/ilanlar',
              },
            ].map((company) => (
              <a
                key={company.title}
                href={company.link}
                className="relative rounded-2xl bg-gray-50 p-8 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="text-4xl mb-4">{company.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{company.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{company.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Neden Biz */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Neden Vera Grup?</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Deneyim',
                description: 'Sektörde uzun yıllara dayanan deneyimimiz ile güvenilir hizmet sunuyoruz.',
                icon: '⭐',
              },
              {
                title: 'Uzman Ekip',
                description: 'Alanında uzman profesyonel ekibimiz ile kaliteli hizmet garantisi veriyoruz.',
                icon: '👥',
              },
              {
                title: 'Kapsamlı Hizmet',
                description: 'Gayrimenkul sektöründeki tüm ihtiyaçlarınıza tek çatı altında çözüm sunuyoruz.',
                icon: '🎯',
              },
              {
                title: 'Müşteri Odaklı',
                description: 'Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayıp, çözüm üretiyoruz.',
                icon: '🤝',
              },
              {
                title: 'Teknoloji',
                description: 'Modern teknolojileri kullanarak hizmetlerimizi sürekli geliştiriyoruz.',
                icon: '💡',
              },
              {
                title: 'Güvenilirlik',
                description: 'Şeffaf ve dürüst iş anlayışımız ile güvenilir bir iş ortağı oluyoruz.',
                icon: '🔒',
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

       
      </div>
    </div>
  );
} 