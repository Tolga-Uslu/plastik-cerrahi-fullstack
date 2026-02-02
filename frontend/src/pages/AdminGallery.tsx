import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

interface GalleryItem {
  id: number
  title: string
  category: string
  beforeImage: string
  afterImage: string
  description: string | null
  createdAt: string
}

export default function AdminGallery() {
  const navigate = useNavigate()
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Burun Estetiği',
    description: ''
  })
  const [beforeFile, setBeforeFile] = useState<File | null>(null)
  const [afterFile, setAfterFile] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState<string>('')
  const [afterPreview, setAfterPreview] = useState<string>('')

  const categories = [
    'Burun Estetiği',
    'Göğüs Estetiği',
    'Liposuction',
    'Yüz Estetiği',
    'Diğer'
  ]

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (!adminData) {
      navigate('/admin/login')
      return
    }
    fetchGallery()
  }, [navigate])

  const fetchGallery = () => {
    setLoading(true)
    axios.get('http://localhost:5000/api/gallery')
      .then(response => {
        setGallery(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Hata:', error)
        setLoading(false)
      })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'before') {
        setBeforeFile(file)
        setBeforePreview(URL.createObjectURL(file))
      } else {
        setAfterFile(file)
        setAfterPreview(URL.createObjectURL(file))
      }
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    const response = await axios.post('http://localhost:5000/api/upload', uploadFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!beforeFile || !afterFile) {
      alert('Lütfen önce ve sonra resimlerini seçin!')
      return
    }

    setUploading(true)

    try {
      const beforeImageUrl = await uploadImage(beforeFile)
      const afterImageUrl = await uploadImage(afterFile)

      await axios.post('http://localhost:5000/api/gallery', {
        ...formData,
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl
      })

      alert('Galeri öğesi eklendi!')
      setShowModal(false)
      setFormData({ title: '', category: 'Burun Estetiği', description: '' })
      setBeforeFile(null)
      setAfterFile(null)
      setBeforePreview('')
      setAfterPreview('')
      fetchGallery()
    } catch (error) {
      alert('Yükleme başarısız!')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu galeri öğesini silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`)
      alert('Galeri öğesi silindi!')
      fetchGallery()
    } catch (error) {
      alert('Silme başarısız!')
    }
  }

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
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/admin/appointments" className="text-gray-700 hover:text-blue-600">
              Randevular
            </Link>
            <Link to="/admin/services" className="text-gray-700 hover:text-blue-600">
              Hizmetler
            </Link>
            <Link to="/admin/gallery" className="text-blue-600 font-semibold">
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
          <h2 className="text-3xl font-bold">Galeri Yönetimi</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Yeni Galeri Öğesi Ekle
          </button>
        </div>

        {loading ? (
          <p className="text-center text-2xl">Yükleniyor...</p>
        ) : gallery.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-xl">Henüz galeri öğesi yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Önce</p>
                    <img src={item.beforeImage} alt="Önce" className="w-full h-40 object-cover rounded" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Sonra</p>
                    <img src={item.afterImage} alt="Sonra" className="w-full h-40 object-cover rounded" />
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  )}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 my-8">
            <h3 className="text-2xl font-bold mb-6">Yeni Galeri Öğesi Ekle</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Başlık *
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Örn: Burun Estetiği Sonuçları"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Kategori *
                </label>
                <select 
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Önce Resmi *
                </label>
                <input 
                  type="file" 
                  required
                  accept="image/*"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  onChange={(e) => handleFileChange(e, 'before')}
                />
                {beforePreview && (
                  <img src={beforePreview} alt="Önizleme" className="mt-2 w-full h-40 object-cover rounded" />
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Sonra Resmi *
                </label>
                <input 
                  type="file" 
                  required
                  accept="image/*"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  onChange={(e) => handleFileChange(e, 'after')}
                />
                {afterPreview && (
                  <img src={afterPreview} alt="Önizleme" className="mt-2 w-full h-40 object-cover rounded" />
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Açıklama (Opsiyonel)
                </label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="İşlem hakkında kısa açıklama..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
                >
                  {uploading ? 'Yükleniyor...' : 'Ekle'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setBeforeFile(null)
                    setAfterFile(null)
                    setBeforePreview('')
                    setAfterPreview('')
                  }}
                  disabled={uploading}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold disabled:bg-gray-400"
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