export default function HizmetPolitikasi() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Hizmet Politikamız</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Grup olarak, müşterilerimize en kaliteli hizmeti sunmak için sürekli kendimizi geliştiriyor ve
            hizmet standartlarımızı yükseltiyoruz. Bu politika, hizmet kalitemizi ve müşteri memnuniyetimizi
            garanti altına almak için oluşturulmuştur.
          </p>

          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Hizmet Standartlarımız</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                <p>
                  Vera Grup olarak, aşağıdaki temel standartları benimsiyor ve uyguluyoruz:
                </p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Profesyonel ve etik davranış</li>
                  <li>Şeffaf ve dürüst iletişim</li>
                  <li>Zamanında ve kaliteli hizmet</li>
                  <li>Sürekli gelişim ve yenilik</li>
                  <li>Müşteri odaklı yaklaşım</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">2. Hizmet Süreçlerimiz</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                <h3 className="font-semibold text-gray-900">2.1. Müşteri İlişkileri</h3>
                <ul className="list-disc pl-8 space-y-2">
                  <li>İlk görüşmeden itibaren profesyonel yaklaşım</li>
                  <li>Düzenli iletişim ve bilgilendirme</li>
                  <li>Hızlı ve etkili sorun çözümü</li>
                  <li>Müşteri geri bildirimlerinin değerlendirilmesi</li>
                </ul>

                <h3 className="font-semibold text-gray-900 mt-6">2.2. Hizmet Kalitesi</h3>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Uzman kadro ile hizmet</li>
                  <li>Güncel teknoloji kullanımı</li>
                  <li>Kalite kontrol süreçleri</li>
                  <li>Sürekli eğitim ve gelişim</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">3. Hizmet Kategorilerimiz</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {[
                    {
                      title: 'Gayrimenkul Danışmanlığı',
                      items: [
                        'Değerleme hizmetleri',
                        'Satış ve kiralama danışmanlığı',
                        'Yatırım danışmanlığı',
                        'Portföy yönetimi',
                      ],
                    },
                    {
                      title: 'Dijital Pazarlama',
                      items: [
                        'Sosyal medya yönetimi',
                        'İçerik üretimi',
                        'SEO optimizasyonu',
                        'Dijital reklam yönetimi',
                      ],
                    },
                    {
                      title: 'Proje Geliştirme',
                      items: [
                        'Proje danışmanlığı',
                        'Yatırım analizi',
                        'Pazar araştırması',
                        'Stratejik planlama',
                      ],
                    },
                    {
                      title: 'Müşteri Hizmetleri',
                      items: [
                        '7/24 destek',
                        'Online randevu sistemi',
                        'Müşteri geri bildirim yönetimi',
                        'Şikayet yönetimi',
                      ],
                    },
                  ].map((category) => (
                    <div key={category.title} className="rounded-2xl bg-gray-50 p-6">
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <ul className="mt-4 list-disc pl-8 space-y-2">
                        {category.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">4. Kalite Kontrol</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                <p>
                  Hizmet kalitemizi sürekli olarak kontrol ediyor ve geliştiriyoruz. Bu kapsamda:
                </p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Düzenli müşteri memnuniyet anketleri</li>
                  <li>Periyodik hizmet değerlendirmeleri</li>
                  <li>Ekip içi eğitim ve gelişim programları</li>
                  <li>Kalite standartlarına uyum denetimleri</li>
                  <li>Sürekli iyileştirme çalışmaları</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">5. Şikayet ve Öneriler</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-gray-600">
                <p>
                  Müşterilerimizin geri bildirimleri bizim için çok değerlidir. Şikayet ve önerileriniz için:
                </p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>E-posta: info@veragrup.com</li>
                  <li>Telefon: +90 542 241 45 41</li>
                  
                </ul>
                <p className="mt-4">
                  Tüm geri bildirimleriniz 24 saat içinde değerlendirilecek ve size en kısa sürede dönüş yapılacaktır.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 