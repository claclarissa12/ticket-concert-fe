"use client"

import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function DetailEvent() {
    const event = {
        id: 1,
        title: "Konser Melodi Senja",
        date: "01 Desember 2026 • 19:00",
        venue: "Hall A",
        location: "Jakarta",
        banner_url: "https://images.unsplash.com/photo-1540039155732-684736882273?q=80&w=1000&auto=format&fit=crop",
        status: "published"
    }

    const ticketTiers = [
        { name: "VIP", price: "Rp 1.500.000", quota: 100, sold: 0, color: "text-purple-400", hover: "hover:border-[#9b59b6]", bar: "bg-[#FBADCC]" },
        { name: "Regular", price: "Rp 750.000", quota: 500, sold: 0, color: "text-yellow-400", hover: "hover:border-[#f39c12]", bar: "bg-gradient-to-r from-[#f39c12] to-[#FBADCC]" },
        { name: "Festival", price: "Rp 500.000", quota: 1000, sold: 0, color: "text-gray-300", hover: "hover:border-[#bdc3c7]", bar: "bg-gradient-to-r from-[#bdc3c7] to-[#FBADCC]" }
    ]

    return (
        <EoGuard>

            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3">
                                    <Link href="/organizer/events" className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </Link>
                                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Event Details</h1>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{event.title} - Complete event information</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link href={`/organizer/events/${event.id}/edit`} className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Edit Event
                                </Link>
                                <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                    Publish Event
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-start gap-6">
                                        <img src={event.banner_url} alt={event.title} className="w-48 h-32 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl font-bold">{event.title}</h2>
                                                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>{event.venue}, {event.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>Concert • Akustik</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold">Stage Layout</h2>
                                        <span className="text-xs px-3 py-1 rounded-full bg-[#FBADCC]/20 text-[#FBADCC]">Catwalk Design</span>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Ticket Sections</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {ticketTiers.map((tier, idx) => (
                                            <div key={idx} className={`bg-[#1a1a1a] rounded-xl p-4 border border-[#333] ${tier.hover} transition-colors`}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className={`font-bold text-lg ${tier.color}`}>{tier.name}</h3>
                                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Available</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="gray" viewBox="0 0 24 24">
                                                        <path d="M16 10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4m-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2"></path><path d="M11.42 21.81c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8s-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82M12 4c3.31 0 6 2.69 6 6 .02 4.44-4.39 8.43-6 9.74-1.61-1.31-6.02-5.29-6-9.74 0-3.31 2.69-6 6-6"></path>
                                                    </svg>
                                                    <p className="text-xs text-gray-500"> Back Area</p>
                                                </div>
                                                <p className="text-2xl font-bold text-[#FBADCC] mt-2">{tier.price}</p>
                                                <div className="flex justify-between text-sm text-gray-400 mt-2">
                                                    <span>Quota: {tier.quota}</span>
                                                    <span>Sold: {tier.sold}</span>
                                                </div>
                                                <div className="w-full bg-[#272727] rounded-full h-1.5 mt-2">
                                                    <div className={`${tier.bar} rounded-full h-1.5`} style={{ width: `${(tier.sold / tier.quota) * 100}%` }}></div>
                                                </div>
                                                <Link href={`/organizer/events/${event.id}/tickets`} className="w-full mt-3 px-4 py-2 bg-[#272727] rounded-lg text-xs text-center hover:bg-[#333] transition-colors block">
                                                    Manage
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href={`/organizer/events/${event.id}/tickets`} className="mt-4 px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Manage All Tickets
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Event Stats</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Total Tickets</span>
                                            <span className="font-bold">1.600</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Sold</span>
                                            <span className="font-bold text-green-400">0</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Available</span>
                                            <span className="font-bold text-[#FBADCC]">1.600</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Revenue</span>
                                            <span className="font-bold text-[#FBADCC]">Rp 0</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                    <div className="space-y-3">
                                        <Link href={`/organizer/events/${event.id}/edit`} className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                            Edit Event
                                        </Link>
                                        <Link href={`/organizer/events/${event.id}/tickets`} className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                            </svg>
                                            Manage Tickets
                                        </Link>
                                        <Link href="/organizer/attendees" className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            View Attendees
                                        </Link>
                                        <button className="w-full px-4 py-2.5 bg-red-500/10 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete Event
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