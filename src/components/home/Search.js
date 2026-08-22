"use client"

export default function SearchHome() {
    return (
        <section className="mx-auto mt-6 sm:mt-8 w-[95%] sm:w-[92%] md:w-[90%] rounded-xl border border-[#2b2b2b] bg-[#1c1c1c] p-3 sm:p-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4">
                <div className="flex-1 rounded-full border border-[#3a3a3a] bg-[#141414] px-4 sm:px-6 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC] transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6"></path>
                        </svg>
                        <span className="truncate">Cari Artis atau Event</span>
                    </div>
                </div>

                <select className="rounded-lg border border-[#3a3a3a] bg-[#141414] px-4 sm:px-6 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC] transition-colors text-gray-400 w-full lg:w-auto min-w-[140px]">
                    <option>Pilih Lokasi</option>
                </select>

                <select className="rounded-lg border border-[#3a3a3a] bg-[#141414] px-4 sm:px-6 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC] transition-colors text-gray-400 w-full lg:w-auto min-w-[140px]">
                    <option>Semua Genre</option>
                </select>

                <select className="rounded-lg border border-[#3a3a3a] bg-[#141414] px-4 sm:px-6 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC] transition-colors text-gray-400 w-full lg:w-auto min-w-[140px]">
                    <option>Semua Tanggal</option>
                </select>
            </div>
        </section>
    )
}