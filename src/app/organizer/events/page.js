"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function OrganizerEvents() {
    const events = [
        { id: 1, name: "Nassar Tour 2026", date: "20 Mei 2026", location: "Jakarta", tickets: 234, sold: 156, status: "Active", revenue: "Rp 234.000.000", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400" },
        { id: 2, name: "Electronic Fest 2026", date: "25 Mei 2026", location: "Bandung", tickets: 400, sold: 89, status: "Draft", revenue: "Rp 89.000.000", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
        { id: 3, name: "Jazz Night", date: "30 Mei 2026", location: "Surabaya", tickets: 150, sold: 78, status: "Active", revenue: "Rp 78.000.000", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400" },
        { id: 4, name: "Rock Revolution", date: "5 Juni 2026", location: "Yogyakarta", tickets: 300, sold: 234, status: "Active", revenue: "Rp 350.000.000", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400" },
        { id: 5, name: "Pop Music Festival", date: "10 Juni 2026", location: "Jakarta", tickets: 250, sold: 45, status: "Upcoming", revenue: "Rp 45.000.000", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" },
        { id: 6, name: "EDM Night", date: "15 Juni 2026", location: "Bali", tickets: 500, sold: 312, status: "Active", revenue: "Rp 500.000.000", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400" },
    ]

    const getStatusColor = (status) => {
        switch(status) {
            case "Active": return "bg-green-500/20 text-green-400"
            case "Draft": return "bg-yellow-500/20 text-yellow-400"
            case "Upcoming": return "bg-blue-500/20 text-blue-400"
            case "Ended": return "bg-gray-500/20 text-gray-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Events</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage all your events</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/organizer/create" className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                + Create Event
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm w-full sm:w-64"
                        /> 
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Ended</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>Sort by Date</option>
                            <option>Sort by Name</option>
                            <option>Sort by Revenue</option>
                        </select>
                    </div>

                    {/* Grid View Only */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-[#272727] rounded-2xl overflow-hidden hover:bg-[#2f2f2f] transition-all hover:scale-[1.02] border border-[#333] group">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                    <div className="absolute top-3 right-3">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold mb-1">{event.name}</h3>
                                    <div className="space-y-2 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#333]">
                                        <div>
                                            <p className="text-xs text-gray-400">Tickets Sold</p>
                                            <p className="font-bold">{event.sold}/{event.tickets}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Revenue</p>
                                            <p className="font-bold text-[#FBADCC]">{event.revenue}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Link href={`/organizer/events/${event.id}/detail`} className="flex-1 text-center px-4 py-2 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#333] transition-colors">
                                            Detail
                                        </Link>
                                        <Link href={`/organizer/events/${event.id}/edit`} className="flex-1 text-center px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all">
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}