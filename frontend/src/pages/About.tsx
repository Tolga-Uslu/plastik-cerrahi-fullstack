import drBerkerImage from '../assets/dr-berker.jpg'

export default function About() {
  return (
    <div className="py-24 bg-background min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-accent-500 font-semibold tracking-widest uppercase text-sm">Kurucumuz</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mt-2">Op. Dr. Berker Büyükgüral</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            On Yılı Aşan Tecrübe ve Küresel Estetik Vizyonu
          </p>
          <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Main Biography Card */}
        <div className="bg-surface rounded-3xl shadow-xl overflow-hidden border border-white/5 mb-16">
          <div className="md:flex items-stretch">
            {/* Left Image/Decorative Side */}
            <div className="hidden md:block md:w-5/12 bg-primary-900 relative min-h-[500px]">
              <img
                src={drBerkerImage}
                alt="Op. Dr. Berker Büyükgüral"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-6">
                <div className="w-16 h-1 bg-accent-500 mb-4"></div>
                <h3 className="text-3xl font-serif font-bold text-white leading-tight mb-2">
                  "Doğal Güzellik ve<br />Bilimsel Mükemmeliyet"
                </h3>
              </div>
            </div>

            {/* Right Content Side */}
            <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center">
              <h2 className="text-2xl font-serif font-bold mb-6 text-white text-left">
                Bilim ve Sanatın Güvenli Buluşma Noktası
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  2013 yılından bugüne, Nişantaşı’nın kalbinde hizmet veren Op. Dr. Berker Büyükgüral, Türkiye’nin ve Dünya’nın sayılı Plastik Cerrahi eğitmenlerinden aldığı mesleki eğitimin yanı sıra Amerika’nın en saygın tıp merkezlerinde (UPMC Plastic Surgery Clinic ve Magee-Womens Hospital) edindiği akademik birikimi Türkiye’ye taşımıştır.
                </p>
                <p>
                  Kurduğu estetik kliniğinde, "doğal güzellik ve bilimsel mükemmeliyet" ilkesinden ödün vermeden binlerce hastanın değişim yolculuğuna eşlik etmiştir.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid: Team, Global, Technology */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Team Box */}
          <div className="bg-surface p-8 rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-800 rounded-xl flex items-center justify-center text-accent-400 mb-6 text-2xl">👥</div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Uzman ve Dinamik Ekibimiz</h3>
            <p className="text-gray-400 leading-relaxed">
              Dr. Büyükgüral’ın liderliğinde, hem cerrahi hem de medikal estetik alanında uzman, yetenekli bir ekip. Kliniğimize adım attığınız andan, iyileşme sürecinin sonuna kadar yüksek standartlarda bakım sunuyoruz.
            </p>
          </div>

          {/* Global Reach Box */}
          <div className="bg-surface p-8 rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-800 rounded-xl flex items-center justify-center text-accent-400 mb-6 text-2xl">🌍</div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Uluslararası Referans Merkezi</h3>
            <p className="text-gray-400 leading-relaxed">
              Nişantaşı’ndaki kliniğimiz; İngiltere, Amerika, Avrupa ve Arap Yarımadası başta olmak üzere dünyanın dört bir yanından gelen hastalara hizmet veren, global ölçekte tanınan bir estetik durağıdır.
            </p>
          </div>

          {/* Technology Box */}
          <div className="bg-surface p-8 rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-primary-800 rounded-xl flex items-center justify-center text-accent-400 mb-6 text-2xl">⚡</div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">Teknoloji ve Bütünsel Yaklaşım</h3>
            <p className="text-gray-400 leading-relaxed">
              ScarletX, Clear&Brilliant, Smartlipo, Aplasma ve Embody gibi FDA onaylı ileri teknoloji cihaz parkurumuzla cerrahi sonuçları destekliyor, bütünsel bir yenilenme sunuyoruz.
            </p>
          </div>
        </div>

        {/* Detailed Sections (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Treatments List */}
          <div className="bg-gradient-to-br from-surface to-background p-10 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4">Neler Sunuyoruz?</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2 bg-accent-500 rounded-full flex-shrink-0"></span>
                <div>
                  <strong className="text-white block mb-1">İleri Teknoloji Cihaz Parkuru</strong>
                  <p className="text-gray-400 text-sm">Embody, ScarletX, Clear&Brilliant, Smartlipo ve Aplasma ile iyileşme sürecini kısaltan, keskin hatlar sağlayan çözümler.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2 bg-accent-500 rounded-full flex-shrink-0"></span>
                <div>
                  <strong className="text-white block mb-1">Medikal Estetik Uygulamaları</strong>
                  <p className="text-gray-400 text-sm">Profesyonel botoks, dolgu ve yüz gençleştirici mezoterapi tedavileri.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2 bg-accent-500 rounded-full flex-shrink-0"></span>
                <div>
                  <strong className="text-white block mb-1">Bütünsel Gençleşme</strong>
                  <p className="text-gray-400 text-sm">Teknolojik ve enjeksiyonel tedavileri birleştiren kişiye özel 360 derece protokoller.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Personal Side & Why Us */}
          <div className="space-y-8">
            {/* Why Us */}
            <div className="bg-primary-950 p-8 rounded-3xl border-l-4 border-accent-500">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Neden Biz?</h3>
              <ul className="space-y-3 text-gray-400">
                <li>✓ On yılı aşkın klinik ve cerrahi tecrübe.</li>
                <li>✓ Doğal olmayan seçeneklerden uzak, etik yönlendirme.</li>
                <li>✓ Dünya standartlarında FDA onaylı ürünler ve cihazlar.</li>
                <li>✓ Memorial ve Acıbadem Hastaneleri ile güvenli işbirliği.</li>
                <li>✓ Çok dilli ve hasta odaklı profesyonel ekip.</li>
              </ul>
            </div>

            {/* Personal Life */}
            <div className="bg-surface p-8 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">Cerrahın Ötesinde Bir Yaşam</h3>
              <p className="text-gray-400 italic">
                "Ameliyathanedeki titizliğini hobilerine de taşıyan Dr. Büyükgüral; sıkı bir Galatasaray taraftarı, tutkulu bir basketbol sever, karlı zirvelerin snowboard tutkunu ve tellerdeki ritmi hisseden bir gitaristtir. Her şeyden önemlisi, başarısının en büyük motivasyon kaynağı olan 3 çocuk babasıdır."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
