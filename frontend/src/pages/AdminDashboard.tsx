import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

interface Stats {
  totalAppointments: number
  pendingAppointments: number
  approvedAppointments: number
  totalServices: number
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    totalServices: 0
  })

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (!adminData) {
      navigate('/admin/login')
      return
    }

    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        const appointments = response.data
        setStats(prev => ({
          ...prev,
          totalAppointments: appointments.length,
          pendingAppointments: appointments.filter((a: any) => a.status === 'pending').length,
          approvedAppointments: appointments.filter((a: any) => a.status === 'approved').length
        }))
      })

    axios.get('http://localhost:5000/api/services')
      .then(response => {
        setStats(prev => ({
          ...prev,
          totalServices: response.data.length
        }))
      })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Paneli</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-blue-600 font-semibold">
              Dashboard
            </Link>
            <Link to="/admin/appointments" className="text-gray-700 hover:text-blue-600">
              Randevular
            </Link>
            <Link to="/admin/services" className="text-gray-700 hover:text-blue-600">
              Hizmetler
            </Link>
            <Link to="/admin/gallery" className="text-gray-700 hover:text-blue-600">
              Galeri
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Toplam Randevu</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.totalAppointments}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Bekleyen Randevular</h3>
            <p className="text-4xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Onaylanan Randevular</h3>
            <p className="text-4xl font-bold text-green-600">{stats.approvedAppointments}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Toplam Hizmet</h3>
            <p className="text-4xl font-bold text-purple-600">{stats.totalServices}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/admin/appointments" 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition text-center"
          >
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Randevuları Yönet</h3>
            <p className="text-gray-600">Randevuları görüntüle, onayla veya reddet</p>
          </Link>

          <Link 
            to="/admin/services" 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition text-center"
          >
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-2">Hizmetleri Yönet</h3>
            <p className="text-gray-600">Hizmetleri ekle, düzenle veya sil</p>
          </Link>

          <Link 
            to="/admin/gallery" 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition text-center"
          >
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2">Galeriyi Yönet</h3>
            <p className="text-gray-600">Önce/sonra fotoğrafları ekle veya sil</p>
          </Link>
        </div>
      </div>
    </div>
  )
}