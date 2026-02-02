import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

interface Service {
  id: number
  title: string
  description: string
  price: string | null
  image: string | null
  createdAt: string
}

export default function AdminServices() {
  const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  })

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (!adminData) {
      navigate('/admin/login')
      return
    }
    fetchServices()
  }, [navigate])

  const fetchServices = () => {
    setLoading(true)
    axios.get('http://localhost:5000/api/services')
      .then(response => {
        setServices(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Hata:', error)
        setLoading(false)
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingService) {
        await axios.put(`http://localhost:5000/api/services/${editingService.id}`, formData)
        alert('Hizmet güncellendi!')
      } else {
        await axios.post('http://localhost:5000/api/services', formData)
        alert('Hizmet eklendi!')
      }
      
      setShowModal(false)
      setEditingService(null)
      setFormData({ title: '', description: '', price: '', image: '' })
      fetchServices()
    } catch (error) {
      alert('İşlem başarısız!')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price || '',
      image: service.image || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return

    try {
      const response = await axios.delete(`http://localhost:5000/api/services/${id}`)
      
      if (response.data && response.data.success) {
        alert('Hizmet silindi!')
        fetchServices()
      } else {
        alert('Hizmet silindi!')
        fetchServices()
      }
    } catch (error: any) {
      console.error('Silme hatası:', error)
      
      if (error.response?.status === 500) {
        alert('Bu hizmetle ilişkili randevular var! Önce randevuları silin.')
      } else if (error.response?.data?.error) {
        alert(`Hata: ${error.response.data.error}`)
      } else {
        alert('Hizmet silinemedi!')
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin')
    window.location.href = '/'
  }

  const openAddModal = () => {
    setEditingService(null)
    setFormData({ title: '', description: '', price: '', image: '' })
    setShowModal(true)
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
            <Link to="/admin/appointments" className="text-gray-700 hover:text-blue-600">
              Randevular
            </Link>
            <Link to="/admin/services" className="text-blue-600 font-semibold">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Hizmet Yönetimi</h2>
          <button 
            onClick={openAddModal}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Yeni Hizmet Ekle
          </button>
        </div>

        {loading ? (
          <p className="text-center text-2xl">Yükleniyor...</p>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-xl">Henüz hizmet yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {service.image && (
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                  {service.price && (
                    <p className="text-blue-600 font-bold text-lg mb-4">{service.price}</p>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(service)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Düzenle
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full p-8 my-8">
            <h3 className="text-2xl font-bold mb-6">
              {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hizmet Adı *
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Örn: Burun Estetiği"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Açıklama * (Tüm detayları buraya yazabilirsiniz)
                </label>
                <textarea 
                  required
                  rows={15}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Hizmet açıklaması ve detayları..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Fiyat
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Örn: Randevu ile"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Resim URL (Opsiyonel)
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {editingService ? 'Güncelle' : 'Ekle'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingService(null)
                  }}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}