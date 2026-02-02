import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold tracking-widest uppercase text-sm">İletişim</span>
          <h1 className="text-5xl font-serif font-bold text-white mt-2 mb-6">Bize Ulaşın</h1>
          <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
            Sorularınız veya randevu talepleriniz için bize her zaman ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <div className="bg-surface p-8 rounded-3xl shadow-lg border border-white/5">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Mesaj Gönderin</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Konu</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                  placeholder="Mesajınızın konusu"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-accent-700 transition shadow-lg hover:shadow-accent-600/30 transform hover:-translate-y-1"
              >
                Gönder
              </button>
            </form>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="bg-primary-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

              <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">İletişim Bilgileri</h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent-400 text-xl">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Adres</h4>
                    <p className="text-gray-300">Op. Dr. Berker Büyükgüral Kliniği<br />Valikonağı Cad. No:123<br />Nişantaşı, Şişli / İstanbul</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent-400 text-xl">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Telefon</h4>
                    <p className="text-gray-300">+90 (212) 123 45 67<br />+90 (532) 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent-400 text-xl">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">E-posta</h4>
                    <p className="text-gray-300">info@drplastik.com<br />randevu@drplastik.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent-400 text-xl">
                    ⏰
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Çalışma Saatleri</h4>
                    <p className="text-gray-300">Pazartesi - Cumartesi: 09:00 - 19:00<br />Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Harita */}
            <div className="bg-surface rounded-3xl overflow-hidden shadow-lg h-64 border border-white/5 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12041.119616212567!2d28.98939795!3d41.0479745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sNi%C5%9Fanta%C5%9F%C4%B1%2C%20Harbiye%2C%2034367%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1709733456789!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}