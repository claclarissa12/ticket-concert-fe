"use client"

import HeroSection from "@/components/home/hero"
import SearchHome from "@/components/home/Search"
import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"

const popularEvents = [
    {
        id: 1,
        date: "17 Mei 2026",
        title: "Nassar Tour 2026",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
        price: "IDR 500.000",
        location: "Jakarta International Stadium"
    },
    {
        id: 2,
        date: "17 Mei 2026",
        title: "Nassar Tour 2026",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
        price: "IDR 500.000",
        location: "Jakarta International Stadium"
    },
    {
        id: 3,
        date: "17 Mei 2026",
        title: "Nassar Tour 2026",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
        price: "IDR 500.000",
        location: "Jakarta International Stadium"
    },
    {
        id: 4,
        date: "17 Mei 2026",
        title: "Nassar Tour 2026",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
        price: "IDR 500.000",
        location: "Jakarta International Stadium"
    },
    {
        id: 5,
        date: "17 Mei 2026",
        title: "Nassar Tour 2026",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
        price: "IDR 500.000",
        location: "Jakarta International Stadium"
    },
    {
        id: 6,
        date: "17 Mei 2026",
        title: "Nassar Tour 2026",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
        price: "IDR 500.000",
        location: "Jakarta International Stadium"
    },
];

const upcomingEvents = [
    {
        id: 1,
        date: "22 Juli 2027",
        title: "Nassar Horizon World Tour 2027",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700",
        location: "Jakarta International Stadium",
        price: "IDR 500.000"
    },
    {
        id: 2,
        date: "22 Juli 2027",
        title: "Nassar Horizon World Tour 2027",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700",
        location: "Jakarta International Stadium",
        price: "IDR 500.000"
    },
    {
        id: 3,
        date: "22 Juli 2027",
        title: "Nassar Horizon World Tour 2027",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700",
        location: "Jakarta International Stadium",
        price: "IDR 500.000"
    },
];

export default function HomeUser() {
    return (
        <div className="bg-[#131313] min-h-screen text-white">
            <UserNavbar />
            <HeroSection />
            <SearchHome />

            <div className="px-4 sm:px-6 lg:px-20 py-6 sm:py-10 space-y-8 sm:space-y-12">
                {/* Terpopuler */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl text-[#FBADCC] font-bold uppercase tracking-wider">
                                Terpopuler Minggu Ini
                            </h2>
                            <div className="w-16 h-1 bg-[#FBADCC] rounded-full"></div>
                        </div>
                        <button className="text-sm text-[#FBADCC] hover:text-white transition-colors flex items-center gap-1 group">
                            Lihat Semua 
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {popularEvents.slice(0, 3).map((event) => (
                            <div key={event.id} className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] hover:bg-[#222] transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FBADCC]/10">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute top-3 right-3 bg-[#E21D8F] px-3 py-1 rounded-full text-xs font-bold">
                                         Populer
                                    </div>
                                </div>
                                <div className="relative p-5 space-y-3">
                                    <p className="text-sm text-[#FBADCC] font-medium">{event.date}</p>
                                    <h3 className="text-lg font-bold text-white group-hover:text-[#FBADCC] transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                                        <span className="text-sm font-bold text-[#FBADCC]">{event.price}</span>
                                        <button className="px-6 py-2 bg-[#FBADCC]  rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[#E21D8F]/25">
                                            Beli Tiket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Konser Mendatang */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl text-[#FBADCC] font-bold uppercase tracking-wider">
                                Konser Mendatang
                            </h2>
                            <div className="w-16 h-1 bg-[#FBADCC] rounded-full"></div>
                        </div>
                        <button className="text-sm text-[#FBADCC] hover:text-white transition-colors flex items-center gap-1 group">
                            Lihat Semua 
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#FBADCC] scrollbar-track-[#1a1a1a]">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[420px] bg-[#1a1a1a] rounded-2xl p-4 sm:p-5 hover:bg-[#222] transition-all duration-300 hover:scale-[1.02] flex-shrink-0">
                                <div className="flex gap-4">
                                    <img
                                        src={event.image}
                                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover flex-shrink-0"
                                        alt={event.title}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-[#FBADCC]">{event.date}</p>
                                        <h3 className="text-sm sm:text-base font-bold mt-1 line-clamp-2">{event.title}</h3>
                                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                            </svg>
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-sm font-bold text-[#FBADCC]">{event.price}</span>
                                            <button className="px-4 py-1.5 bg-[#FBADCC] rounded-lg text-xs font-semibold text-black hover:opacity-90 transition-all">
                                                Pesan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daftar Konser */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl text-[#FBADCC] font-bold uppercase tracking-wider">
                                Daftar Konser
                            </h2>
                            <div className="w-16 h-1 bg-[#FBADCC] rounded-full"></div>
                        </div>
                        <button className="text-sm text-[#FBADCC] hover:text-white transition-colors flex items-center gap-1 group">
                            Lihat Semua 
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#272727]">
                        <div className="pb-4 mb-4 border-b border-[#272727]">
                            <p className="text-sm font-semibold text-gray-400">Indonesia</p>
                            <div className="w-12 h-1 bg-gradient-to-r from-[#FBADCC] to-[#E21D8F] rounded-full mt-1"></div>
                        </div>

                        <div className="space-y-4">
                            {popularEvents.slice(0, 3).map((event) => (
                                <div key={event.id} className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 rounded-xl bg-[#131313] hover:bg-[#1a1a1a] transition-all duration-300 border border-transparent hover:border-[#272727]">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full md:w-48 h-40 md:h-32 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-lg sm:text-xl font-bold text-[#FBADCC]">{event.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"/>
                                                    <path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                                                </svg>
                                                {event.date}
                                            </span>
                                            <span className="hidden sm:inline text-[#272727]">|</span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                </svg>
                                                Jl. Marginda No 89, Depok
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                                            <span className="text-xl font-bold text-[#FBADCC]">{event.price}</span>
                                            <button className="w-full sm:w-auto px-8 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[#E21D8F]/25">
                                                Dapatkan Tiket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}