import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Vera Gayrimenkul ile Hayalinizdeki Eve Kavuşun
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Güvenilir gayrimenkul danışmanlığı ve profesyonel hizmet anlayışıyla, hayalinizdeki eve kavuşmanız için yanınızdayız.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/ilanlar"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    İlanları Görüntüle
                  </Link>
                  <Link href="/iletisim" className="text-sm font-semibold leading-6 text-gray-900">
                    Bize Ulaşın <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            İlanlar
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">Hizmetler</div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14">
                        {/* Burada örnek bir ilan kartı gösterilebilir */}
                        <div className="rounded-lg bg-white p-6 shadow-lg">
                          <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              src="/placeholder-property.jpg"
                              alt="Örnek Gayrimenkul"
                              width={800}
                              height={450}
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Örnek Gayrimenkul</h3>
                          <p className="mt-2 text-sm text-gray-600">
                            Modern tasarım, geniş yaşam alanı ve şehir merkezine yakın konumuyla ideal bir yaşam alanı.
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-bold text-indigo-600">₺2.500.000</span>
                            <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                              Detaylar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3'lü Blok Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Vera Grup</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Güvenilir gayrimenkul danışmanlığı ve profesyonel hizmet anlayışıyla, müşterilerimize en iyi hizmeti sunuyoruz.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Vera Gayrimenkul */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Vera Gayrimenkul</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Profesyonel gayrimenkul danışmanlığı hizmetleri ile müşterilerimize en doğru yatırım fırsatlarını sunuyoruz.
              </p>
            </div>
            <Link
              href="/kurumsal"
              className="mt-8 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Detaylı Bilgi <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Vera Medya */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Vera Medya</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Dijital pazarlama ve medya hizmetleri ile gayrimenkul projelerinizi en iyi şekilde tanıtıyoruz.
              </p>
            </div>
            <Link
              href="/kurumsal"
              className="mt-8 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Detaylı Bilgi <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Vera Grup */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Vera Grup</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Gayrimenkul sektöründe kapsamlı çözümler sunan grup şirketimiz ile yanınızdayız.
              </p>
            </div>
            <Link
              href="/kurumsal"
              className="mt-8 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Detaylı Bilgi <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* İlan Verme Formu ve Yönlendirme */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* İlan Verme Formu */}
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">İlan Ver</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Gayrimenkulünüzü satmak veya kiralamak mı istiyorsunuz? Hemen ilan verin.
              </p>
              <form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                    Mesajınız
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Gönder
                </button>
              </form>
            </div>

            {/* Mevcut İlanlara Yönlendirme */}
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mevcut İlanlar</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Satılık ve kiralık gayrimenkul ilanlarımızı inceleyin.
              </p>
              <div className="mt-8 space-y-4">
                <Link
                  href="/ilanlar?type=satilik"
                  className="block rounded-lg bg-gray-50 p-6 text-center hover:bg-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Satılık İlanlar</h3>
                  <p className="mt-2 text-sm text-gray-600">Satılık gayrimenkul fırsatlarını keşfedin</p>
                </Link>
                <Link
                  href="/ilanlar?type=kiralik"
                  className="block rounded-lg bg-gray-50 p-6 text-center hover:bg-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Kiralık İlanlar</h3>
                  <p className="mt-2 text-sm text-gray-600">Kiralık gayrimenkul seçeneklerini inceleyin</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
