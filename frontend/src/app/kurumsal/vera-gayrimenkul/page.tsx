export default function VeraGayrimenkul() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Vera Gayrimenkul</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Vera Gayrimenkul olarak, gayrimenkul sektöründe 20 yılı aşkın deneyimimizle müşterilerimize en iyi hizmeti sunuyoruz.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Hakkımızda</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Vera Gayrimenkul, müşterilerine güvenilir ve profesyonel gayrimenkul danışmanlığı hizmeti sunan,
                sektörün önde gelen kuruluşlarından biridir. Deneyimli ekibimiz ve güçlü altyapımız ile
                müşterilerimizin gayrimenkul yatırımlarında en doğru kararları almalarına yardımcı oluyoruz.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Misyonumuz
                  </dt>
                  <dd className="inline">: Müşterilerimize en kaliteli gayrimenkul hizmetini sunarak, onların hayallerini gerçeğe dönüştürmek.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Vizyonumuz
                  </dt>
                  <dd className="inline">: Gayrimenkul sektöründe güvenilirliği ve kaliteyi temsil eden, yenilikçi çözümler sunan lider bir marka olmak.</dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Değerlerimiz
                  </dt>
                  <dd className="inline">: Güvenilirlik, şeffaflık, müşteri memnuniyeti ve sürdürülebilir başarı.</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
              <img
                src="/uc.jpeg"
                alt="Vera Gayrimenkul Ofis"
                className="object-cover"
              />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src="/dort.jpeg"
                  alt="Vera Gayrimenkul Ekibi"
                  className="object-cover"
                />
              </div>
              <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src="/iki.jpeg"
                  alt="Vera Gayrimenkul Hizmetleri"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 