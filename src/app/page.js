"use client"
import { Calendar, CreditCard, MapPin, MousePointerClick, QrCode, Ticket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { concertApi } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Landing() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formRef = useRef(null);
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isOrganizerFormOpen, setIsOrganizerFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const res = await concertApi.getConcert();
        const payload = res?.data?.data ?? res?.data ?? res;
        const list = Array.isArray(payload)
          ? payload
          : payload?.items ?? payload?.rows ?? [];
        setConcerts(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, []);

  const featured = concerts[0];
  const topRight = concerts[1];
  const bottomRight1 = concerts[2];
  const bottomRight2 = concerts[3];

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  useEffect(() => {
    if (!submitSuccess) return;

    if (countdown <= 0) {
      setIsOrganizerFormOpen(false);
      setSubmitSuccess(false);
      setCountdown(5);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [submitSuccess, countdown]);

  const handleOrganizerSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);


    try {
      const response = await fetch("https://formspree.io/f/xppdodal", {
        method: "POST",
        body: new FormData(formRef.current),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formRef.current.reset();
        setCountdown(5);
        setSubmitSuccess(true);
      }
      if (response.ok) {
        formRef.current.reset();
        setSubmitSuccess(true);
      } else {
        setSubmitError("Failed to submit registration. Please try again.");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f11] text-white font-sans">

      <nav className="sticky top-0 z-50 bg-[#0f0f11]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-5">

          <a href="/" className="text-xl font-bold tracking-tight">
            The<span className="text-[#E21D8F]"> Concert's</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/lephie/Konser-Mobile-"
              className="rounded-full bg-[#E21D8F] px-5 py-2.5 text-xs md:text-sm font-semibold text-white hover:bg-pink-600 transition duration-300 shadow-lg shadow-[#E21D8F]/20 flex items-center gap-2"
            >
              <span>Download Sekarang</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="mt-6 relative mb-1 h-[180px] md:h-[220px] rounded-2xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600"
            alt="Music festival audience"
            className="w-full h-full object-cover opacity-30 object-center  transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/25 transition duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#FBADCC]">
              The Concert's
            </span>
            <h3 className="text-2xl md:text-4xl  font-bold mt-3">
              Make Memories That Last.
            </h3>
            <p className="text-xs md:text-sm text-gray-200 mt-3">
              Every ticket takes you to a new experience.
            </p>
          </div>
        </div>


        <section className="mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px]">
              <div className="absolute top-0 left-0 w-[48%] h-[45%] bg-[#E21D8F] rounded-2xl p-6 flex flex-col justify-end shadow-lg shadow-[#E21D8F]/20 z-10 transition-transform duration-500 hover:scale-[1.02]">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  Pengalaman konser, <br /> dimulai dari sini.
                </h3>
              </div>

              <div className="absolute top-0 right-0 w-[48%] h-[45%] rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="https://img.antaranews.com/cache/1200x800/2019/11/22/f224b16d58d2c69ad66d202da6e94ecf.jpg.webp"
                  alt="Konser"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[50%] rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="https://nos.jkt-1.neo.id/cdc-s3/2017/03/EXO-July-2016_10.jpg"
                  alt="Konser Malam"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center pt-10 lg:pt-18">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-5">
                Mudah, Cepat, dan Aman
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-8">
                Beli tiket konser <br className="hidden md:block" /> tanpa ribet.
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#1a1a1d] border border-white/10 flex items-center justify-center group-hover:border-[#E21D8F]/50 group-hover:bg-[#E21D8F]/10 transition duration-300">
                    <MousePointerClick size={18} className="text-[#FBADCC]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-white mb-1">1. Pilih Konser</h4>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-md">Jelajahi deretan konser dan festival favoritmu, lalu temukan jadwal yang pas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#1a1a1d] border border-white/10 flex items-center justify-center group-hover:border-[#E21D8F]/50 group-hover:bg-[#E21D8F]/10 transition duration-300">
                    <Ticket size={18} className="text-[#FBADCC]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-white mb-1">2. Pilih Tiket</h4>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-md">Tentukan kategori (VIP, Festival, Reguler) sesuai budget dan kuota yang tersedia.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#1a1a1d] border border-white/10 flex items-center justify-center group-hover:border-[#E21D8F]/50 group-hover:bg-[#E21D8F]/10 transition duration-300">
                    <CreditCard size={18} className="text-[#FBADCC]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-white mb-1">3. Lakukan Pembayaran</h4>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-md">Selesaikan transaksi dengan aman via Virtual Account, E-Wallet, atau Kartu Kredit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#1a1a1d] border border-white/10 flex items-center justify-center group-hover:border-[#E21D8F]/50 group-hover:bg-[#E21D8F]/10 transition duration-300">
                    <QrCode size={18} className="text-[#FBADCC]" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-white mb-1">4. Dapatkan QR Tiket</h4>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-md">Tiket elektronik langsung masuk ke akunmu. Tunjukkan QR code di pintu masuk venue.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16 lg:h-[500px]">

          {featured && (
            <div className="relative group rounded-xl overflow-hidden h-[350px] lg:h-full">
              <img
                src={featured.banner_url}
                alt={featured.title}
                className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col justify-end h-full">
                <span className="text-[10px] font-bold tracking-wider text-white uppercase bg-[#FBADCC]/60 backdrop-blur-sm px-2 py-1 rounded w-fit mb-3">
                  {featured.location || "Event"}
                </span>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                  {featured.title}
                </h2>
                <div className="text-xs text-gray-300">
                  {featured.organizer?.name || "Admin"} — {formatDate(featured.date)}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-rows-2 gap-5 h-full">

            {topRight && (
              <div className="relative group rounded-xl overflow-hidden h-[100px] lg:h-[260px]">
                <img
                  src={topRight.banner_url || "https://via.placeholder.com/800x400"}
                  alt={topRight.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5 md:p-7 flex flex-col justify-end h-full">
                  <span className="text-[9px] font-bold tracking-wider text-white uppercase bg-[#FBADCC]/60 backdrop-blur-sm px-2 py-1 rounded w-fit mb-2">
                    {topRight.location}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                    {topRight.title}
                  </h3>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-5 ">
              {[bottomRight1, bottomRight2].map((item, idx) => (
                item && (
                  <div key={idx} className="relative group rounded-xl overflow-hidden h-[180px] lg:h-full">
                    <img
                      src={item.banner_url || "https://via.placeholder.com/400x300"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-4 flex flex-col justify-end h-full">
                      <span className="text-[8px] font-bold tracking-wider text-white uppercase bg-[#FBADCC]/60 backdrop-blur-sm px-1.5 py-0.5 rounded w-fit mb-2">
                        {item.location || "Event"}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                )
              ))}
            </div>

          </div>
        </div>
      </div>



      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-6 bg-[#E21D8F] rounded-full" />
          <h2 className="text-lg md:text-xl font-bold text-white">Daftar Konser</h2>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Memuat konser...</p>
        ) : concerts.length === 0 ? (
          <p className="text-gray-400 text-sm">Belum ada konser.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {concerts.map((c) => (
              <div
                key={c.id}
                className="bg-[#1a1a1d] border border-white/5 rounded-2xl overflow-hidden hover:border-[#E21D8F]/40 transition"
              >
                <img
                  src={c.banner_url || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={c.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {c.date
                      ? new Date(c.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      : "-"}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={12} /> {c.venue || c.location || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-28">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#E21D8F]">
            Need Help?
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-400 mt-4">
            Beberapa pertanyaan yang sering ditanyakan pengguna.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              q: "Bagaimana cara membeli tiket konser?",
              a: "Pilih konser yang ingin dikunjungi, tentukan kategori dan jumlah tiket, kemudian lanjutkan ke pembayaran."
            },
            {
              q: "Bagaimana cara mendapatkan tiket setelah pembayaran?",
              a: "Setelah pembayaran berhasil, tiket digital akan tersedia di akun pengguna dan dapat dilihat melalui halaman tiket."
            },
            {
              q: "Apakah tiket memiliki QR Code?",
              a: "Ya, tiket digital dilengkapi QR Code yang digunakan untuk proses verifikasi saat memasuki venue konser."
            },
            {
              q: "Apakah saya bisa membatalkan pesanan?",
              a: "Ketentuan pembatalan mengikuti kebijakan event organizer dan ketentuan transaksi yang berlaku."
            },
            {
              q: "Bagaimana cara menjadi Event Organizer?",
              a: "Klik tombol Register Sebagai Organizer pada halaman ini, kemudian lengkapi formulir pendaftaran."
            }
          ].map((item, index) => (
            <details
              key={index}
              className="group bg-[#1a1a1d] border border-white/10 rounded-xl p-5 open:border-[#E21D8F]/40 transition"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-sm md:text-base">
                {item.q}
                <span className="text-[#E21D8F] text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-sm text-gray-400 leading-relaxed mt-4">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>


      <footer className="border-t border-white/5 pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto text-sm text-gray-400">
        <div className="flex flex-col gap-16">

          <div className="bg-[#1a1a1d] border border-[#E21D8F]/30 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg shadow-[#E21D8F]/5">

            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Punya Event Musik Sendiri?
              </h2>

              <p className="text-xs md:text-sm text-gray-400 max-w-xl leading-relaxed">
                Bergabunglah menjadi Event Organizer di The Concerts's
                Kelola penjualan tiket konsermu dengan mudah, aman,
                dan jangkau lebih banyak penggemar musik.
              </p>
            </div>

           <div className="flex flex-col items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setIsOrganizerFormOpen(true);
                  setSubmitSuccess(false);
                  setSubmitError("");
                }}
                className="px-6 py-3 bg-[#E21D8F] hover:bg-pink-600 text-white font-semibold text-sm rounded-xl transition duration-300 text-center shadow-lg shadow-[#E21D8F]/20"
              >
                Register Sebagai Organizer
              </button>

              <a
                href="/login"
                className="px-6 py-3 border border-[#a20762]  text-xs md:text-sm font-semibold hover:bg-[#5d2445] rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap"
              >
                Masuk Sebagai Admin / EO
              </a>
          </div>

          </div>

          {isOrganizerFormOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

              {/* Background overlay */}
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsOrganizerFormOpen(false)}
              />

              {/* Modal */}
              <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#1a1a1d] border border-white/10 rounded-2xl shadow-2xl">

                {/* Header */}
                <div className="p-6 border-b border-white/10">

                  <div className="flex items-center justify-between mb-4">

                    <div className="w-12 h-12 rounded-xl bg-[#E21D8F]/10 border border-[#E21D8F]/20 flex items-center justify-center">
                      <Ticket className="text-[#E21D8F]" size={24} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOrganizerFormOpen(false)}
                      className="text-gray-400 hover:text-white transition text-2xl"
                    >
                      ×
                    </button>

                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    Daftar Event Organizer
                  </h2>

                  <p className="text-sm text-gray-400 mt-2">
                    Lengkapi informasi berikut untuk mendaftarkan
                    organisasi Anda sebagai Event Organizer.
                  </p>

                </div>

                {/* Form */}
                <form
                  ref={formRef}
                  onSubmit={handleOrganizerSubmit}
                  className="p-6 flex flex-col gap-5"
                >

                  {/* Organization name */}
                  <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-white">
                      Nama Organisasi / Event Organizer
                    </label>

                    <input
                      type="text"
                      name="organization_name"
                      placeholder="Contoh: Jakarta Music Production"
                      required
                      className="w-full bg-[#0f0f11] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#E21D8F] transition"
                    />

                  </div>

                  {/* Applicant name */}
                  <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-white">
                      Nama Penanggung Jawab
                    </label>

                    <input
                      type="text"
                      name="applicant_name"
                      placeholder="Nama lengkap Anda"
                      required
                      className="w-full bg-[#0f0f11] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#E21D8F] transition"
                    />

                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-white">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="organizer@email.com"
                      required
                      className="w-full bg-[#0f0f11] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#E21D8F] transition"
                    />

                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-white">
                      Nomor WhatsApp
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="08xxxxxxxxxx"
                      required
                      className="w-full bg-[#0f0f11] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#E21D8F] transition"
                    />

                  </div>

                  {/* Instagram */}
                  <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-white">
                      Instagram Organisasi
                    </label>

                    <input
                      type="text"
                      name="instagram"
                      placeholder="@organisasianda"
                      className="w-full bg-[#0f0f11] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#E21D8F] transition"
                    />

                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-white">
                      Tentang Organisasi
                    </label>

                    <textarea
                      name="organization_description"
                      placeholder="Ceritakan sedikit tentang organisasi Anda dan event yang pernah diselenggarakan..."
                      rows={4}
                      required
                      className="w-full bg-[#0f0f11] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#E21D8F] transition resize-none"
                    />

                  </div>

                  {/* Hidden subject */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Event Organizer Registration"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E21D8F] hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-[#E21D8F]/20"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </button>

                  {submitSuccess && (
                    <div className="text-center flex flex-col gap-2">
                      <p className="text-green-400 font-semibold">
                        Registration submitted successfully!
                      </p>

                      <p className="text-sm text-gray-400">
                        Redirecting to homepage in {countdown} seconds...
                      </p>
                    </div>
                  )}

                  {submitError && (
                    <p className="text-red-400 text-sm">
                      {submitError}
                    </p>
                  )}

                  <p className="text-xs text-gray-500 text-center">
                    Your registration will be reviewed by our administrator.
                  </p>

                </form>

              </div>

            </div>
          )}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="flex flex-col gap-4 max-w-xs">
              <h1 className="text-xl font-bold text-white">
                The<span className="text-[#E21D8F]"> Concert's</span>
              </h1>
              <p className="text-xs leading-relaxed">
                Platform pembelian tiket konser resmi. Aman, cepat, dan terpercaya.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-xs">
              <div className="flex flex-col gap-2">
                <span className="text-white font-semibold mb-1">Jelajahi</span>
                {["Konser", "Festival", "Kategori", "Promo"].map((l) => (
                  <a key={l} href="#" className="hover:text-[#FBADCC] transition">{l}</a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white font-semibold mb-1">Bantuan</span>
                {["FAQ", "Syarat & Ketentuan", "Privasi", "Kontak"].map((l) => (
                  <a key={l} href="#" className="hover:text-[#FBADCC] transition">{l}</a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white font-semibold mb-1">Ikuti Kami</span>
                {["Instagram", "Twitter / X", "TikTok", "YouTube"].map((l) => (
                  <a key={l} href="#" className="hover:text-[#FBADCC] transition">{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-[11px] text-gray-500 flex flex-col md:flex-row justify-between gap-3">
            <span>© 2026 The Consert's All rights reserved.</span>
            <span>Made with ♥ for music lovers.</span>
          </div>

        </div>
      </footer>
    </main>
  );
}