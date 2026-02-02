import { useEffect, useState } from 'react'
import axios from 'axios'

interface GalleryItem {
  id: number
  title: string
  category: string
  beforeImage: string
  afterImage: string
  description: string | null
}

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<{ before: string, after: string, title: string } | null>(null)

  useEffect(() => {
    fetchGallery()
    fetchCategories()
  }, [])

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

  const fetchCategories = () => {
    axios.get('http://localhost:5000/api/gallery/categories')
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => console.error('Hata:', error))
  }

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory)

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent-600 font-semibold tracking-widest uppercase text-sm">Başarı Hikayeleri</span>
          <h1 className="text-5xl font-serif font-bold text-primary-900 mt-2 mb-6">Önce & Sonra</h1>
          <div className="w-24 h-1 bg-accent-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
            Hastalarımızın geçirdiği muhteşem değişimleri inceleyin. Her sonuç, benzersiz bir çalışmanın eseridir.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-8 py-3 rounded-full font-semibold transition-all shadow-sm ${selectedCategory === 'all'
                ? 'bg-primary-900 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-primary-900'
              }`}
          >
            Tümü
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-semibold transition-all shadow-sm ${selectedCategory === category
                  ? 'bg-primary-900 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-primary-900'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-900 rounded-full animate-spin"></div>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-xl font-medium">Bu kategoride henüz görsel yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={() => setSelectedImage({
                  before: item.beforeImage,
                  after: item.afterImage,
                  title: item.title
                })}
              >
                <div className="grid grid-cols-2 gap-1 p-2 bg-gray-100">
                  <div className="relative">
                    <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm tracking-wider">ÖNCE</span>
                    <img
                      src={item.beforeImage}
                      alt="Önce"
                      className="w-full h-48 object-cover rounded-l-xl"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute top-2 right-2 bg-accent-500 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm tracking-wider shadow-sm">SONRA</span>
                    <img
                      src={item.afterImage}
                      alt="Sonra"
                      className="w-full h-48 object-cover rounded-r-xl"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-accent-50 text-accent-700 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-primary-900/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-primary-900">
                {selectedImage.title}
              </h2>
              <button
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-red-500 transition"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-400 tracking-widest text-sm">OPERASYON ÖNCESİ</h3>
                  </div>
                  <img
                    src={selectedImage.before}
                    alt="Önce"
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-accent-600 tracking-widest text-sm">OPERASYON SONRASI</h3>
                  </div>
                  <img
                    src={selectedImage.after}
                    alt="Sonra"
                    className="w-full rounded-2xl shadow-lg ring-4 ring-accent-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}