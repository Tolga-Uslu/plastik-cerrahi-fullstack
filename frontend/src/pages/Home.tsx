import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { services } from '../data/services'

export default function Home() {

  const getShortDescription = (description: string) => {
    return description.length > 150
      ? description.substring(0, 150) + '...'
      : description
  }

  // Sadece ilk 3 hizmeti göster
  const featuredServices = services.slice(0, 3);

  return (
    <div className="bg-background text-gray-300">
      <Hero />

      {/* Hakkımızda Özeti */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-accent-500 font-semibold tracking-widest uppercase text-sm">Biz Kimiz?</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-6 text-white">Mükemmelliğe Adanmışlık</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              20 yılı aşkın tecrübemiz ve son teknoloji donanımımız ile, doğal güzelliğinizi ortaya çıkarmak için çalışıyoruz.
              Her hasta bizim için özeldir ve benzersiz bir yaklaşımı hak eder.
            </p>
          </div>
        </div>
      </section>

      {/* Hizmetler Önizleme */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16 px-2">
            <div>
              <span className="text-accent-500 font-semibold tracking-widest uppercase text-sm">Hizmetlerimiz</span>
              <h2 className="text-4xl font-serif font-bold mt-2 text-white">Tedavi Seçenekleri</h2>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-2 text-white font-semibold hover:text-accent-500 transition"
            >
              Tümünü Görüntüle →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredServices.map(service => (
              <div key={service.id} className="group bg-background/50 border border-white/5 rounded-2xl p-4 shadow-lg hover:shadow-accent-900/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-xl h-64 mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="px-2 pb-4">
                  <h3 className="text-2xl font-serif font-bold mb-3 text-white group-hover:text-accent-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {getShortDescription(service.description)}
                  </p>

                  <Link
                    to={`/services/${service.id}`}
                    className="inline-block w-full py-3 px-6 text-center rounded-lg border border-white/10 text-white font-semibold hover:bg-accent-600 hover:border-transparent transition-all"
                  >
                    Detaylı İncele
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/services"
              className="inline-block bg-accent-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-700 transition"
            >
              Tüm Hizmetleri Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Değişime Hazır mısınız?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Hayalinizdeki görünüme kavuşmak için ilk adımı atın. Uzman ekibimiz sorularınızı yanıtlamak için sizi bekliyor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/appointment"
              className="bg-accent-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-accent-700 transition shadow-lg hover:shadow-accent-600/30"
            >
              Randevu Oluştur
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}