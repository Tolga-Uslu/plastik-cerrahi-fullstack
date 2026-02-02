import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Services() {

  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-accent-500 font-semibold tracking-widest uppercase text-sm">Uzmanlık Alanlarımız</span>
          <h1 className="text-5xl font-serif font-bold text-white mt-2 mb-6">Hizmetlerimiz</h1>
          <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mb-8"></div>
        </div>

        <div className="space-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-surface border border-white/5 rounded-3xl overflow-hidden hover:border-accent-500/30 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center p-6 lg:p-8">
                {/* Image Section - Always Left */}
                <div className="w-full lg:w-5/12 relative shrink-0">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-xl w-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>

                {/* Content Section - Always Right */}
                <div className="w-full lg:w-7/12 space-y-6">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                      {service.title}
                    </h2>
                    <div className="w-20 h-1 bg-accent-600 rounded-full"></div>
                  </div>

                  <p className="text-lg text-gray-400 leading-relaxed line-clamp-4 lg:line-clamp-5">
                    {service.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <Link
                      to={`/services/${service.id}`}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-accent-500 hover:border-transparent transition-all font-semibold text-sm tracking-wide"
                    >
                      Detaylı Bilgi
                    </Link>
                    <Link
                      to="/appointment"
                      className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-all font-semibold shadow-lg hover:shadow-accent-600/30 text-sm tracking-wide"
                    >
                      Randevu Al
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}