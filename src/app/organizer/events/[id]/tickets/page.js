"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"
import { useState } from "react"

export default function ManageTickets() {
    const [activeTab, setActiveTab] = useState("all")

    const ticketTiers = [
        { id: 1, name: "VIP", price: "Rp 1.500.000", quota: 100, sold: 78, status: "Active", color: "from-purple-500 to-pink-500" },
        { id: 2, name: "Gold", price: "Rp 1.000.000", quota: 200, sold: 145, status: "Active", color: "from-yellow-500 to-orange-500" },
        { id: 3, name: "Silver", price: "Rp 750.000", quota: 300, sold: 234, status: "Active", color: "from-gray-400 to-gray-500" },
        
    ]

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <Link href="/organizer/events" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </Link>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manage Tickets</h1>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">Nassar Tour 2026 - Manage ticket tiers and pricing</p>
                        </div>
                        <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Add Ticket Tier
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[#272727] rounded-2xl border border-[#333] overflow-hidden">
                                <div className="flex border-b border-[#333]">
                                    {["All", "Active", "Sold Out", "Upcoming"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab.toLowerCase())}
                                            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                                                activeTab === tab.toLowerCase()
                                                    ? "border-[#FBADCC] text-[#FBADCC]"
                                                    : "border-transparent text-gray-400 hover:text-white"
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-6 space-y-4">
                                    {ticketTiers.map((ticket) => (
                                        <div key={ticket.id} className="bg-[#1a1a1a] rounded-xl p-5 hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ticket.color} flex items-center justify-center text-black font-bold text-sm`}>
                                                        {ticket.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{ticket.name}</h3>
                                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                                            <span>Quota: {ticket.quota}</span>
                                                            <span>•</span>
                                                            <span>Sold: {ticket.sold}</span>
                                                            <span>•</span>
                                                            <span className="text-[#FBADCC] font-medium">{ticket.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-32">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span className="text-gray-400">Available</span>
                                                            <span className="text-white">{ticket.quota - ticket.sold}</span>
                                                        </div>
                                                        <div className="w-full bg-[#272727] rounded-full h-2">
                                                            <div 
                                                                className="bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-full h-2 transition-all"
                                                                style={{ width: `${(ticket.sold / ticket.quota) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="p-2 bg-[#272727] rounded-lg hover:bg-[#333] transition-colors">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                                            </svg>
                                                        </button>
                                                        <button className="p-2 bg-[#272727] rounded-lg hover:bg-red-500/20 transition-colors">
                                                            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                            <p className="text-xl font-bold">1,500</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <div>
                                            <p className="text-sm text-gray-400">Sold</p>
                                            <p className="text-xl font-bold text-green-400">1,225</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <div>
                                            <p className="text-sm text-gray-400">Available</p>
                                            <p className="text-xl font-bold text-[#FBADCC]">275</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-[#FBADCC]/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#FBADCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                        </svg>
                                        Export Ticket Data
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
                                        </svg>
                                        Bulk Update Prices
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        Set Time-Based Pricing
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Discount Codes</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl">
                                        <div>
                                            <p className="font-medium text-sm">WELCOME10</p>
                                            <p className="text-xs text-gray-400">10% off • 50 used</p>
                                        </div>
                                        <span className="text-xs text-green-400 font-medium">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl">
                                        <div>
                                            <p className="font-medium text-sm">EARLYBIRD</p>
                                            <p className="text-xs text-gray-400">20% off • 120 used</p>
                                        </div>
                                        <span className="text-xs text-yellow-400 font-medium">Ending Soon</span>
                                    </div>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333]">
                                        + Add Discount Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}