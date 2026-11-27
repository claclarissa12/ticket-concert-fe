"use client"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { organizerApi } from "../../../../lib/api"
import { useCallback, useEffect, useState } from "react"

export default function OrganizerEvents() {
    const [concert, setConcert] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const router = useRouter()

    const fetchConcert = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await organizerApi.getMyConcert()
            const listData = res.data?.items || []
            setConcert(listData)
        } catch (err) {
            console.error("GET CONCERT ERROR:", err)
            setError(err.message || "Gagal memuat data konser")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchConcert()
    }, [fetchConcert])

    const getStatusColor = (status) => {
        switch (status) {
            case "published": return "bg-green-500/20 text-green-400"
            case "draft": return "bg-yellow-500/20 text-yellow-400"
            case "cancelled": return "bg-red-500/20 text-red-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    const formatStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Events</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage all your events</p>
                            </div>
                            <Link
                                href="/organizer/create"
                                className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all"
                            >
                                + Create Event
                            </Link>
                        </div>
                        {loading ? (
                            <div className="text-center py-20 text-gray-400">
                                Loading events...
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-red-400">{error}</p>
                                <button
                                    onClick={fetchConcert}
                                    className="mt-4 px-4 py-2 bg-[#FBADCC] text-black rounded-xl"
                                >
                                    Coba Lagi
                                </button>
                            </div>
                        ) : concert.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                Belum ada konser yang kamu buat.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {concert.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => router.push(`/organizer/events/${item.id}/detail`)}
                                        className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333] group cursor-pointer hover:border-[#FBADCC]/50 transition-colors"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={item.banner_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                                                    {formatStatus(item.status)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold mb-1">
                                                {item.title}
                                            </h3>
                                            <div className="space-y-2 text-sm text-gray-400">
                                                <div className="flex gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="#FBADCC"
                                                        fill="currentColor" viewBox="0 0 24 24" >
                                                        <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path><path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path>
                                                    </svg>
                                                    {formatDate(item.date)}
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="#FBADCC"
                                                        fill="currentColor" viewBox="0 0 24 24" >
                                                        <path d="M16 10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4m-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2"></path><path d="M11.42 21.81c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8s-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82M12 4c3.31 0 6 2.69 6 6 .02 4.44-4.39 8.43-6 9.74-1.61-1.31-6.02-5.29-6-9.74 0-3.31 2.69-6 6-6"></path>
                                                    </svg>
                                                    {item.location}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#333]">
                                                <div>
                                                    <p className="text-xs text-gray-400">Tickets Sold</p>
                                                    <p className="font-bold">
                                                        {item.sold ?? item.tiers?.reduce((total, tier) => total + Number(tier.sold || 0), 0) ?? 0}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </EoGuard>
    )
}