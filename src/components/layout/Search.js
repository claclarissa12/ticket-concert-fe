"use client"
import { Search, MapPin, Calendar } from "lucide-react";

export default function SearchHome() {
    return (
        <section className="relative z-30 max-w-[80%] md:max-w-[75%] lg:max-w-[82%] mx-auto w-full px-2 sm:px-0 mt-6">
            <div className=" rounded-2xl p-4 md:p-5 flex flex-col lg:flex-row items-center gap-4 shadow-2xl shadow-black/50">
                
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
                    <input
                        type="text"
                        placeholder="Cari Artis atau Event"
                        className="w-full bg-transparent border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:bg-white/5 transition-all"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
                    
                    <div className="relative w-full md:w-auto">
                        <select className="w-full md:w-[170px] bg-transparent border border-white/10 rounded-xl py-3.5 pl-4 pr-10 text-sm text-white appearance-none outline-none focus:border-pink-500 focus:bg-white/5 transition-all cursor-pointer">
                            <option className="bg-[#1a1a1d]">Pilih Lokasi</option>
                            <option className="bg-[#1a1a1d]">Jakarta</option>
                            <option className="bg-[#1a1a1d]">Bandung</option>
                        </select>
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative w-full md:w-auto">
                        <select className="w-full md:w-[170px] bg-transparent border border-white/10 rounded-xl py-3.5 pl-4 pr-10 text-sm text-white appearance-none outline-none focus:border-pink-500 focus:bg-white/5 transition-all cursor-pointer">
                            <option className="bg-[#1a1a1d]">Semua Konser</option>
                            <option className="bg-[#1a1a1d]">Festival</option>
                            <option className="bg-[#1a1a1d]">Fan Meeting</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <select className="w-full md:w-[190px] bg-transparent border border-white/10 rounded-xl py-3.5 pl-10 pr-10 text-sm text-white appearance-none outline-none focus:border-pink-500 focus:bg-white/5 transition-all cursor-pointer">
                            <option className="bg-[#1a1a1d]">Semua Tanggal</option>
                            <option className="bg-[#1a1a1d]">Hari Ini</option>
                            <option className="bg-[#1a1a1d]">Minggu Ini</option>
                        </select>
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>

                    <button className="w-full md:w-auto border border-[#FBADCC]/50 text-[#FBADCC] hover:bg-[#FBADCC] hover:text-black text-sm font-semibold py-3.5 px-6 rounded-xl transition-all whitespace-nowrap">
                        Minggu Ini
                    </button>

                </div>
            </div>
        </section>
    )
}
