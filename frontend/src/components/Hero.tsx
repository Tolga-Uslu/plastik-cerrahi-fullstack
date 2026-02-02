import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center bg-gray-50 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-20">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold tracking-wider mb-6">
            ESTETİK VE PLASTİK CERRAHİ UZMANI
          </span>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-primary-900 leading-tight">
            Doğal Güzelliğinizi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              Sanatla Buluşturuyoruz
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Modern tıbbın ve estetiğin mükemmel uyumuyla, kendinizin en iyi versiyonunu keşfedin. Kişiye özel tedavi planlarıyla güvenilir ellerdesiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/appointment"
              className="px-8 py-4 bg-primary-900 text-white rounded-full font-semibold text-lg hover:bg-primary-800 hover:shadow-xl transition-all transform hover:-translate-y-1 text-center"
            >
              Ücretsiz Konsültasyon
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-white text-primary-900 border border-gray-200 rounded-full font-semibold text-lg hover:border-primary-200 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center"
            >
              Hizmetlerimizi Keşfedin
            </Link>
          </div>

          <div className="mt-16 flex gap-12 text-sm text-gray-500 font-medium tracking-wide">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-500"></span>
              FDA Onaylı Teknolojiler
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-500"></span>
              Uzman Kadro
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-500"></span>
              %100 Müşteri Memnuniyeti
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}