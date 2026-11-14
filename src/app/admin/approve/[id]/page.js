"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SuperAdminDetailAjuan() {
    const params = useParams()
    const id = params.id

    const eventData = {
        id: 1,
        title: "Konser Melodi Senja",
        organizer: "Admin",
        email: "admin@gmail.com",
        phone: "+62 812 3456 7890",
        date: "01 Des 2026 • 19:00",
        venue: "Hall A",
        location: "Jakarta",
        status: "draft",
        submitted: "2026-01-01",
        description: "Konser akustik intim membawakan lagu-lagu romantis.",
        banner_url: "https://images.unsplash.com/photo-1540039155732-684736882273?w=400",
        ticketTiers: [
            { name: "VIP", price: 1500000, quota: 100, sold: 0 },
            { name: "Regular", price: 750000, quota: 500, sold: 0 },
            { name: "Festival", price: 500000, quota: 1000, sold: 0 },
        ],
        totalTickets: 1600,
        ticketsSold: 0,
        totalRevenue: 0
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "draft": return "bg-yellow-500/20 text-yellow-400"
            case "published": return "bg-green-500/20 text-green-400"
            case "cancelled": return "bg-red-500/20 text-red-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case "draft": return "Draft"
            case "published": return "Published"
            case "cancelled": return "Cancelled"
            default: return status
        }
    }

    return (
        <AdminGuard>

            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3">
                                    <Link href="/admin/approve" className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </Link>
                                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Event Details</h1>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{eventData.title}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {eventData.status === "draft" && (
                                    <>
                                        <button className="px-5 py-2.5 bg-green-500/20 text-green-400 rounded-xl flex gap-2 font-semibold hover:bg-green-500/30 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" >
                                                <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10m0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8"></path><path d="M10 16c-.26 0-.51-.1-.71-.29l-3-3L7.7 11.3l2.29 2.29 5.29-5.29 1.41 1.41-6 6c-.2.2-.45.29-.71.29Z"></path>
                                            </svg>
                                            <p className="text-sm">Publish</p>
                                        </button>
                                        <button className="px-5 py-2.5 bg-red-500/20 text-red-400 rounded-xl flex gap-2 font-semibold hover:bg-red-500/30 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" >
                                                <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                                            </svg>
                                            <p className="text-sm">Cancel</p>
                                        </button>
                                    </>
                                )}
                                <Link href="/admin/approve" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Back
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-start gap-6">
                                        <img src={eventData.banner_url} className="w-40 h-32 rounded-xl object-cover flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h2 className="text-2xl font-bold">{eventData.title}</h2>
                                                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(eventData.status)}`}>
                                                    {getStatusLabel(eventData.status)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">{eventData.organizer}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                                <div>
                                                    <p className="text-xs text-gray-400">Date & Time</p>
                                                    <p className="text-sm">{eventData.date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400">Location</p>
                                                    <p className="text-sm">{eventData.venue}, {eventData.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-3">Description</h2>
                                    <p className="text-gray-300">{eventData.description}</p>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-3">Ticket Tiers</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {eventData.ticketTiers.map((tier, index) => (
                                            <div key={index} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
                                                <h3 className="font-bold text-lg" style={{
                                                    color: tier.name === "VIP" ? "#9b59b6" :
                                                        tier.name === "Regular" ? "#f39c12" : "#bdc3c7"
                                                }}>
                                                    {tier.name}
                                                </h3>
                                                <p className="text-2xl font-bold text-[#FBADCC]">{formatPrice(tier.price)}</p>
                                                <div className="flex justify-between text-sm text-gray-400 mt-2">
                                                    <span>Quota: {tier.quota}</span>
                                                    <span>Sold: {tier.sold}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Event Statistics</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Total Tickets</span>
                                            <span className="font-bold">{eventData.totalTickets}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Tickets Sold</span>
                                            <span className="font-bold">{eventData.ticketsSold}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Total Revenue</span>
                                            <span className="font-bold text-[#FBADCC]">{formatPrice(eventData.totalRevenue)}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Submitted</span>
                                            <span className="font-bold">{eventData.submitted}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Organizer</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl">
                                            <div className="w-10 h-10 rounded-full bg-[#FBADCC] flex items-center justify-center text-black font-bold">
                                                {eventData.organizer.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{eventData.organizer}</p>
                                                <p className="text-xs text-gray-400">{eventData.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Phone</span>
                                            <span className="text-sm">{eventData.phone}</span>
                                        </div>
                                        <Link href="/admin/approve-eo/1" className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center">
                                            View Organizer Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}