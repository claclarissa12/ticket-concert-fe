"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

export default function SuperAdminEvents() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const events = [
        { id: 1, name: "Nassar Tour 2026", organizer: "Event Organizer Corp", date: "20 Mei 2026", location: "Jakarta", category: "Concert", status: "Active", tickets: 600, sold: 457, revenue: "Rp 456.500.000", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400" },
        { id: 2, name: "Electronic Fest 2026", organizer: "Festival Pro", date: "25 Mei 2026", location: "Bandung", category: "Festival", status: "Active", tickets: 400, sold: 289, revenue: "Rp 289.000.000", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
        { id: 3, name: "Jazz Night", organizer: "Music Lounge", date: "30 Mei 2026", location: "Surabaya", category: "Concert", status: "Upcoming", tickets: 150, sold: 78, revenue: "Rp 78.000.000", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400" },
        { id: 4, name: "Rock Revolution", organizer: "Rock Empire", date: "5 Juni 2026", location: "Yogyakarta", category: "Concert", status: "Upcoming", tickets: 300, sold: 120, revenue: "Rp 120.000.000", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400" },
        { id: 5, name: "Pop Music Festival", organizer: "Pop Culture", date: "10 Juni 2026", location: "Jakarta", category: "Festival", status: "Draft", tickets: 250, sold: 0, revenue: "Rp 0", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
        { id: 6, name: "EDM Night", organizer: "Electronic Dreams", date: "15 Juni 2026", location: "Bali", category: "Festival", status: "Active", tickets: 500, sold: 312, revenue: "Rp 312.000.000", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400" },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "Active": return "bg-green-500/20 text-green-400"
            case "Upcoming": return "bg-blue-500/20 text-blue-400"
            case "Draft": return "bg-yellow-500/20 text-yellow-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && event.status === activeTab
    })

    return (
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
                            <button onClick={() => setActiveTab("Active")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Active" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Active</button>
                            <button onClick={() => setActiveTab("Upcoming")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Upcoming" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Upcoming</button>
                            <button onClick={() => setActiveTab("Draft")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Draft" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Draft</button>
                        </div>
                        <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]" />
                    </div>

                    <div className="divide-y divide-[#222] border-y border-[#222]">
                        {filteredEvents.map(event => {
                            const pct = Math.round((event.sold / event.tickets) * 100)
                            return (
                                <div key={event.id} className="py-5 hover:bg-[#181818] transition-colors -mx-3 px-3 rounded-lg">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <img
                                            src={event.image}
                                            alt={event.name}
                                            className="w-full sm:w-32 h-32 rounded-lg object-cover flex-shrink-0 grayscale-[30%]"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="font-medium truncate">{event.name}</h3>
                                                    <p className="text-xs text-neutral-500 mt-0.5">
                                                        {event.organizer} · {event.category}
                                                    </p>
                                                </div>
                                                <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${getStatusColor(event.status)}`}>
                                                    {event.status}
                                                </span>
                                            </div>

                                            <p className="text-xs text-neutral-500 mt-2">
                                                {event.date} · {event.location}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-xs text-neutral-400">
                                                <span>
                                                    Tiket terjual{" "}
                                                    <span className="text-white font-medium">{event.sold}</span>
                                                    <span className="text-neutral-600">/{event.tickets}</span>
                                                </span>
                                                <span>
                                                    Revenue{" "}
                                                    <span className="text-white font-medium">{event.revenue}</span>
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
                                                <button className="text-xs px-3 py-1.5 rounded-md border border-[#2a2a2a] hover:border-[#444] hover:bg-[#1f1f1f] transition-colors">
                                                    Detail
                                                </button>
                                                <button className="text-xs px-3 py-1.5 rounded-md border border-transparent text-neutral-500 hover:text-red-400 hover:border-red-400/30 transition-colors">
                                                    Suspend
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-neutral-500 text-sm">Tidak ada event yang cocok dengan filter kamu.</p>
                        </div>
                    )}
                    {filteredEvents.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold mb-2">No events found</h3>
                            <p className="text-gray-400">No events match your current filter</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing {filteredEvents.length} of {events.length} events</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Previous</button>
                            <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">1</button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">2</button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}