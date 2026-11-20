"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { adminApi } from "../../../../lib/api"

export default function SuperAdminEvents() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const [concert, setConcert] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchConcert = useCallback(async ({ silent = false } = {}) => {
        if (!silent) setLoading(true)
        setError("")
        try {
            const res = await adminApi.getConcert()
            const payload = res?.data?.data ?? res?.data ?? res
            const list = Array.isArray(payload) ? payload : (payload?.items ?? [])
            setConcert(list)
        } catch (err) {
            console.error("ERROR:", err)
            setError(err.message || "Gagal memuat data")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchConcert({ silent: true })
    }, [fetchConcert])

    const formatPrice = (price) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price || 0)

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

    const filteredEvents = concert.filter((c) => {
        const name = (c.name ?? c.title ?? "").toLowerCase()
        const matchesSearch = name.includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && c.status === activeTab
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
                            <button
                                onClick={() => fetchConcert()}
                                disabled={loading}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] disabled:opacity-50"
                            >
                                {loading ? "Loading..." : "Refresh"}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm border border-red-500/30">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                                {["all", "published", "draft", "cancelled"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 rounded-lg text-sm transition-colors capitalize ${activeTab === tab ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                            />
                        </div>

                        {loading && concert.length === 0 && (
                            <div className="text-center py-16 text-gray-400 text-sm">Memuat data...</div>
                        )}

                        <div className="divide-y divide-[#222] border-y border-[#222]">
                            {filteredEvents.map((c) => {
                                const title = c.name ?? c.title ?? "-"
                                const date = c.start_date ?? c.event_date ?? c.date ?? "-"
                                const location = c.venue ?? c.location ?? "-"
                                const banner = c.banner_url ?? c.banner ?? c.image_url ?? null
                                const sold = c.sold ?? 0
                                const tickets = c.tickets ?? c.quota ?? 0
                                const revenue = c.revenue ?? 0
                                const pct = tickets > 0 ? Math.round((sold / tickets) * 100) : 0

                                return (
                                    <div key={c.id} className="py-5 hover:bg-[#181818] transition-colors -mx-3 px-3 rounded-lg">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {banner ? (
                                                <img
                                                    src={banner}
                                                    alt={title}
                                                    className="w-full sm:w-32 h-32 rounded-lg object-cover flex-shrink-0 grayscale-[30%]"
                                                />
                                            ) : (
                                                <div className="w-full sm:w-32 h-32 rounded-lg bg-[#222] flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h3 className="font-medium truncate">{title}</h3>
                                                    </div>
                                                    <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${getStatusColor(c.status)}`}>
                                                        {getStatusLabel(c.status)}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-neutral-500 mt-2">
                                                    {date} · {location}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-xs text-neutral-400">
                                                    <span>
                                                        Tiket terjual{" "}
                                                        <span className="text-white font-medium">{sold}</span>
                                                        <span className="text-neutral-600">/{tickets}</span>
                                                    </span>
                                                    <span>
                                                        Revenue{" "}
                                                        <span className="text-white font-medium">{formatPrice(revenue)}</span>
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
                                                        href={`/admin/events/${c.id}`}
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

                        {!loading && filteredEvents.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                                <p className="text-gray-400">No events match your current filter</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">
                                Showing {filteredEvents.length} of {concert.length} events
                            </p>
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