"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import AdminGuard from "@/components/admin/guardAdmin"
import { adminApi, assetUrl } from "../../../../../lib/api"
import SidebarAdmin from "@/components/admin/sidebarADM"

export default function DetailEvent() {
    const params = useParams()
    const id = params.id

    const [concert, setConcert] = useState(null)
    const [ticketTiers, setTicketTiers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState("all")
    const [deletingId, setDeletingId] = useState(null)


    const fetchDetail = useCallback(async () => {
        if (!id) return
        setLoading(true)
        setError("")
        try {
            const res = await adminApi.getConcertById(id)
            const data = res.data || {}

            setConcert(data)
            setTicketTiers(data.TicketTiers || data.ticketTiers || data.tiers || [])   // 👈 ini
        } catch (err) {
            console.error("ERROR:", err)
            setError(err.message || "Gagal memuat data")
        } finally {
            setLoading(false)
        }
    }, [id])

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah kamu yakin ingin menghapus konser ini? Tindakan ini tidak dapat dibatalkan."
        )

        if (!confirmed) return

        try {
            setDeletingId(id)

            const result = await adminApi.removeConcert(id)

            alert(result.message || "Konser berhasil dihapus")

            await fetchConcerts()

        } catch (err) {
            console.error("DELETE CONCERT ERROR:", err)
            alert(err.message || "Gagal menghapus konser")
        } finally {
            setDeletingId(null)
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [fetchDetail])

    if (loading) return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        </AdminGuard>
    )

    if (error) return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-red-400">{error}</p>
                </div>
            </div>
        </AdminGuard>
    )

    if (!concert) return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400">Concert not found</p>
                </div>
            </div>
        </AdminGuard>
    )

    const filteredTiers = ticketTiers.filter((tier) => {
        if (activeTab === "all") return true
        if (activeTab === "active") return (tier.status || "").toLowerCase() === "active"
        if (activeTab === "sold out") return (tier.sold || 0) >= (tier.quota || 0)
        if (activeTab === "upcoming")
            return tier.sale_start && new Date(tier.sale_start) > new Date()
        return true
    })

    const totalQuota = ticketTiers.reduce((s, t) => s + (Number(t.quota) || 0), 0)
    const totalSold = ticketTiers.reduce((s, t) => s + (Number(t.sold) || 0), 0)
    const totalAvailable = totalQuota - totalSold

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3">
                                    <Link href="/admin/events" className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </Link>
                                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                        Event Details & Manage Tickets
                                    </h1>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">
                                    {concert.title} - Complete event information & ticket tiers
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            <div className="lg:col-span-2 space-y-6">

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-start gap-6">
                                        <img src={concert.banner_url} alt={concert.title} className="w-48 h-32 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl font-bold">{concert.title}</h2>
                                                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>{concert.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{concert.venue}, {concert.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold">Stage Layout</h2>
                                        <span className="text-xs px-3 py-1 rounded-full bg-[#FBADCC]/20 text-[#FBADCC]">
                                            Venue Design
                                        </span>
                                    </div>

                                    {concert.layout_url ? (
                                        <img
                                            src={assetUrl(concert.layout_url)}
                                            alt="Stage Layout"
                                            className="w-full max-h-[500px] object-contain rounded-xl border border-[#383838] bg-[#1a1a1a]"
                                        />
                                    ) : (
                                        <p className="text-gray-400 text-sm">Stage layout belum tersedia.</p>
                                    )}
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Venue Location</h2>

                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#FBADCC]/20 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-[#FBADCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{concert.venue}</p>
                                            <p className="text-sm text-gray-400 mt-1">{concert.location}</p>
                                        </div>
                                    </div>

                                    {concert.map_url?.includes("/maps/embed") ? (
                                        <iframe
                                            src={concert.map_url}
                                            className="w-full h-72 rounded-xl border border-[#383838]"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            allowFullScreen
                                            title="Lokasi Venue"
                                        />
                                    ) : (
                                        <div className="w-full min-h-48 flex flex-col items-center justify-center bg-[#1a1a1a] border border-dashed border-[#444] rounded-xl p-6 text-center">
                                            <svg className="w-10 h-10 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-gray-400 text-sm">Lokasi Google Maps belum tersedia</p>
                                            <p className="text-xs text-gray-500 mt-1">Embed URL Google Maps akan ditampilkan di sini.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-[#272727] rounded-2xl border border-[#333] overflow-hidden">
                                    <div className="flex border-b border-[#333]">
                                        {["All", "Active", "Sold Out", "Upcoming"].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab.toLowerCase())}
                                                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.toLowerCase()
                                                    ? "border-[#FBADCC] text-[#FBADCC]"
                                                    : "border-transparent text-gray-400 hover:text-white"
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {filteredTiers.length === 0 && (
                                            <p className="text-center text-gray-400 py-8">Belum ada ticket tier.</p>
                                        )}

                                        {filteredTiers.map((tier) => (
                                            <div key={tier.id} className="bg-[#1a1a1a] rounded-xl p-5 hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#FBADCC]/20 flex items-center justify-center text-[#FBADCC] font-bold text-sm">
                                                            {(tier.name || "?").charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{tier.name}</h3>
                                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                                <span>Quota: {tier.quota}</span>
                                                                <span>•</span>
                                                                <span>Sold: {tier.sold}</span>
                                                                <span>•</span>
                                                                <span className="text-[#FBADCC] font-medium">
                                                                    {new Intl.NumberFormat("id-ID", {
                                                                        style: "currency",
                                                                        currency: "IDR",
                                                                        minimumFractionDigits: 0
                                                                    }).format(Number(tier.price) || 0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="w-32">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-gray-400">Available</span>
                                                                <span className="text-white">{(tier.quota || 0) - (tier.sold || 0)}</span>
                                                            </div>
                                                            <div className="w-full bg-[#272727] rounded-full h-2">
                                                                <div
                                                                    className="bg-[#FBADCC] rounded-full h-2 transition-all"
                                                                    style={{ width: `${tier.quota > 0 ? (tier.sold / tier.quota) * 100 : 0}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Ticket Summary</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <div>
                                                <p className="text-sm text-gray-400">Total Tickets</p>
                                                <p className="text-xl font-bold">{totalQuota.toLocaleString("id-ID")}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <div>
                                                <p className="text-sm text-gray-400">Sold</p>
                                                <p className="text-xl font-bold text-green-400">{totalSold.toLocaleString("id-ID")}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <div>
                                                <p className="text-sm text-gray-400">Available</p>
                                                <p className="text-xl font-bold text-[#FBADCC]">{totalAvailable.toLocaleString("id-ID")}</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-[#FBADCC]/20 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-[#FBADCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                                    <button
                                        onClick={() => handleDelete(concert.id)}
                                        disabled={deletingId === concert.id}
                                        className="w-full px-4 py-2.5 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 disabled:opacity-50 transition-colors"
                                    >
                                        {deletingId === concert.id ? "Removing..." : "Remove Concert"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}