"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function DetailEvent() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div class  Name="flex items-center gap-3">
                                <Link href="/organizer/events" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </Link>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Event Details</h1>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">Nassar Tour 2026 - Complete event information</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/organizer/events/1/edit" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Edit Event
                            </Link>
                            <button className="px-5 py-2.5 bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                Publish Event
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Event Info */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-start gap-6">
                                    <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400" className="w-48 h-32 rounded-xl object-cover"/>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold">Nassar Tour 2026</h2>
                                            <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                                <span>20 Mei 2026 • 19:00</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                                <span>Jakarta International Stadium</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                                </svg>
                                                <span>Concert • Pop</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stage Layout - Catwalk Design */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold">Stage Layout</h2>
                                    <span className="text-xs px-3 py-1 rounded-full bg-[#FBADCC]/20 text-[#FBADCC]">Catwalk Design</span>
                                </div>
                                <div className="bg-[#1a1a1a] rounded-xl p-6">
                                    <div className="relative w-full max-w-3xl mx-auto">
                                        <svg viewBox="0 0 800 450" className="w-full">
                                            {/* Main Stage */}
                                            <rect x="280" y="30" width="240" height="60" rx="6" fill="#E21D8F" opacity="0.9"/>
                                            <text x="400" y="68" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">STAGE</text>
                                            
                                            {/* Catwalk */}
                                            <rect x="360" y="90" width="80" height="180" rx="4" fill="#E21D8F" opacity="0.6"/>
                                            <text x="400" y="150" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">CATWALK</text>
                                            
                                            {/* VIP - Front Center (near stage) */}
                                            <rect x="340" y="115" width="120" height="35" rx="6" fill="#9b59b6" opacity="0.7"/>
                                            <text x="400" y="137" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">VIP</text>
                                            
                                            {/* Gold - Left & Right of Catwalk */}
                                            <rect x="180" y="150" width="140" height="40" rx="6" fill="#f39c12" opacity="0.6"/>
                                            <text x="250" y="175" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">GOLD</text>
                                            
                                            <rect x="480" y="150" width="140" height="40" rx="6" fill="#f39c12" opacity="0.6"/>
                                            <text x="550" y="175" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">GOLD</text>
                                            
                                            {/* Silver - Back Area */}
                                            <rect x="120" y="230" width="560" height="45" rx="6" fill="#bdc3c7" opacity="0.4"/>
                                            <text x="400" y="258" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">SILVER</text>

                                            {/* Arena Floor */}
                                            <rect x="80" y="300" width="640" height="35" rx="4" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4"/>
                                            <text x="400" y="323" fill="#555" fontSize="11" textAnchor="middle">ARENA FLOOR</text>

                                            {/* Position Labels */}
                                            <text x="50" y="70" fill="#666" fontSize="11">FRONT</text>
                                            <text x="50" y="260" fill="#666" fontSize="11">BACK</text>
                                            <text x="730" y="70" fill="#666" fontSize="11">FRONT</text>
                                            <text x="730" y="260" fill="#666" fontSize="11">BACK</text>

                                            {/* Section Labels with arrows */}
                                            <text x="100" y="140" fill="#9b59b6" fontSize="10">★ VIP Area</text>
                                            <text x="100" y="175" fill="#f39c12" fontSize="10">◄ Gold Left</text>
                                            <text x="680" y="175" fill="#f39c12" fontSize="10">Gold Right ►</text>
                                            <text x="100" y="260" fill="#bdc3c7" fontSize="10">◆ Silver Area</text>
                                        </svg>
                                    </div>
                                    
                                    <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-[#E21D8F] opacity-90"></div>
                                            <span className="text-gray-300">Stage & Catwalk</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-[#9b59b6] opacity-70"></div>
                                            <span className="text-gray-300">VIP (Front Center)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-[#f39c12] opacity-60"></div>
                                            <span className="text-gray-300">Gold (Left & Right)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-[#bdc3c7] opacity-40"></div>
                                            <span className="text-gray-300">Silver (Back)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ticket Sections with Position Info */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Ticket Sections</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333] hover:border-[#9b59b6] transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-lg text-purple-400">VIP</h3>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Available</span>
                                        </div>
                                        <p className="text-xs text-gray-500">📍 Front Center - Near Stage</p>
                                        <p className="text-2xl font-bold text-[#FBADCC] mt-2">Rp 1.500.000</p>
                                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                                            <span>Quota: 100</span>
                                            <span>Sold: 78</span>
                                        </div>
                                        <div className="w-full bg-[#272727] rounded-full h-1.5 mt-2">
                                            <div className="bg-gradient-to-r from-[#9b59b6] to-[#E21D8F] rounded-full h-1.5" style={{width: "78%"}}></div>
                                        </div>
                                        <Link href="/organizer/events/1/tickets" className="w-full mt-3 px-4 py-2 bg-[#272727] rounded-lg text-xs text-center hover:bg-[#333] transition-colors block">
                                            Manage
                                        </Link>
                                    </div>

                                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333] hover:border-[#f39c12] transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-lg text-yellow-400">Gold</h3>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Available</span>
                                        </div>
                                        <p className="text-xs text-gray-500">📍 Left & Right of Catwalk</p>
                                        <p className="text-2xl font-bold text-[#FBADCC] mt-2">Rp 1.000.000</p>
                                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                                            <span>Quota: 200</span>
                                            <span>Sold: 145</span>
                                        </div>
                                        <div className="w-full bg-[#272727] rounded-full h-1.5 mt-2">
                                            <div className="bg-gradient-to-r from-[#f39c12] to-[#FBADCC] rounded-full h-1.5" style={{width: "72%"}}></div>
                                        </div>
                                        <Link href="/organizer/events/1/tickets" className="w-full mt-3 px-4 py-2 bg-[#272727] rounded-lg text-xs text-center hover:bg-[#333] transition-colors block">
                                            Manage
                                        </Link>
                                    </div>

                                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333] hover:border-[#bdc3c7] transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-lg text-gray-300">Silver</h3>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Available</span>
                                        </div>
                                        <p className="text-xs text-gray-500">📍 Back Area</p>
                                        <p className="text-2xl font-bold text-[#FBADCC] mt-2">Rp 750.000</p>
                                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                                            <span>Quota: 300</span>
                                            <span>Sold: 234</span>
                                        </div>
                                        <div className="w-full bg-[#272727] rounded-full h-1.5 mt-2">
                                            <div className="bg-gradient-to-r from-[#bdc3c7] to-[#FBADCC] rounded-full h-1.5" style={{width: "78%"}}></div>
                                        </div>
                                        <Link href="/organizer/events/1/tickets" className="w-full mt-3 px-4 py-2 bg-[#272727] rounded-lg text-xs text-center hover:bg-[#333] transition-colors block">
                                            Manage
                                        </Link>
                                    </div>
                                </div>
                                <Link href="/organizer/events/1/tickets" className="mt-4 px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
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
                                        <span className="font-bold">600</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Sold</span>
                                        <span className="font-bold text-green-400">457</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Available</span>
                                        <span className="font-bold text-[#FBADCC]">143</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Revenue</span>
                                        <span className="font-bold text-[#FBADCC]">Rp 456.500.000</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <Link href="/organizer/events/1/edit" className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                        </svg>
                                        Edit Event
                                    </Link>
                                    <Link href="/organizer/events/1/tickets" className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                        </svg>
                                        Manage Tickets
                                    </Link>
                                    <Link href="/organizer/attendees" className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                        </svg>
                                        View Attendees
                                    </Link>
                                    <button className="w-full px-4 py-2.5 bg-red-500/10 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
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
    )
}