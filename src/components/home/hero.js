"use client"

export default function HeroSection() {
    return(
        <section className="mx-auto w-[95%] sm:w-[90%] overflow-hidden rounded-xl shadow-lg shadow-pink-300/30 bg-black relative">
            <img
                src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600"
                className="h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full object-cover brightness-40"
                alt="Concert Hero"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                    Musik Terbaik Layak
                    <br className="hidden sm:block" />
                    Dinikmati Secara Langsung
                </h2>

                <p className="mt-3 sm:mt-4 md:mt-6 max-w-xs sm:max-w-sm md:max-w-xl text-xs sm:text-sm md:text-base text-gray-300">
                    Jangan hanya mendengarkan, rasakan langsung euforianya.
                    <br className="hidden sm:block" />
                    Temukan konser favoritmu dan pesan tiket sekarang juga.
                </p>

                <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FBADCC] rounded-xl text-sm sm:text-base font-semibold text-black hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E21D8F]/30">
                        Cari Tiket
                    </button>
                    <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white/50 rounded-xl text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white transition-all duration-300">
                        Lihat Event
                    </button>
                </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" className="opacity-50">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
            </div>
        </section>
    )
}