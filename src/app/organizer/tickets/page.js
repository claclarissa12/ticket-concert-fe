"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function TicketsPage() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tickets</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage all tickets across events</p>
                        </div>
                        <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Export Data
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Total Tickets</p>
                            <p className="text-2xl font-bold">1,500</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Sold</p>
                            <p className="text-2xl font-bold text-blue-400">1,225</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Available</p>
                            <p className="text-2xl font-bold text-[#FBADCC]">275</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Revenue</p>
                            <p className="text-2xl font-bold text-[#FBADCC]">Rp 4.2B</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Events</option>
                            <option>Nassar Tour 2026</option>
                            <option>Electronic Fest 2026</option>
                            <option>Jazz Night</option>
                            <option>Rock Revolution</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Sold Out</option>
                            <option>Upcoming</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder="Search tickets..." 
                            className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                        />
                    </div>

                    <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                            <div className="col-span-3">Event / Tier</div>
                            <div className="col-span-2">Price</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2 text-center">Sold / Quota</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        
                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-3">
                                <div>
                                    <p className="font-medium text-sm">Nassar Tour 2026</p>
                                    <p className="text-xs text-gray-400">VIP</p>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-[#FBADCC]">Rp 1.500.000</div>
                            <div className="col-span-2 text-sm text-gray-400">20 Mei 2026</div>
                            <div className="col-span-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium">78/100</span>
                                    <div className="w-full max-w-[100px] bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                                        <div className="bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-full h-1.5" style={{ width: "78%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <Link href="/organizer/events/1/tickets" className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Manage
                                </Link>
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-3">
                                <div>
                                    <p className="font-medium text-sm">Nassar Tour 2026</p>
                                    <p className="text-xs text-gray-400">Gold</p>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-[#FBADCC]">Rp 1.000.000</div>
                            <div className="col-span-2 text-sm text-gray-400">20 Mei 2026</div>
                            <div className="col-span-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium">145/200</span>
                                    <div className="w-full max-w-[100px] bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                                        <div className="bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-full h-1.5" style={{ width: "72%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <Link href="/organizer/events/1/tickets" className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Manage
                                </Link>
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-3">
                                <div>
                                    <p className="font-medium text-sm">Jazz Night</p>
                                    <p className="text-xs text-gray-400">VIP</p>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-[#FBADCC]">Rp 500.000</div>
                            <div className="col-span-2 text-sm text-gray-400">30 Mei 2026</div>
                            <div className="col-span-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium">56/60</span>
                                    <div className="w-full max-w-[100px] bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                                        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full h-1.5" style={{ width: "93%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-400">Sold Out</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <Link href="/organizer/events/3/tickets" className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Manage
                                </Link>
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-3">
                                <div>
                                    <p className="font-medium text-sm">Rock Revolution</p>
                                    <p className="text-xs text-gray-400">VIP</p>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-[#FBADCC]">Rp 1.800.000</div>
                            <div className="col-span-2 text-sm text-gray-400">5 Juni 2026</div>
                            <div className="col-span-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium">120/150</span>
                                    <div className="w-full max-w-[100px] bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                                        <div className="bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-full h-1.5" style={{ width: "80%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <Link href="/organizer/events/4/tickets" className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Manage
                                </Link>
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors">
                            <div className="col-span-3">
                                <div>
                                    <p className="font-medium text-sm">Pop Music Festival</p>
                                    <p className="text-xs text-gray-400">VIP</p>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-[#FBADCC]">Rp 1.200.000</div>
                            <div className="col-span-2 text-sm text-gray-400">10 Juni 2026</div>
                            <div className="col-span-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium">34/100</span>
                                    <div className="w-full max-w-[100px] bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full h-1.5" style={{ width: "34%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">Upcoming</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <Link href="/organizer/events/5/tickets" className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Manage
                                </Link>
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing 5 of 10 tickets</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                1
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                2
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                3
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