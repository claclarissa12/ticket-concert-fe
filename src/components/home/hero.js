"use client"

export default function HeroSection() {
    return (
        <section className="mx-auto w-[95%] sm:w-[90%] lg:w-[92%] overflow-hidden rounded-2xl shadow-lg shadow-pink-300/20 bg-black relative">
            <img
                src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600"
                className="h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] w-full object-cover brightness-[0.35]"
                alt="Concert Hero"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#FBADCC] mb-3 sm:mb-4">
                    Live Experience 2026
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                    Musik Terbaik Layak
                    <br className="hidden sm:block" />
                    <span className="text-[#FBADCC]"> Dinikmati Secara Langsung</span>
                </h2>

                <p className="mt-4 sm:mt-5 md:mt-6 max-w-xs sm:max-w-md md:max-w-xl text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                    Jangan hanya mendengarkan, rasakan langsung euforianya.
                    <br className="hidden sm:block" />
                    Temukan konser favoritmu dan pesan tiket sekarang juga.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="px-7 sm:px-8 py-3 bg-[#FBADCC] rounded-xl text-sm sm:text-base font-semibold text-black hover:bg-[#f8a0c4] transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#FBADCC]/20">
                        Cari Tiket
                    </button>
                    <button className="px-7 sm:px-8 py-3 border-2 border-white/30 rounded-xl text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300">
                        Lihat Event
                    </button>
                </div>
            </div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24" className="opacity-40">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
            </div>
        </section>
    )
}