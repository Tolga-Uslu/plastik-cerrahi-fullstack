import { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'

interface Service {
  id: number
  title: string
  price: string | null
}

export default function Appointment() {
  const [services, setServices] = useState<Service[]>([])
  // const [loading, setLoading] = useState(false) // Currently unused
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  })

  useEffect(() => {
    // Servisleri getir
    axios.get('http://localhost:5000/api/services')
      .then(response => setServices(response.data))
      .catch(error => console.error('Hata:', error))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setStatus('success')
      // Reset form
      setFormData({ name: '', phone: '', email: '', service: '', date: '', message: '' })
    }, 1500)

    // Gerçek implementasyon şöyle olabilir:
    /*
    try {
        await axios.post('http://localhost:5000/api/appointments', formData);
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', date: '', message: '' });
    } catch (err) {
        setStatus('error');
        console.error(err);
    }
    */
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="py-24 bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <div className="bg-surface rounded-3xl shadow-2xl overflow-hidden border border-white/5 flex flex-col md:flex-row">

          {/* Sol Taraf - Bilgi */}
          <div className="md:w-5/12 bg-primary-900 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-accent-500 font-bold tracking-widest text-sm uppercase mb-4 block">Randevu</span>
                <h2 className="text-4xl font-serif font-bold mb-6">Hayatınızı Değiştirmeye Başlayın</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Uzman kadromuzla görüşmek ve size özel tedavi planınızı oluşturmak için formu doldurun.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-8 h-8 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center">✓</span>
                  Ücretsiz Ön Görüşme
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-8 h-8 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center">✓</span>
                  Kişiye Özel Analiz
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="w-8 h-8 rounded-full bg-accent-500/20 text-accent-500 flex items-center justify-center">✓</span>
                  Detaylı Bilgilendirme
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Form */}
          <div className="md:w-7/12 p-8 md:p-12 bg-background">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Talebiniz Alındı!</h3>
                <p className="text-gray-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-accent-500 font-bold hover:text-accent-400 underline"
                >
                  Yeni bir form doldur
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-white mb-8">Bilgilerinizi Girin</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Ad Soyad</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">E-posta</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white"
                        placeholder="E-posta adresiniz"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">İlgilendiğiniz İşlem</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white appearance-none"
                    >
                      <option value="" className="bg-background text-gray-500">Seçiniz...</option>
                      {services.length > 0 ? (
                        services.map(s => (
                          <option key={s.id} value={s.title} className="bg-surface text-white">{s.title}</option>
                        ))
                      ) : (
                        <>
                          <option value="burun" className="bg-surface text-white">Burun Estetiği</option>
                          <option value="meme" className="bg-surface text-white">Meme Estetiği</option>
                          <option value="yuz" className="bg-surface text-white">Yüz Germe</option>
                          <option value="vucut" className="bg-surface text-white">Vücut Şekillendirme</option>
                          <option value="sac" className="bg-surface text-white">Saç Ekimi</option>
                          <option value="diger" className="bg-surface text-white">Diğer</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Mesajınız (Opsiyonel)</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white"
                      placeholder="Eklemek istedikleriniz..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-accent-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-accent-700 transition shadow-lg hover:shadow-accent-600/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Gönderiliyor...' : 'Randevu Oluştur'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}