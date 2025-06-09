import Image from "next/image";
import Link from "next/link";
import ListingApplicationForm from "@/components/ListingApplicationForm";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20" style={{width: "100%", height: "100vh"}}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/1.jpg')",
            filter: "brightness(0.3)"
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        <div className="mx-auto max-w-7xl h-full flex items-center justify-start lg:px-8">
          <div className="px-6 lg:px-0 flex items-center justify-start w-full h-full">
            <div className="ml-0 mr-auto max-w-4xl text-left pl-8 lg:pl-16">
              <div className="max-w-4xl">
                <div className="mb-4">
                  <p className="text-lg font-medium text-vera-yellow-400 uppercase tracking-wide">
                    Yatırımlarınızdaki Çözüm Ortağınız
                  </p>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  VERA GAYRIMENKUL
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-200">
                  Gayrimenkul sektöründe uzman kadromuz ve güvenilir hizmet anlayışımızla, yatırım hedeflerinize ulaşmanız için en doğru çözümleri sunuyoruz. Profesyonel danışmanlık hizmetimizle yanınızdayız.
                </p>
                <div className="mt-10 flex items-center justify-start gap-x-6">
                  <Link
                    href="/ilanlar"
                    className="rounded-md bg-vera-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-vera-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vera-600"
                  >
                    İlanları Görüntüle
                  </Link>
                  <Link href="/iletisim" className="text-sm font-semibold leading-6 text-white hover:text-gray-200">
                    Bize Ulaşın <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İstatistikler Section */}
      <div className="bg-vera-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Rakamlarla Vera Gayrimenkul: Güveninizin Teminatı
              </h2>
              <p className="mt-4 text-lg leading-8 text-indigo-200">
                Yılların deneyimi ve müşteri memnuniyeti odaklı yaklaşımımızla sektörde öncü konumdayız
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-indigo-300">Memnun Yatırımcı</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">500+</dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-indigo-300">Portföy ve İlan</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">1000+</dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-indigo-300">Yıllık Deneyim</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">5+</dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-indigo-300">Referans</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">50+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 3'lü Blok Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Vera Grup Şirketleri</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gayrimenkul sektöründe entegre çözümler sunan grup şirketlerimizle, yatırımlarınızda başarıya ulaşmanız için kapsamlı hizmetler sunuyoruz.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Vera Gayrimenkul */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Vera Gayrimenkul</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Gayrimenkul değerleme, danışmanlık ve analiz hizmetleri ile yatırım kararlarınızda güvenilir çözüm ortağınız. Uzman kadromuzla en doğru yatırım fırsatlarını sunuyoruz.
              </p>
            </div>
            <Link
              href="/kurumsal/vera-gayrimenkul"
              className="mt-8 text-sm font-semibold leading-6 text-vera-600 hover:text-vera-500"
            >
              Detaylı Bilgi <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Vera Medya */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Vera Medya</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Dijital pazarlama, sosyal medya yönetimi ve SEO hizmetleri ile gayrimenkul projelerinizi hedef kitlenize en etkili şekilde ulaştırıyoruz.
              </p>
            </div>
            <Link
              href="/kurumsal/vera-medya"
              className="mt-8 text-sm font-semibold leading-6 text-vera-600 hover:text-vera-500"
            >
              Detaylı Bilgi <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Vera Grup */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Vera Grup</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Gayrimenkul sektöründe entegre çözümler sunan holding yapımızla, yatırımdan pazarlamaya kadar tüm süreçlerde yanınızdayız.
              </p>
            </div>
            <Link
              href="/kurumsal/vera-grup"
              className="mt-8 text-sm font-semibold leading-6 text-vera-600 hover:text-vera-500"
            >
              Detaylı Bilgi <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hizmetlerimiz Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hizmetlerimiz</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Gayrimenkul yatırımlarınızda ihtiyaç duyacağınız tüm profesyonel hizmetleri tek çatı altında sunuyoruz
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Değerleme */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 xl:p-10">
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-vera-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-vera-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Değerleme</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Lisanslı eksperlerimizle gayrimenkulünüzün gerçek piyasa değerini belirliyor, yatırım kararlarınızda size rehberlik ediyoruz.
                </p>
              </div>
              <Link
                href="/hizmetler/degerleme"
                className="mt-8 text-sm font-semibold leading-6 text-vera-600 hover:text-vera-500"
              >
                Detaylı Bilgi <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Danışmanlık */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 xl:p-10">
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-vera-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-vera-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Danışmanlık</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Gayrimenkul yatırımlarında doğru kararlar alabilmeniz için uzman kadromuzla kapsamlı danışmanlık hizmeti sunuyoruz.
                </p>
              </div>
              <Link
                href="/hizmetler/danismanlik"
                className="mt-8 text-sm font-semibold leading-6 text-vera-600 hover:text-vera-500"
              >
                Detaylı Bilgi <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Analiz */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 xl:p-10">
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-vera-100 rounded-lg mb-4">
                  <svg className="w-6 h-6 text-vera-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Analiz</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Piyasa analizi, yatırım analizi ve risk değerlendirmesi ile gayrimenkul yatırımlarınızda en doğru stratejileri belirliyoruz.
                </p>
              </div>
              <Link
                href="/hizmetler/analiz"
                className="mt-8 text-sm font-semibold leading-6 text-vera-600 hover:text-vera-500"
              >
                Detaylı Bilgi <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* İlan Verme Formu ve Yönlendirme */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* İlan Verme Formu */}
            <ListingApplicationForm />

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
