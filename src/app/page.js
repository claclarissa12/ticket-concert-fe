import Footer from "@/components/layout/footer";
import HeroSection from "@/components/layout/hero";
import SearchHome from "@/components/layout/Search";
import UserNavbar from "@/components/layout/UserNavbar";
import { Search, MapPin, Calendar, Clock, Music, Guitar, Mic2, Disc3, Apple, Play } from "lucide-react";
import Image from "next/image";

export default function landing() {
  return (
    <main className="min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-pink-500 selection:text-white">
      <nav className="flex items-center justify-between px-20 py-6">
        <h1 className="text-xl font-bold">
          Ticket<span className="text-[#E21D8F]">.COM</span>
        </h1>
        <a href="/regis" className="cursor-pointer">
        <button  className="rounded-full bg-[#E21D8F] px-6 py-2 text-sm font-medium hover:bg-pink-600 duration-300 cursor-pointer">
          Mulai Sekarang
        </button>
        </a>
      </nav>

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
                  <button className="bg-[#f9a8d4] hover:bg-[#f472b6] text-[#0f0f11] font-semibold text-sm px-6 py-2.5 rounded-full transition">
                    Beli Tiket
                  </button>
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

      {/* --- TAMBAHAN SECTION BARU DISINI --- */}
      <section className="max-w-7xl mx-auto px-4 w-full flex flex-col gap-6 mb-20">
        <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl w-full py-8 px-6 md:px-10 shadow-lg">
          <h2 className="text-2xl font-bold text-white tracking-wide text-center mb-8">
            Kenapa Pilih Ticket.Com
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 text-[#FBADCC]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">100% Aman</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Transaksi terenkripsi dan tiket dijamin asli dari promoter resmi.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 text-[#FBADCC]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">Proses Cepat</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Pembelian tiket hanya dalam hitungan detik tanpa antre panjang.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 text-[#FBADCC]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">Banyak Metode</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Bayar mudah via Virtual Account, E-Wallet, hingga Kartu Kredit.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 text-[#FBADCC]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">Support 24/7</h3>
              <p className="text-gray-400 text-xs leading-relaxed">Tim customer service siap membantu kendala tiket Anda kapan saja.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#222225] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex flex-col gap-4 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Dapatkan Potongan Harga <br />
              Dengan Membuat Akun
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Bergabunglah dengan 340.000 penggemar musik langsung yang mendapatkan kode pra-penjualan tiket, dan bocoran awal daftar penjual acara.
            </p>
            <button className="bg-[#f472b6] hover:bg-[#ec4899] text-white font-semibold text-sm px-6 py-2.5 rounded-lg w-fit mt-2 transition">
              Gabung Sekarang
            </button>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
            <span className="text-pink-500 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1">
              Fast Mobile Access Available
            </span>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex items-center gap-2 bg-black hover:bg-gray-900 border border-white/10 rounded-lg px-4 py-2 transition flex-1 md:flex-none justify-center">
                <Apple size={20} className="text-white fill-white" />
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-gray-400 leading-none mb-1">Download on</span>
                  <span className="text-white text-xs font-bold leading-none">App Store</span>
                </div>
              </button>

              <button className="flex items-center gap-2 bg-black hover:bg-gray-900 border border-white/10 rounded-lg px-4 py-2 transition flex-1 md:flex-none justify-center">
                <Play size={20} className="text-white fill-white" />
                <div className="flex flex-col items-start">
                  <span className="text-[9px] text-gray-400 leading-none mb-1">Download on</span>
                  <span className="text-white text-xs font-bold leading-none">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}