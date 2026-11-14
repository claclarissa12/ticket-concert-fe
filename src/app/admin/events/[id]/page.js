"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import { useParams, useRouter } from "next/navigation"

const eventsData = [
    { id: 1, title: "Konser Melodi Senja", description: "Konser akustik intim membawakan lagu-lagu romantis.", venue: "Hall A", location: "Jakarta", date: "01 Des 2026", status: "published", banner_url: "https://images.unsplash.com/photo-1540039155732-684736882273?w=800", total_tickets: 1600, sold: 0, revenue: 0 },
    { id: 2, title: "Neon Party 2026", description: "Pesta musik EDM dengan laser dan DJ ternama.", venue: "Main Stadium", location: "Bandung", date: "25 Nov 2026", status: "published", banner_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800", total_tickets: 50, sold: 0, revenue: 0 },
    { id: 3, title: "Rock In Solo", description: "Konser musik rock legendaris dari band lokal.", venue: "Lapangan Kota", location: "Solo", date: "15 Okt 2026", status: "published", banner_url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800", total_tickets: 200, sold: 0, revenue: 0 },
    { id: 4, title: "Jazz Under The Stars", description: "Nikmati alunan musik jazz di bawah langit malam.", venue: "Rooftop Hotel Bintang", location: "Surabaya", date: "10 Jan 2027", status: "draft", banner_url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800", total_tickets: 0, sold: 0, revenue: 0 },
    { id: 5, title: "K-Pop Festival Indonesia", description: "Konser besar yang menghadirkan berbagai grup K-Pop.", venue: "Gelora Bung Karno", location: "Jakarta", date: "20 Sep 2026", status: "cancelled", banner_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800", total_tickets: 0, sold: 0, revenue: 0 },
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

    const pct = event.total_tickets > 0 ? Math.round((event.sold / event.total_tickets) * 100) : 0

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "published": return "bg-green-500/20 text-green-400"
            case "draft": return "bg-yellow-500/20 text-yellow-400"
            case "cancelled": return "bg-red-500/20 text-red-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

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
                        <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(event.status)}`}>
                                {event.status}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold mt-3">{event.title}</h1>
                            <p className="text-gray-300 mt-1">{event.venue}, {event.location}</p>
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
                                        <p className="font-medium text-sm capitalize">{event.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Venue</p>
                                        <p className="font-medium text-sm">{event.venue}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
                                <h3 className="text-sm text-gray-400 mb-1">Total Revenue</h3>
                                <p className="text-2xl font-bold text-[#FBADCC]">{formatPrice(event.revenue)}</p>
                            </div>

                            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6">
                                <h3 className="text-sm text-gray-400 mb-4">Penjualan Tiket</h3>

                                <div className="flex items-end justify-between mb-2">
                                    <div>
                                        <p className="text-2xl font-bold">{event.sold}</p>
                                        <p className="text-xs text-gray-500">terjual</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-medium text-gray-400">{event.total_tickets}</p>
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