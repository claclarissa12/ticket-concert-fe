"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function OrganizerEvents() {
    const eventTemplate = { 
        id: 1, 
        title: "Nassar Tour 2026", 
        description: "Konser tur Nassar keliling Indonesia", 
        venue: "Istora Senayan", 
        location: "Jakarta", 
        date: "2026-05-20T19:00:00", 
        banner_url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400", 
        status: "published", 
        created_by: 1, 
        created_at: "2026-01-01T00:00:00",
        tickets: 234, 
        sold: 156, 
        revenue: "Rp 234.000.000" 
    }

    const events = Array(6).fill(eventTemplate).map((event, index) => ({
        ...event,
        id: index + 1
    }))

    const getStatusColor = (status) => {
        switch(status) {
            case "published": return "bg-green-500/20 text-green-400"
            case "draft": return "bg-yellow-500/20 text-yellow-400"
            case "cancelled": return "bg-red-500/20 text-red-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    const formatStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
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
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Cancelled</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>Sort by Date</option>
                            <option>Sort by Name</option>
                            <option>Sort by Revenue</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="bg-[#272727] rounded-2xl overflow-hidden hover:bg-[#2f2f2f] transition-all hover:scale-[1.02] border border-[#333] group">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                                    <div className="absolute top-3 right-3">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(event.status)}`}>
                                            {formatStatus(event.status)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                                    <div className="space-y-2 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                            <span>{formatDate(event.date)}</span>
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