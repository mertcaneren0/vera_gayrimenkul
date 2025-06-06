export default function VeraMedya() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Vera Medya</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dijital dünyada gayrimenkul projelerinizi en etkili şekilde tanıtıyor, markanızı güçlendiriyoruz.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Dijital Pazarlama</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Vera Medya olarak, gayrimenkul projelerinizi dijital dünyada en etkili şekilde tanıtıyor,
                hedef kitlenize ulaşmanızı sağlıyoruz. Modern dijital pazarlama stratejileri ve yaratıcı
                içerik üretimi ile projelerinizi öne çıkarıyoruz.
              </p>

              <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Sosyal Medya Yönetimi
                  </dt>
                  <dd className="inline">: Profesyonel sosyal medya yönetimi ile projelerinizi hedef kitlenize ulaştırıyoruz.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    İçerik Üretimi
                  </dt>
                  <dd className="inline">: Yaratıcı ve etkileyici içeriklerle projelerinizi en iyi şekilde anlatıyoruz.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    SEO Optimizasyonu
                  </dt>
                  <dd className="inline">: Arama motorlarında üst sıralarda yer almanızı sağlıyoruz.</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
              <img
                src="/placeholder-digital.jpg"
                alt="Dijital Pazarlama"
                className="object-cover"
              />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src="/placeholder-social.jpg"
                  alt="Sosyal Medya"
                  className="object-cover"
                />
              </div>
              <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src="/placeholder-content.jpg"
                  alt="İçerik Üretimi"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hizmetlerimiz */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hizmetlerimiz</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Sosyal Medya Yönetimi',
                description: 'Profesyonel sosyal medya yönetimi ile projelerinizi hedef kitlenize ulaştırıyoruz.',
                icon: '📱',
              },
              {
                title: 'İçerik Üretimi',
                description: 'Yaratıcı ve etkileyici içeriklerle projelerinizi en iyi şekilde anlatıyoruz.',
                icon: '✍️',
              },
              {
                title: 'SEO Optimizasyonu',
                description: 'Arama motorlarında üst sıralarda yer almanızı sağlıyoruz.',
                icon: '🔍',
              },
              {
                title: 'Dijital Reklam',
                description: 'Hedefli reklam kampanyaları ile projelerinizi doğru kitleye ulaştırıyoruz.',
                icon: '📢',
              },
              {
                title: 'Fotoğraf & Video',
                description: 'Profesyonel fotoğraf ve video çekimleri ile projelerinizi en iyi şekilde tanıtıyoruz.',
                icon: '📸',
              },
              {
                title: 'Web Tasarım',
                description: 'Modern ve kullanıcı dostu web siteleri ile online varlığınızı güçlendiriyoruz.',
                icon: '💻',
              },
            ].map((service) => (
              <div key={service.title} className="relative rounded-2xl bg-gray-50 p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 