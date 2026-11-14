"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

export default function SuperAdminApproveEvent() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const events = [
        { id: 1, title: "Konser Melodi Senja", organizer: "Admin", email: "admin@gmail.com", date: "01 Des 2026", location: "Jakarta", status: "draft", banner_url: "https://images.unsplash.com/photo-1540039155732-684736882273?w=200", created_at: "2026-01-01" },
        { id: 2, title: "Neon Party 2026", organizer: "Admin", email: "admin@gmail.com", date: "25 Nov 2026", location: "Bandung", status: "published", banner_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200", created_at: "2026-01-02" },
        { id: 3, title: "Rock In Solo", organizer: "Admin", email: "admin@gmail.com", date: "15 Okt 2026", location: "Solo", status: "published", banner_url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200", created_at: "2026-01-03" },
        { id: 4, title: "K-Pop Festival Indonesia", organizer: "Admin", email: "admin@gmail.com", date: "20 Sep 2026", location: "Jakarta", status: "cancelled", banner_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200", created_at: "2026-01-04" },
    ]

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

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && event.status === activeTab
    })

    return (
        <AdminGuard>

            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Ajuan Event</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage event submissions</p>
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
                                    onClick={() => setActiveTab("all")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveTab("draft")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "draft" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    Draft
                                </button>
                                <button
                                    onClick={() => setActiveTab("published")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "published" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    Published
                                </button>
                                <button
                                    onClick={() => setActiveTab("cancelled")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "cancelled" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    Cancelled
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
                                        <img src={event.banner_url} className="w-32 h-32 rounded-xl object-cover flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-lg font-bold truncate">{event.title}</h3>
                                                <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(event.status)}`}>
                                                    {getStatusLabel(event.status)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">{event.organizer}</p>
                                            <p className="text-xs text-gray-500">{event.email}</p>
                                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path><path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path>
                                                    </svg>{event.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" >
                                                        <path d="M16 10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4m-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2"></path><path d="M11.42 21.81c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8s-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82M12 4c3.31 0 6 2.69 6 6 .02 4.44-4.39 8.43-6 9.74-1.61-1.31-6.02-5.29-6-9.74 0-3.31 2.69-6 6-6"></path>
                                                    </svg> {event.location}</span>
                                            </div>
                                            <div className="flex justify-between gap-2 mt-3">
                                                <Link href={`/admin/approve/${event.id}`}>
                                                    <button className="px-4 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                                        Detail
                                                    </button>
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-1">Submitted {event.created_at}</p>
                                            </div>
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
                                <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                    1
                                </button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}