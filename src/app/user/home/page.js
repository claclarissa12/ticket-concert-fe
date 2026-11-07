import Footer from "@/components/layout/footer";
import HeroSection from "@/components/layout/hero";
import SearchHome from "@/components/layout/Search";
import UserNavbar from "@/components/layout/UserNavbar";
import { MapPin, Calendar, Clock, Music, Guitar, Mic2, Disc3 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-pink-500 selection:text-white">
      <UserNavbar />

      <HeroSection />

      <SearchHome />

      <section className="max-w-7xl mx-auto px-4 mt-12 bg-[#0f0f11]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-pink-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white tracking-wide">Kategori</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Music size={24} className="text-[#0f0f11]" />, label: "Pop & R&B" },
            { icon: <Guitar size={24} className="text-[#0f0f11]" />, label: "Rock & Metal" },
            { icon: <Disc3 size={24} className="text-[#0f0f11]" />, label: "Jazz & Soul" },
            { icon: <Mic2 size={24} className="text-[#0f0f11]" />, label: "Indie & Acoustic" },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1d] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-[#222225] hover:border-white/10 cursor-pointer transition duration-300"
            >
              <div className="w-12 h-12 bg-[#888888] rounded-md flex items-center justify-center shrink-0">
                {cat.icon}
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-sm text-white mb-0.5">{cat.label}</span>
                <span className="text-xs text-gray-400">30 Events</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16 bg-[#0f0f11] pb-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">Spotlights</h2>
          <div className="w-16 h-1.5 bg-pink-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop"
              alt="Nassar Tour Festival"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/60 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col gap-3">
              <span className="text-white text-sm font-medium">Rock & Metal</span>
              <h3 className="text-3xl font-bold text-white mb-2">Nassar Tour Ferstival</h3>

              <div className="bg-[#1a1a1d]/90 backdrop-blur-md border border-white/5 rounded-xl p-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-xs">Gelora Bung Karno, Jakarta</span>
                  <span className="text-green-500 text-xs font-medium">93% Sold Out</span>
                </div>

                <div className="w-full h-1 bg-gray-700 rounded-full mb-4">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '93%' }}></div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] mb-0.5">Mulai</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-white font-bold text-lg">IDR 500.000</span>
                      <span className="text-gray-400 text-[10px]">/Tiket</span>
                    </div>
                  </div>
                  <a href="/user/ticket-selection" >

                  <button className="bg-[#f9a8d4] hover:bg-[#f472b6] text-[#0f0f11] font-semibold text-sm px-6 py-2.5 rounded-full transition">
                    Beli Tiket
                  </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {[1, 2].map((item) => (
              <div key={item} className="relative h-[188px] rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5c5f7?q=80&w=800&auto=format&fit=crop"
                  alt="Nassar Tour"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1d]/95 via-[#1a1a1d]/70 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-[#f9a8d4] text-[#0f0f11] text-xs font-bold px-4 py-1.5 rounded-full">
                  85% Booked
                </div>

                <div className="absolute bottom-0 left-0 p-5 w-full flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-bold text-white">Nassar Tour</h3>
                    <p className="text-gray-400 text-xs">Gelora Bung Karno, Jakarta</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-gray-400 text-[10px]">Mulai</span>
                      <span className="text-white font-bold text-sm">IDR 300.000</span>
                    </div>
                  </div>
                  <button className="bg-[#f9a8d4] hover:bg-[#f472b6] text-[#0f0f11] font-semibold text-xs px-5 py-2 rounded-full transition shrink-0 mb-1">
                    Beli Tiket
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-white">Terpopuler Saat Ini</h2>
          <div className="flex bg-[#1a1a1d] rounded-full p-1 border border-white/5">
            {["Semua", "Minggu Ini", "VIP Tiket"].map((tab, idx) => (
              <button key={idx} className={`px-6 py-2 text-sm font-semibold rounded-full transition ${idx === 0 ? "bg-gray-600 text-white" : "text-gray-400 hover:text-white"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#1a1a1d] border border-white/5 rounded-[20px] overflow-hidden group cursor-pointer">
              <div className="relative h-[280px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop"
                  alt="Nassar Tour"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center w-12 h-12">
                  <span className="text-white text-[10px] uppercase font-semibold leading-none mb-1">Oct</span>
                  <span className="text-white text-lg font-bold leading-none">23</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Rock & Metal</p>
                  <p className="text-green-500 text-sm">Tersedia</p>
                </div>
                <h3 className="text-2xl font-bold mb-1 text-white">Nassar Tour 2026</h3>
                <p className="text-gray-400 text-sm mb-6">Gelora Bung Karno, Jakarta</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs mb-1">Mulai dari</span>
                    <span className="font-bold text-white text-lg">IDR 500.000</span>
                  </div>
                  <button className="bg-[#f9a8d4] hover:bg-[#f472b6] text-[#0f0f11] text-sm font-semibold px-6 py-2.5 rounded-full transition">
                    Beli Tiket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wide">Konser Event</h2>
          <span className="bg-[#1a1a1d] text-gray-400 text-xs px-3 py-1 rounded-full border border-white/5">200 Hasil</span>
        </div>

        <div className="flex flex-col gap-4">
          {[
            "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/2078071/pexels-photo-2078071.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
          ].map((src, item) => (
            <div key={item} className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 hover:border-white/20 transition group">
              <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                <img src={src} alt="Konser" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-lg font-bold mb-1">King Nassar Anyelse</h3>
                <div className="flex flex-col gap-1 text-xs text-gray-400 mb-2">
                  <div className="flex items-center gap-2"><Calendar size={14} /> 13 April 2026</div>
                  <div className="flex items-center gap-2"><Clock size={14} /> 10:00 WIB</div>
                  <div className="flex items-center gap-2"><MapPin size={14} /> Aula Smandongi Lapang Ide</div>
                </div>
              </div>
              <div className="flex flex-col items-end w-full md:w-auto gap-3">
                <p className="font-bold text-[#FBADCC] text-lg">IDR 550.000</p>
                <button className="bg-[#FBADCC] hover:bg-pink-300 text-black text-sm font-medium px-6 py-2 rounded-full transition w-full md:w-auto">
                  Beli Tiket
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </main>
  );
}