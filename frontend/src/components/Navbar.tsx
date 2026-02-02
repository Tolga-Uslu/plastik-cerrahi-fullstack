import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navLinks = [
    { path: '/', label: 'Anasayfa' },
    { path: '/services', label: 'Hizmetler' },
    { path: '/gallery', label: 'Galeri' },
    { path: '/about', label: 'Hakkımızda' },
    { path: '/contact', label: 'İletişim' },
  ]

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex flex-col z-10 group">
            <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight group-hover:text-accent-500 transition">
              Op. Dr. Berker Büyükgüral
            </span>
            <span className="text-xs tracking-[0.2em] text-accent-500 font-medium uppercase">
              Estetik ve Plastik Cerrahi
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-accent-500 relative py-2 ${isActive(link.path)
                  ? 'text-accent-500'
                  : 'text-gray-300'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-accent-500 transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/appointment"
              className="bg-accent-600 text-white px-7 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-accent-700 hover:shadow-lg hover:shadow-accent-600/20 transition-all transform hover:-translate-y-0.5 border border-transparent"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}