import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { services } from '../data/services'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState<typeof services[0] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Statik veriden bul
    if (id) {
      const foundService = services.find(s => s.id === Number(id));
      if (foundService) {
        setService(foundService);
      } else {
        console.error('Servis bulunamadı');
        // navigate('/services'); // Opsiyonel: listeye yönlendir
      }
    }
    setLoading(false);
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-white">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-accent-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!service) return (
    <div className="flex justify-center items-center h-screen bg-background text-white flex-col gap-4">
      <h2 className="text-2xl font-serif">Hizmet bulunamadı</h2>
      <Link to="/services" className="text-accent-500 hover:text-accent-400">Hizmetlere Dön</Link>
    </div>
  );

  return (
    <div className="bg-background min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-white/5">
          {/* Header Image Area */}
          <div className="h-64 sm:h-80 bg-primary-900 relative">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-2">{service.title}</h1>
              {service.price && (
                <span className="inline-block bg-accent-500/20 text-accent-400 border border-accent-500/30 px-4 py-1 rounded-full text-lg font-semibold backdrop-blur-sm">
                  {service.price}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent-400 hover:prose-a:text-accent-300 prose-strong:text-white">
              <div className="whitespace-pre-line leading-relaxed description-text text-gray-300">
                {service.description}
              </div>
              {/* Ekstra Detaylar (Hardcoded fillers for layout if needed) */}
              <h3 className="text-white mt-8 mb-4">Bu İşlem Hakkında</h3>
              <p>
                {service.title}, modern tıbbın sunduğu en son tekniklerle gerçekleştirilmektedir. Uzman doktorumuz,
                size özel bir planlama yaparak en doğal ve estetik sonucu elde etmeyi hedefler.
                Operasyon süreci ve iyileşme dönemi hakkında detaylı bilgi için ücretsiz ön görüşme yapabilirsiniz.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
              <Link
                to="/appointment"
                className="inline-block bg-accent-600 text-white px-10 py-4 rounded-xl hover:bg-accent-700 transition text-lg font-bold shadow-lg hover:shadow-accent-600/20 transform hover:-translate-y-1"
              >
                Hemen Randevu Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}