"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SuperAdminDetailAjuan() {
    const params = useParams()
    const id = params.id

    // Data dummy - nanti diganti dengan fetch dari API
    const eventData = {
        id: 1,
        name: "Nassar Tour 2026",
        organizer: "Event Organizer Corp",
        email: "info@eventorg.com",
        phone: "+62 812 3456 7890",
        date: "20 Mei 2026",
        time: "19:00 WIB",
        location: "Jakarta International Stadium",
        address: "Jl. Margonda Raya No. 45, Depok, Jawa Barat",
        category: "Concert",
        genre: "Pop",
        status: "Pending",
        submitted: "2 days ago",
        description: "Nassar Tour 2026 is the biggest concert event of the year featuring top artists from around the world. Join us for an unforgettable night of music and entertainment.",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",
        capacity: 1000,
        price: "Rp 500.000",
        ticketsSold: 0,
        totalRevenue: "Rp 0",
        stageLayout: "Catwalk Design",
        ticketTiers: [
            { name: "VIP", price: "Rp 1.500.000", quota: 100, sold: 0 },
            { name: "Gold", price: "Rp 1.000.000", quota: 200, sold: 0 },
            { name: "Silver", price: "Rp 750.000", quota: 300, sold: 0 },
        ],
        documents: [
            { name: "Event Poster", file: "poster.jpg", size: "2.4 MB" },
            { name: "Stage Layout", file: "stage_layout.pdf", size: "1.8 MB" },
            { name: "Event Proposal", file: "proposal.pdf", size: "3.2 MB" },
        ],
        activityLog: [
            { action: "Event submitted for approval", date: "2 days ago" },
            { action: "Documents uploaded", date: "3 days ago" },
            { action: "Event created", date: "5 days ago" },
        ]
    }

    const getStatusColor = (status) => {
        switch(status) {
            case "Pending": return "bg-yellow-500/20 text-yellow-400"
            case "Approved": return "bg-green-500/20 text-green-400"
            case "Rejected": return "bg-red-500/20 text-red-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <Link href="/admin/approve" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </Link>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Event Submission Details</h1>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{eventData.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {eventData.status === "Pending" && (
                                <>
                                    <button className="px-5 py-2.5 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/30 transition-colors">
                                        ✅ Approve
                                    </button>
                                    <button className="px-5 py-2.5 bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/30 transition-colors">
                                        ❌ Reject
                                    </button>
                                </>
                            )}
                            <Link href="/admin/approve" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Back
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Event Info */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-start gap-6">
                                    <img src={eventData.image} className="w-40 h-32 rounded-xl object-cover flex-shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-2xl font-bold">{eventData.name}</h2>
                                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(eventData.status)}`}>
                                                {eventData.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{eventData.organizer}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Date & Time</p>
                                                <p className="text-sm">{eventData.date} • {eventData.time}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Location</p>
                                                <p className="text-sm">{eventData.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Category</p>
                                                <p className="text-sm">{eventData.category} • {eventData.genre}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Stage Layout</p>
                                                <p className="text-sm">{eventData.stageLayout}</p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-xs text-gray-400">Address</p>
                                                <p className="text-sm">{eventData.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-3">Description</h2>
                                <p className="text-gray-300">{eventData.description}</p>
                            </div>

                            {/* Ticket Tiers */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-3">Ticket Tiers</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {eventData.ticketTiers.map((tier, index) => (
                                        <div key={index} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
                                            <h3 className="font-bold text-lg" style={{ 
                                                color: tier.name === "VIP" ? "#9b59b6" : 
                                                       tier.name === "Gold" ? "#f39c12" : "#bdc3c7" 
                                            }}>
                                                {tier.name}
                                            </h3>
                                            <p className="text-2xl font-bold text-[#FBADCC]">{tier.price}</p>
                                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                                                <span>Quota: {tier.quota}</span>
                                                <span>Sold: {tier.sold}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-3">Documents</h2>
                                <div className="space-y-3">
                                    {eventData.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                </svg>
                                                <div>
                                                    <p className="text-sm font-medium">{doc.name}</p>
                                                    <p className="text-xs text-gray-400">{doc.file} • {doc.size}</p>
                                                </div>
                                            </div>
                                            <button className="px-3 py-1.5 bg-[#272727] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                                View
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Statistics</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Capacity</span>
                                        <span className="font-bold">{eventData.capacity}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Ticket Price</span>
                                        <span className="font-bold text-[#FBADCC]">{eventData.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Tickets Sold</span>
                                        <span className="font-bold">{eventData.ticketsSold}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Total Revenue</span>
                                        <span className="font-bold text-[#FBADCC]">{eventData.totalRevenue}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Submitted</span>
                                        <span className="font-bold">{eventData.submitted}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Organizer Info */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Organizer</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] flex items-center justify-center text-black font-bold">
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
    )
}