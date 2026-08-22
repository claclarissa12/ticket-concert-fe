"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

export default function SuperAdminApproveEvent() {
    const [activeTab, setActiveTab] = useState("pending")
    const [searchTerm, setSearchTerm] = useState("")

    const events = [
        { id: 1, name: "Nassar Tour 2026", organizer: "Event Organizer Corp", email: "info@eventorg.com", date: "20 Mei 2026", location: "Jakarta", category: "Concert", status: "Pending", submitted: "2 days ago", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" },
        { id: 2, name: "Electronic Fest 2026", organizer: "Festival Pro", email: "hello@festivalpro.com", date: "25 Mei 2026", location: "Bandung", category: "Festival", status: "Pending", submitted: "5 days ago", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
        { id: 3, name: "Jazz Night", organizer: "Music Lounge", email: "info@musiclounge.com", date: "30 Mei 2026", location: "Surabaya", category: "Concert", status: "Pending", submitted: "1 week ago", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200" },
        { id: 4, name: "Rock Revolution", organizer: "Rock Empire", email: "contact@rockempire.com", date: "5 Juni 2026", location: "Yogyakarta", category: "Concert", status: "Approved", submitted: "2 weeks ago", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" },
        { id: 5, name: "Pop Music Festival", organizer: "Pop Culture", email: "info@popculture.com", date: "10 Juni 2026", location: "Jakarta", category: "Festival", status: "Rejected", submitted: "3 weeks ago", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-500/20 text-yellow-400"
            case "Approved": return "bg-green-500/20 text-green-400"
            case "Rejected": return "bg-red-500/20 text-red-400"
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
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Terima Ajuan Event</h1>
                            <p className="text-gray-400 text-sm mt-1">Approve or reject event submissions</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                            <button
                                onClick={() => setActiveTab("pending")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "pending" ? "bg-[#E21D8F] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setActiveTab("approved")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "approved" ? "bg-[#E21D8F] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Approved
                            </button>
                            <button
                                onClick={() => setActiveTab("rejected")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "rejected" ? "bg-[#E21D8F] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Rejected
                            </button>
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#E21D8F] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                All
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredEvents.map((event) => (
                            <div key={event.id} className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333] hover:border-[#FBADCC]/30 transition-all hover:scale-[1.01]">
                                <div className="flex gap-4 p-4">
                                    <img src={event.image} className="w-32 h-32 rounded-xl object-cover flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-lg font-bold truncate">{event.name}</h3>
                                            <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(event.status)}`}>
                                                {event.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{event.organizer}</p>
                                        <p className="text-xs text-gray-500">{event.email}</p>
                                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">📅 {event.date}</span>
                                            <span className="flex items-center gap-1">📍 {event.location}</span>
                                            <span className="flex items-center gap-1">🎵 {event.category}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Submitted {event.submitted}</p>
                                        {event.status === "Pending" && (
                                            <div className="flex gap-2 mt-3">

                                                <a href="/admin/approve/[id]">
                                                    <button className="px-4 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                                        Detail
                                                    </button>
                                                </a>
                                            </div>
                                        )}
                                        {event.status !== "Pending" && (
                                            <button className="mt-3 px-4 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                                View Detail
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-semibold mb-2">No events found</h3>
                            <p className="text-gray-400">No events match your current filter</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing {filteredEvents.length} of {events.length} events</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                1
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                2
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}