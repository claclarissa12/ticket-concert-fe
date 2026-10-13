"use client"

export default function SearchHome() {
    return (
        <section className="mx-auto mt-6 sm:mt-8 w-[95%] sm:w-[90%] lg:w-[92%] rounded-2xl border border-[#272727] bg-[#1a1a1a] p-3 sm:p-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                <div className="flex-1 rounded-xl border border-[#333] bg-[#141414] px-4 sm:px-5 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC]/60 focus-within:border-[#FBADCC] transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6"></path>
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari Artis atau Event"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                        />
                    </div>
                </div>

                <select className="rounded-xl border border-[#333] bg-[#141414] px-4 sm:px-5 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC]/60 focus:border-[#FBADCC] transition-colors text-gray-300 w-full lg:w-auto min-w-[150px] cursor-pointer">
                    <option>Pilih Lokasi</option>
                </select>

                <select className="rounded-xl border border-[#333] bg-[#141414] px-4 sm:px-5 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC]/60 focus:border-[#FBADCC] transition-colors text-gray-300 w-full lg:w-auto min-w-[150px] cursor-pointer">
                    <option>Semua Genre</option>
                </select>

                <select className="rounded-xl border border-[#333] bg-[#141414] px-4 sm:px-5 py-2.5 text-sm sm:text-base outline-none hover:border-[#FBADCC]/60 focus:border-[#FBADCC] transition-colors text-gray-300 w-full lg:w-auto min-w-[150px] cursor-pointer">
                    <option>Semua Tanggal</option>
                </select>
            </div>
        </section>
    )
}