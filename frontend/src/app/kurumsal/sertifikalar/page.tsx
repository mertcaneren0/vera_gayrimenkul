export default function Sertifikalar() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Sertifikalarımız</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Grup olarak, kalitemizi ve güvenilirliğimizi belgeleyen ulusal ve uluslararası sertifikalarımızla
            hizmet veriyoruz. Bu sertifikalar, müşterilerimize sunduğumuz hizmetlerin kalitesini ve
            profesyonelliğimizi kanıtlamaktadır.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-2">
          {[
            {
              title: 'ISO 9001:2015',
              description: 'Kalite Yönetim Sistemi Sertifikası',
              details: [
                'Kalite yönetim sistemlerimizin uluslararası standartlara uygunluğunu belgeler',
                'Sürekli iyileştirme ve müşteri memnuniyeti odaklı yaklaşımımızı teyit eder',
                'Tüm süreçlerimizin standartlara uygun yönetildiğini gösterir',
              ],
              image: '/placeholder-iso.jpg',
            },
            {
              title: 'TSE Belgesi',
              description: 'Türk Standartları Enstitüsü Belgesi',
              details: [
                'Hizmetlerimizin ulusal standartlara uygunluğunu belgeler',
                'Türkiye\'deki gayrimenkul sektörü standartlarına uyumumuzu gösterir',
                'Kalite ve güvenilirlik standartlarımızı teyit eder',
              ],
              image: '/placeholder-tse.jpg',
            },
            {
              title: 'TÜV Sertifikası',
              description: 'Teknik Denetim ve Sertifikasyon',
              details: [
                'Teknik hizmetlerimizin kalitesini belgeler',
                'Değerleme ve danışmanlık hizmetlerimizin güvenilirliğini teyit eder',
                'Uluslararası teknik standartlara uyumumuzu gösterir',
              ],
              image: '/placeholder-tuv.jpg',
            },
            {
              title: 'REID Sertifikası',
              description: 'Gayrimenkul Değerleme Uzmanlığı',
              details: [
                'Değerleme uzmanlarımızın profesyonel yeterliliğini belgeler',
                'Uluslararası değerleme standartlarına uyumumuzu gösterir',
                'Değerleme hizmetlerimizin güvenilirliğini teyit eder',
              ],
              image: '/placeholder-reid.jpg',
            },
          ].map((certificate) => (
            <div key={certificate.title} className="flex flex-col rounded-2xl bg-gray-50 p-8">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 mb-8">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold leading-8 text-gray-900">{certificate.title}</h3>
              <p className="mt-2 text-base font-medium text-indigo-600">{certificate.description}</p>
              <ul className="mt-4 list-disc pl-8 space-y-2 text-base leading-7 text-gray-600">
                {certificate.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sertifika Süreçlerimiz */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sertifika Süreçlerimiz</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Kalite Kontrol',
                description: 'Düzenli iç denetimler ve kalite kontrol süreçleri ile sertifika standartlarını koruyoruz.',
                icon: '🔍',
              },
              {
                title: 'Sürekli Gelişim',
                description: 'Sertifika gereksinimlerini aşmak için sürekli eğitim ve gelişim programları uyguluyoruz.',
                icon: '📈',
              },
              {
                title: 'Uzman Kadro',
                description: 'Sertifikalı uzman kadromuz ile en yüksek standartlarda hizmet sunuyoruz.',
                icon: '👥',
              },
            ].map((process) => (
              <div key={process.title} className="relative rounded-2xl bg-gray-50 p-8">
                <div className="text-4xl mb-4">{process.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{process.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sertifika Yenileme */}
        <div className="mx-auto mt-32 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sertifika Yenileme</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Tüm sertifikalarımız düzenli olarak yenilenmekte ve güncel standartlara uygunluğu kontrol edilmektedir.
            Bu süreç, hizmet kalitemizin sürekliliğini ve güvenilirliğimizi garanti altına almaktadır.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/iletisim"
                className="rounded-md bg-vera-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-vera-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vera-600"
            >
              Sertifikalarımız Hakkında Bilgi Alın
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 