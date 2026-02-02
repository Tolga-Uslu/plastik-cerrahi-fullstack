import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <span className="text-2xl font-serif font-bold tracking-tight block text-white">Op. Dr. Berker Büyükgüral</span>
              <span className="text-xs tracking-[0.2em] text-accent-500 font-medium uppercase block mt-1 group-hover:text-accent-400 transition">Estetik ve Plastik Cerrahi</span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-light">
              Doğal güzelliğinizi sanatla buluşturuyoruz. Modern tıbbın imkanlarını estetik vizyonumuzla harmanlayarak size özel çözümler sunuyoruz.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {[1, 2, 3].map((i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-transparent">
                  <span className="text-sm">So</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-8 relative inline-block">
              Hızlı Erişim
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent-600"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-accent-500 transition">Hizmetlerimiz</Link></li>
              <li><Link to="/about" className="hover:text-accent-500 transition">Hakkımızda</Link></li>
              <li><Link to="/gallery" className="hover:text-accent-500 transition">Başarı Hikayeleri</Link></li>
              <li><Link to="/contact" className="hover:text-accent-500 transition">İletişim</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-8 relative inline-block">
              İletişim
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent-600"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>Valikonağı Cad. No:123<br />Nişantaşı, İstanbul</li>
              <li>+90 (212) 123 45 67</li>
              <li>info@drplastik.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-8 relative inline-block">
              Bülten
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent-600"></span>
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full px-4 py-2 bg-surface border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-accent-500"
              />
              <button className="w-full bg-accent-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-accent-700 transition">
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs">
          <p>&copy; 2024 Dr. Plastik Estetik Cerrahi. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}