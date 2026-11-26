"use client"


import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { organizerApi } from "../../../../lib/api"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(Number(value) || 0)
}

function formatDate(value) {
    if (!value) return "-"

    return new Date(value).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

function getTicketStatus(ticket) {
    const status = ticket.sale_status

    if (status === "sold_out") return "Sold Out"
    if (status === "upcoming") return "Upcoming"
    if (status === "ended") return "Ended"
    if (status === "on_sale") return "Active"

    const now = new Date()
    const start = ticket.sale_start ? new Date(ticket.sale_start) : null
    const end = ticket.sale_end ? new Date(ticket.sale_end) : null

    if (Number(ticket.sold) >= Number(ticket.quota)) return "Sold Out"
    if (start && now < start) return "Upcoming"
    if (end && now > end) return "Ended"

    return "Active"
}

export default function TicketsPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [selectedEvent, setSelectedEvent] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")

    const fetchTickets = async () => {
        try {
            setLoading(true)
            setError("")

            const concertRes = await organizerApi.getMyConcert()

            const concertData = concertRes.data?.items
                || concertRes.data?.concerts
                || concertRes.data

            if (!Array.isArray(concertData)) {
                throw new Error("Format data konser tidak sesuai")
            }

            const ticketRequests = await Promise.all(
                concertData.map(async (concert) => {
                    const tierRes = await organizerApi.getTiers(concert.id)

                    const tierData = tierRes.data?.items
                        || tierRes.data?.tiers
                        || tierRes.data

                    if (!Array.isArray(tierData)) return []

                    return tierData.map((tier) => ({
                        ...tier,
                        concertId: concert.id,
                        eventTitle: concert.title,
                        eventDate: concert.date,
                        venue: concert.venue
                    }))
                })
            )

            setTickets(ticketRequests.flat())
        } catch (err) {
            console.error("Gagal mengambil data tickets:", err)
            setError(err.message || "Gagal mengambil data tiket")
        } finally {
            setLoading(false)
        }
    }


    const handleTierChange = (index, e) => {
        const { name, value } = e.target

        setTiers(prev => prev.map((tier, i) =>
            i === index ? { ...tier, [name]: value } : tier
        ))
    }

    const removeTier = (index) => {
        setTiers(prev => {
            const selected = prev[index]

            if (selected.id) {
                return prev.map((tier, i) =>
                    i === index ? { ...tier, deleted: true } : tier
                )
            }

            return prev.filter((_, i) => i !== index)
        })
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    const events = useMemo(() => {
        return [...new Map(
            tickets.map(ticket => [
                ticket.concertId,
                {
                    id: ticket.concertId,
                    title: ticket.eventTitle
                }
            ])
        ).values()]
    }, [tickets])

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => {
            const status = getTicketStatus(ticket)

            const matchesSearch =
                ticket.eventTitle?.toLowerCase().includes(search.toLowerCase()) ||
                ticket.name?.toLowerCase().includes(search.toLowerCase())

            const matchesEvent =
                selectedEvent === "all" ||
                String(ticket.concertId) === selectedEvent

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus

            return matchesSearch && matchesEvent && matchesStatus
        })
    }, [tickets, search, selectedEvent, selectedStatus])

    const totalQuota = tickets.reduce(
        (total, ticket) => total + Number(ticket.quota || 0), 0
    )

    const totalSold = tickets.reduce(
        (total, ticket) => total + Number(ticket.sold || 0), 0
    )

    const totalAvailable = totalQuota - totalSold

    const totalValue = tickets.reduce(
        (total, ticket) =>
            total + (Number(ticket.sold || 0) * Number(ticket.price || 0)),
        0
    )

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-500/20 text-green-400"
            case "Sold Out":
                return "bg-red-500/20 text-red-400"
            case "Upcoming":
                return "bg-blue-500/20 text-blue-400"
            case "Ended":
                return "bg-gray-500/20 text-gray-400"
            default:
                return "bg-gray-500/20 text-gray-400"
        }
    }

    const getBarStyle = (status) => {
        switch (status) {
            case "Sold Out":
                return "bg-red-500"
            case "Upcoming":
                return "bg-blue-500"
            default:
                return "bg-gradient-to-r from-[#E21D8F] to-[#FBADCC]"
        }
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 min-w-0 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                    Tickets
                                </h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    Manage all tickets across your events
                                </p>
                            </div>

                            <button
                                onClick={fetchTickets}
                                disabled={loading}
                                className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                            >
                                Refresh Data
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Tickets</p>
                                <p className="text-2xl font-bold mt-1">
                                    {totalQuota.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Sold / Held</p>
                                <p className="text-2xl font-bold text-blue-400 mt-1">
                                    {totalSold.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Available</p>
                                <p className="text-2xl font-bold text-[#FBADCC] mt-1">
                                    {totalAvailable.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Value Sold / Held</p>
                                <p className="text-xl font-bold text-[#FBADCC] mt-1">
                                    {formatRupiah(totalValue)}
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">

                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none text-sm"
                            >
                                <option value="all">All Events</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.title}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Sold Out">Sold Out</option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Ended">Ended</option>
                            </select>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search tickets..."
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none text-sm flex-1 min-w-[200px]"
                            />

                        </div>

                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">

                            <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                                <div className="col-span-3">Event / Tier</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-2">Event Date</div>
                                <div className="col-span-2 text-center">Sold / Quota</div>
                                <div className="col-span-1 text-center">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {loading ? (
                                <div className="p-12 text-center text-gray-400">
                                    Loading ticket data...
                                </div>
                            ) : error ? (
                                <div className="p-12 text-center">
                                    <p className="text-red-400 mb-4">{error}</p>
                                    <button
                                        onClick={fetchTickets}
                                        className="px-5 py-2 bg-[#FBADCC] text-black rounded-lg text-sm font-semibold"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : filteredTickets.length === 0 ? (
                                <div className="p-12 text-center text-gray-400">
                                    No tickets found
                                </div>
                            ) : (
                                filteredTickets.map((ticket, index) => {
                                    const status = getTicketStatus(ticket)
                                    const sold = Number(ticket.sold || 0)
                                    const quota = Number(ticket.quota || 0)
                                    const percentage = quota > 0
                                        ? Math.min((sold / quota) * 100, 100)
                                        : 0

                                    return (
                                        <div
                                            key={ticket.id}
                                            className={`grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors ${index !== filteredTickets.length - 1
                                                ? "border-b border-[#333]"
                                                : ""
                                                }`}
                                        >
                                            <div className="lg:col-span-3">
                                                <p className="font-medium text-sm">
                                                    {ticket.eventTitle}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {ticket.name}
                                                </p>
                                            </div>

                                            <div className="lg:col-span-2 text-sm font-medium text-[#FBADCC]">
                                                {formatRupiah(ticket.price)}
                                            </div>

                                            <div className="lg:col-span-2 text-sm text-gray-400">
                                                {formatDate(ticket.eventDate)}
                                            </div>

                                            <div className="lg:col-span-2">
                                                <div className="flex flex-col items-start lg:items-center">
                                                    <span className="text-sm font-medium">
                                                        {sold}/{quota}
                                                    </span>
                                                    <div className="w-full max-w-[120px] bg-[#1a1a1a] rounded-full h-1.5 mt-2">
                                                        <div
                                                            className={`${getBarStyle(status)} rounded-full h-1.5`}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-1 lg:text-center">
                                                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(status)}`}>
                                                    {status}
                                                </span>
                                            </div>

                                            <div className="lg:col-span-2 flex lg:justify-end">
                                                <Link
                                                    href={`/organizer/events/${ticket.concertId}/detail`}
                                                    className="px-4 py-2 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors"
                                                >
                                                    Manage
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                        </div>

                        <div className="mt-5 text-sm text-gray-400">
                            Showing {filteredTickets.length} of {tickets.length} tickets
                        </div>

                    </div>
                </div>
            </div>
        </EoGuard>
    )
}