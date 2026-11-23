
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

    const fetchConcert = useCallback(async () => {
        setLoading(true)
        try {
            const res = await adminApi.getConcert()
            const payload = res?.data?.data ?? res?.data ?? res
            setConcert(Array.isArray(payload) ? payload : payload?.items ?? [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchConcert()
    }, [fetchConcert])

    const getStatusColor = (status) => ({
        published: "bg-green-500/20 text-green-400",
        draft: "bg-yellow-500/20 text-yellow-400",
        cancelled: "bg-red-500/20 text-red-400"
    }[status] || "bg-gray-500/20 text-gray-400")

    const filteredEvents = concert.filter(c => {
        const name = (c.title ?? c.name ?? "").toLowerCase()
        return name.includes(searchTerm.toLowerCase()) && (activeTab === "all" || c.status === activeTab)
    })

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">Memantau Event</h1>
                                <p className="text-gray-400 text-sm mt-1">Monitor all events across platform</p>
                            </div>
                            <button onClick={fetchConcert} disabled={loading} className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm border border-[#333]">
                                {loading ? "Loading..." : "Refresh"}
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                                {["all", "published", "draft", "cancelled"].map(tab => (
                                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-lg text-sm capitalize ${activeTab === tab ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search events..." className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none text-sm flex-1 min-w-[200px]" />
                        </div>

                        {loading && concert.length === 0 && <p className="text-center py-16 text-gray-400">Memuat data...</p>}

                        <div className="divide-y divide-[#222] border-y border-[#222]">
                            {filteredEvents.map(c => {
                                const tiers = c.tiers ?? []
                                const sold = tiers.reduce((sum, t) => sum + Number(t.sold || 0), 0)
                                const quota = tiers.reduce((sum, t) => sum + Number(t.quota || 0), 0)

                                return (
                                    <div key={c.id} className="py-5 hover:bg-[#181818] transition-colors -mx-3 px-3 rounded-lg">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {c.banner_url ? (
                                                <img src={c.banner_url} alt={c.title} className="w-full sm:w-32 h-32 rounded-lg object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="w-full sm:w-32 h-32 rounded-lg bg-[#222] flex items-center justify-center text-gray-500 text-xs flex-shrink-0">No Image</div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="font-medium truncate">{c.title ?? c.name ?? "-"}</h3>
                                                    <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
                                                </div>

                                                <p className="text-xs text-neutral-500 mt-2">
                                                    {c.start_date ? new Date(c.start_date).toLocaleDateString("id-ID") : "-"} · {c.venue ?? "-"}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-xs text-neutral-400">
                                                    <span>Tiket terjual <span className="text-white font-medium">{sold}</span><span className="text-neutral-600">/{quota}</span></span>
                                                    <span>Kategori tiket <span className="text-white font-medium">{tiers.length}</span></span>
                                                </div>

                                                <Link href={`/admin/events/${c.id}`} className="text-xs px-3 py-1.5 rounded-md border border-[#2a2a2a] hover:border-[#444] hover:bg-[#1f1f1f] transition-colors inline-block mt-3">
                                                    Detail
                                                </Link>
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

                        <p className="text-sm text-gray-400 mt-6">Showing {filteredEvents.length} of {concert.length} events</p>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}
