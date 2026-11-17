"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { concertApi } from "../../../../lib/api"

export default function SuperAdminEvents() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const [concert, setConcert] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    const fetchConcert = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await concertApi.getConcert()

            const listData = res.data?.items || [];
            setConcert(listData);

        } catch (err) {
            console.error("ERROR:", err)
            setError(err.message || "Gagal memuat data")
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        fetchConcert()
    }, [fetchConcert])



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

    const getStatusLabel = (status) => {
        switch (status) {
            case "published": return "Published"
            case "draft": return "Draft"
            case "cancelled": return "Cancelled"
            default: return status
        }
    }

    const filteredEvents = concert.filter(concert => {
        const matchesSearch = concert.title.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && concert.status === activeTab
    })

    return (
        <AdminGuard>

            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Memantau Event</h1>
                                <p className="text-gray-400 text-sm mt-1">Monitor all events across platform</p>
                            </div>
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Export
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                                <button onClick={() => setActiveTab("all")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>All</button>
                                <button onClick={() => setActiveTab("published")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "published" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Published</button>
                                <button onClick={() => setActiveTab("draft")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "draft" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Draft</button>
                                <button onClick={() => setActiveTab("cancelled")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "cancelled" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Cancelled</button>
                            </div>
                            <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]" />
                        </div>

                        <div className="divide-y divide-[#222] border-y border-[#222]">
                            {filteredEvents.map(concert => {
                                const pct = concert.tickets > 0 ? Math.round((concert.sold / concert.tickets) * 100) : 0
                                return (
                                    <div key={concert.id} className="py-5 hover:bg-[#181818] transition-colors -mx-3 px-3 rounded-lg">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <img
                                                src={concert.banner_url}
                                                alt={concert.title}
                                                className="w-full sm:w-32 h-32 rounded-lg object-cover flex-shrink-0 grayscale-[30%]"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h3 className="font-medium truncate">{concert.title}</h3>
                                                    </div>
                                                    <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${getStatusColor(event.status)}`}>
                                                        {getStatusLabel(concert.status)}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-neutral-500 mt-2">
                                                    {concert.date} · {concert.location}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-xs text-neutral-400">
                                                    <span>
                                                        Tiket terjual{" "}
                                                        <span className="text-white font-medium">{concert.sold}</span>
                                                        <span className="text-neutral-600">/{concert.tickets}</span>
                                                    </span>
                                                    <span>
                                                        Revenue{" "}
                                                        <span className="text-white font-medium">{formatPrice(concert.revenue)}</span>
                                                    </span>
                                                    <span>
                                                        Kehadiran{" "}
                                                        <span className={pct > 50 ? "text-emerald-400" : "text-amber-400"}>
                                                            {pct}%
                                                        </span>
                                                    </span>
                                                </div>

                                                <div className="w-full bg-[#222] rounded-full h-1 mt-3">
                                                    <div
                                                        className={`h-1 rounded-full ${pct > 50 ? "bg-emerald-500/60" : "bg-amber-500/60"}`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>

                                                <div className="flex gap-2 mt-3">
                                                    <Link
                                                        href={`/admin/events/${concert.id}`}
                                                        className="text-xs px-3 py-1.5 rounded-md border border-[#2a2a2a] hover:border-[#444] hover:bg-[#1f1f1f] transition-colors inline-block"
                                                    >
                                                        Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {filteredEvents.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                                <p className="text-gray-400">No events match your current filter</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">Showing {filteredEvents.length} of {concert.length} events</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Previous</button>
                                <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">1</button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}