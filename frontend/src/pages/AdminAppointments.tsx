import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  preferredDate: string
  message: string | null
  status: string
  createdAt: string
}

export default function AdminAppointments() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (!adminData) {
      navigate('/admin/login')
      return
    }
    fetchAppointments()
  }, [navigate])

  const fetchAppointments = () => {
    setLoading(true)
    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        setAppointments(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Hata:', error)
        setLoading(false)
      })
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status })
      alert('Randevu durumu güncellendi!')
      fetchAppointments()
    } catch (error) {
      alert('Güncelleme başarısız!')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`)
      alert('Randevu silindi!')
      fetchAppointments()
    } catch (error) {
      alert('Silme başarısız!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin')
    window.location.href = '/'
  }

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(a => a.status === filter)

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Bekliyor'
      case 'approved': return 'Onaylandı'
      case 'rejected': return 'Reddedildi'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Paneli</h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/admin/appointments" className="text-blue-600 font-semibold">
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
        <h2 className="text-3xl font-bold mb-6">Randevu Yönetimi</h2>

        <div className="mb-6 flex gap-4">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Tümü ({appointments.length})
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Bekleyenler ({appointments.filter(a => a.status === 'pending').length})
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Onaylananlar ({appointments.filter(a => a.status === 'approved').length})
          </button>
          <button 
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Reddedilenler ({appointments.filter(a => a.status === 'rejected').length})
          </button>
        </div>

        {loading ? (
          <p className="text-center text-2xl">Yükleniyor...</p>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-xl">Randevu yok</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad Soyad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İletişim</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hizmet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{appointment.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{appointment.email}</div>
                      <div className="text-sm text-gray-500">{appointment.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{appointment.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(appointment.preferredDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(appointment.id, 'approved')}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              Onayla
                            </button>
                            <button 
                              onClick={() => handleStatusChange(appointment.id, 'rejected')}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Reddet
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleDelete(appointment.id)}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}