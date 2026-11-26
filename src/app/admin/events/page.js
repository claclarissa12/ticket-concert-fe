"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { adminApi } from "../../../../lib/api"

export default function SuperAdminEvents() {
    const [activeTab, setActiveTab] = useState("published")
    const [searchTerm, setSearchTerm] = useState("")
    const [concert, setConcert] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchConcert = useCallback(async () => {
        setLoading(true)
        try {
            const res = await adminApi.getConcert()
            const payload = res?.data?.data ?? res?.data ?? res
            const list = Array.isArray(payload) ? payload : payload?.items ?? []

            setConcert(
                list.filter(c => c.status === "published" || c.status === "cancelled")
            )
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
        cancelled: "bg-red-500/20 text-red-400"
    }[status] || "bg-gray-500/20 text-gray-400")

    const filteredEvents = concert.filter(c => {
        const name = (c.title ?? c.name ?? "").toLowerCase()
        const matchSearch = name.includes(searchTerm.toLowerCase())
        const matchTab = c.status === activeTab
        return matchSearch && matchTab
    })

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold"> Events</h1>
                                <p className="text-gray-400 text-sm mt-1">Monitor all events across platform</p>
                            </div>

                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                                {["published", "cancelled"].map(tab => (
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

                                                <p className="text-xs text-neutral-500 mt-2 flex gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" color="#FBADCC"
                                                        fill="currentColor" viewBox="0 0 24 24" >
                                                        <path d="m22 5-5-2v4.42c-1.34-.24-2.75-.36-4-.4V5.2L16 4l-5-2v5.02c-1.25.04-2.66.16-4 .4V6.2L10 5 5 3v4.89c-1.73.54-3 1.37-3 2.61v8C2 21.26 8.29 22 12 22s10-.74 10-3.5v-8c0-1.24-1.27-2.07-3-2.61V6.2zM10 19.93V18h4v1.93c-.62.04-1.28.07-2 .07s-1.38-.03-2-.07m6-.21V17c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2.72c-2.4-.35-3.76-.96-4-1.29v-5.69c2.16.95 5.61 1.26 8 1.26s5.84-.31 8-1.26v5.69c-.24.33-1.6.94-4 1.29M12 12c-4.75 0-7.4-.99-7.94-1.5C4.6 9.99 7.25 9 12 9s7.4.99 7.94 1.5c-.54.51-3.19 1.5-7.94 1.5"></path>
                                                    </svg>
                                                    {c.venue ?? "-"}
                                                </p>
                                                <p className="text-xs text-neutral-500 mt-2 flex gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" color="#FBADCC"
                                                        fill="currentColor" viewBox="0 0 24 24" >
                                                        <path d="M16 10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4m-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2"></path><path d="M11.42 21.81c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8s-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82M12 4c3.31 0 6 2.69 6 6 .02 4.44-4.39 8.43-6 9.74-1.61-1.31-6.02-5.29-6-9.74 0-3.31 2.69-6 6-6"></path>
                                                    </svg>
                                                    {c.location ?? "-"}
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