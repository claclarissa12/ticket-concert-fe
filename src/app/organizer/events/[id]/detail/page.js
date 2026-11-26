
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"
import { organizerApi, assetUrl } from "../../../../../../lib/api"
import BackButton from "@/components/cards/back"

export default function DetailEvent() {
    const { id } = useParams()
    const router = useRouter()

    const [concert, setConcert] = useState(null)
    const [ticketTiers, setTicketTiers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [publishing, setPublishing] = useState(false)
    const [canceling, setCanceling] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [message, setMessage] = useState("")
    const [publishError, setPublishError] = useState("")

    const fetchDetail = async () => {
        if (!id) return

        try {
            setLoading(true)
            setError("")

            const [concertRes, tierRes] = await Promise.all([
                organizerApi.getMyConcertById(id),
                organizerApi.getTiers(id)
            ])

            setConcert(concertRes.data?.concert || concertRes.data)

            const tiers = tierRes.data?.items || tierRes.data?.tiers || tierRes.data || []
            setTicketTiers(Array.isArray(tiers) ? tiers : [])
        } catch (err) {
            setError(err.message || "Gagal memuat detail konser")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [id])

    const handlePublish = async () => {
        if (!window.confirm("Apakah kamu yakin ingin mempublikasikan konser ini?")) return

        try {
            setPublishing(true)
            setMessage("")
            setPublishError("")

            await organizerApi.publishConcert(id)
            setMessage("Konser berhasil dipublikasikan!")
            await fetchDetail()
        } catch (err) {
            setPublishError(err.message || "Gagal mempublikasikan konser")
        } finally {
            setPublishing(false)
        }
    }

    const handleCancel = async () => {
        if (!window.confirm("Apakah kamu yakin ingin Cancel konser ini?")) return

        try {
            setCanceling(true)
            setMessage("")
            setPublishError("")

            await organizerApi.cancelConcert(id)
            setMessage("Konser berhasil dicancel!")
            await fetchDetail()
        } catch (err) {
            setPublishError(err.message || "Gagal cancel konser")
        } finally {
            setCanceling(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm("Apakah kamu yakin ingin menghapus konser ini? Tindakan ini tidak dapat dibatalkan.")) return

        try {
            setDeleting(true)

            const result = await organizerApi.deleteConcert(id)
            alert(result.message || "Konser berhasil dihapus")

            router.push("/organizer/events")
            router.refresh()
        } catch (err) {
            alert(err.message || "Gagal menghapus konser")
        } finally {
            setDeleting(false)
        }
    }

    if (loading || error || !concert) {
        return (
            <EoGuard>
                <div className="bg-[#131313] min-h-screen flex text-white">
                    <OrganizerSidebar />
                    <div className="flex-1 flex items-center justify-center">
                        <p className={error ? "text-red-400" : "text-gray-400"}>
                            {loading ? "Loading..." : error || "Concert not found"}
                        </p>
                    </div>
                </div>
            </EoGuard>
        )
    }

    const totalQuota = ticketTiers.reduce((total, tier) => total + (Number(tier.quota) || 0), 0)
    const totalSold = ticketTiers.reduce((total, tier) => total + (Number(tier.sold) || 0), 0)
    const totalAvailable = totalQuota - totalSold

    const formatRupiah = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(Number(price) || 0)
    }

    const formatNumber = (number) => Number(number || 0).toLocaleString("id-ID")

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 min-w-0 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <BackButton className="mb-4" />
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Event Details & Manage Tickets</h1>
                                <p className="text-gray-400 text-sm mt-1">{concert.title} - Complete event information & ticket tiers</p>
                            </div>

                            {concert.status === "published" ? (
                                <span className="px-4 py-2.5 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold">
                                    Published
                                </span>
                            ) : concert.status === "cancelled" ? (
                                <span className="px-4 py-2.5 bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold">
                                    Cancelled
                                </span>
                            ) : (
                                <button
                                    onClick={handlePublish}
                                    disabled={publishing || canceling || deleting}
                                    className="px-4 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                                >
                                    {publishing ? "Publishing..." : "Publish Event"}
                                </button>
                            )}
                        </div>

                        {message && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-5 text-sm">
                                {message}
                            </div>
                        )}

                        {publishError && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-5 text-sm">
                                {publishError}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-start gap-6">
                                        <img
                                            src={assetUrl(concert.banner_url)}
                                            alt={concert.title}
                                            className="w-48 h-32 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl font-bold">{concert.title}</h2>
                                                <span className={`text-xs px-3 py-1 rounded-full ${
                                                    concert.status === "published"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : concert.status === "cancelled"
                                                            ? "bg-red-500/20 text-red-400"
                                                            : "bg-yellow-500/20 text-yellow-400"
                                                }`}>
                                                    {concert.status?.charAt(0).toUpperCase() + concert.status?.slice(1)}
                                                </span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-400">
                                                <p>📅 {concert.date}</p>
                                                <p>📍 {concert.venue}, {concert.location}</p>
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

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="mb-5">
                                        <h2 className="text-lg font-semibold">Ticket Tiers</h2>
                                        <p className="text-sm text-gray-400 mt-1">Manage ticket categories for this event</p>
                                    </div>

                                    <div className="space-y-3">
                                        {ticketTiers.length === 0 ? (
                                            <p className="text-center text-gray-400 py-8">Belum ada ticket tier.</p>
                                        ) : (
                                            ticketTiers.map((tier) => {
                                                const quota = Number(tier.quota) || 0
                                                const sold = Number(tier.sold) || 0
                                                const available = Math.max(quota - sold, 0)

                                                let status = "Active"

                                                if (available === 0) status = "Sold Out"
                                                else if (tier.sale_start && new Date(tier.sale_start) > new Date()) status = "Upcoming"
                                                else if (tier.sale_end && new Date(tier.sale_end) < new Date()) status = "Ended"

                                                return (
                                                    <div key={tier.id} className="bg-[#1a1a1a] rounded-xl p-5 border border-[#333]">
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-[#FBADCC]/20 flex items-center justify-center text-[#FBADCC] font-bold">
                                                                    {(tier.name || "?").charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-lg">{tier.name}</h3>
                                                                    <p className="text-[#FBADCC] font-medium text-sm">{formatRupiah(tier.price)}</p>
                                                                    <p className="text-xs text-gray-400 mt-1">
                                                                        Quota: {formatNumber(quota)} · Sold: {formatNumber(sold)} · Available: {formatNumber(available)}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <span className={`text-xs px-3 py-1 rounded-full ${
                                                                    status === "Sold Out"
                                                                        ? "bg-red-500/20 text-red-400"
                                                                        : status === "Upcoming"
                                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                                            : status === "Ended"
                                                                                ? "bg-gray-500/20 text-gray-400"
                                                                                : "bg-green-500/20 text-green-400"
                                                                }`}>
                                                                    {status}
                                                                </span>
                                                                <div className="w-24">
                                                                    <div className="w-full bg-[#333] rounded-full h-2">
                                                                        <div
                                                                            className="bg-[#FBADCC] rounded-full h-2"
                                                                            style={{ width: `${quota > 0 ? Math.min((sold / quota) * 100, 100) : 0}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )}
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
                                                <p className="text-xl font-bold">{formatNumber(totalQuota)}</p>
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
                                                <p className="text-xl font-bold text-green-400">{formatNumber(totalSold)}</p>
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
                                                <p className="text-xl font-bold text-[#FBADCC]">{formatNumber(totalAvailable)}</p>
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
                                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                    <div className="space-y-3">
                                        <Link
                                            href={`/organizer/events/${concert.id}/edit`}
                                            className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2"
                                        >
                                            Edit Event
                                        </Link>

                                        {concert.status !== "cancelled" && (
                                            <button
                                                onClick={handleCancel}
                                                disabled={canceling || publishing || deleting}
                                                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] border border-[#333] transition-colors disabled:opacity-50"
                                            >
                                                {canceling ? "Cancelling..." : "Cancel Event"}
                                            </button>
                                        )}

                                        <Link
                                            href="/organizer/attendees"
                                            className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2"
                                        >
                                            View Attendees
                                        </Link>

                                        <button
                                            onClick={handleDelete}
                                            disabled={deleting || publishing || canceling}
                                            className="w-full px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                        >
                                            {deleting ? "Deleting..." : "Delete Event"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EoGuard>
    )
}
