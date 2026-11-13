"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import { useParams, useRouter } from "next/navigation"

const eventsData = [
    { id: 1, name: "Nassar Tour 2026", organizer: "Event Organizer Corp", date: "20 Mei 2026", location: "Jakarta", category: "Concert", status: "Active", tickets: 600, sold: 457, revenue: "Rp 456.500.000", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800", description: "Konser tunggal Nassar dalam rangka tur nasional 2026. Menampilkan lagu-lagu terbaik dan spesial performance." },
    { id: 2, name: "Electronic Fest 2026", organizer: "Festival Pro", date: "25 Mei 2026", location: "Bandung", category: "Festival", status: "Active", tickets: 400, sold: 289, revenue: "Rp 289.000.000", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", description: "Festival musik elektronik terbesar di Bandung tahun ini. Menghadirkan DJ lokal dan internasional." },
    { id: 3, name: "Jazz Night", organizer: "Music Lounge", date: "30 Mei 2026", location: "Surabaya", category: "Concert", status: "Upcoming", tickets: 150, sold: 78, revenue: "Rp 78.000.000", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800", description: "Malam yang tenang dengan alunan musik jazz. Cocok untuk bersantai bersama teman dan keluarga." },
    { id: 4, name: "Rock Revolution", organizer: "Rock Empire", date: "5 Juni 2026", location: "Yogyakarta", category: "Concert", status: "Upcoming", tickets: 300, sold: 120, revenue: "Rp 120.000.000", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800", description: "Revolusi musik rock kembali hadir! Persembahan dari band-band rock legendaris Indonesia." },
    { id: 5, name: "Pop Music Festival", organizer: "Pop Culture", date: "10 Juni 2026", location: "Jakarta", category: "Festival", status: "Draft", tickets: 250, sold: 0, revenue: "Rp 0", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", description: "Festival musik pop yang sedang dalam tahap persiapan. Tunggu tanggal mainnya!" },
    { id: 6, name: "EDM Night", organizer: "Electronic Dreams", date: "15 Juni 2026", location: "Bali", category: "Festival", status: "Active", tickets: 500, sold: 312, revenue: "Rp 312.000.000", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800", description: "Nikmati malam penuh energi dengan musik EDM di Bali. Lineup spesial menanti!" },
]

export default function EventDetail() {
    const params = useParams()
    const router = useRouter()

    const event = eventsData.find((e) => e.id.toString() === params.id)

    if (!event) {
        return (
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">Event Tidak Ditemukan</h1>
                        <button onClick={() => router.push("/admin/events")} className="text-[#FBADCC] hover:underline">
                            Kembali ke daftar event
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const pct = Math.round((event.sold / event.tickets) * 100)

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>

                    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 relative">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="bg-[#FBADCC] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {event.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold mt-3">{event.name}</h1>
                            <p className="text-gray-300 mt-1">{event.organizer}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
                                <h2 className="text-lg font-semibold mb-4">Tentang Event</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {event.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                                        <p className="font-medium text-sm">{event.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Lokasi</p>
                                        <p className="font-medium text-sm">{event.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Status</p>
                                        <p className="font-medium text-sm">{event.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Organizer</p>
                                        <p className="font-medium text-sm">{event.organizer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
                                <h3 className="text-sm text-gray-400 mb-1">Total Revenue</h3>
                                <p className="text-2xl font-bold text-[#FBADCC]">{event.revenue}</p>
                            </div>

                            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
                                <h3 className="text-sm text-gray-400 mb-4">Penjualan Tiket</h3>

                                <div className="flex items-end justify-between mb-2">
                                    <div>
                                        <p className="text-2xl font-bold">{event.sold}</p>
                                        <p className="text-xs text-gray-500">terjual</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-medium text-gray-400">{event.tickets}</p>
                                        <p className="text-xs text-gray-500">total tiket</p>
                                    </div>
                                </div>

                                <div className="w-full bg-[#272727] rounded-full h-2 mt-2 overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full ${pct > 50 ? "bg-emerald-500" : "bg-amber-500"}`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <p className="text-xs text-right mt-2 text-gray-400">{pct}% terjual</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}