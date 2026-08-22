"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function AttendeesPage() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Attendees</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage all event attendees and check-in</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                </svg>
                                Export
                            </button>
                            <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                                </svg>
                                Check-in
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Total Attendees</p>
                            <p className="text-2xl font-bold">7,891</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Checked In</p>
                            <p className="text-2xl font-bold text-green-400">5,234</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Not Checked In</p>
                            <p className="text-2xl font-bold text-yellow-400">2,657</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Events</p>
                            <p className="text-2xl font-bold text-[#FBADCC]">12</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Events</option>
                            <option>Nassar Tour 2026</option>
                            <option>Electronic Fest 2026</option>
                            <option>Jazz Night</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Status</option>
                            <option>Checked In</option>
                            <option>Not Checked In</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Ticket Types</option>
                            <option>VIP</option>
                            <option>Gold</option>
                            <option>Silver</option>
                            <option>Regular</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder="Search attendees..." 
                            className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                        />
                    </div>

                    <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                            <div className="col-span-1">No.</div>
                            <div className="col-span-2">Name</div>
                            <div className="col-span-2">Email</div>
                            <div className="col-span-2">Event</div>
                            <div className="col-span-1">Ticket</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-2 text-right">Action</div>
                        </div>

                        <div className="grid grid-cols-13 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-1 text-sm text-gray-400">1</div>
                            <div className="col-span-2">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm font-medium">Ahmad Fauzi</p>
                                        <p className="text-xs text-gray-400">VIP Ticket</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm">ahmad@email.com</div>
                            <div className="col-span-3 text-sm">Nassar Tour 2026</div>
                            <div className="col-span-1 text-sm text-[#FBADCC]">VIP</div>
                            <div className="col-span-2 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Checked In</span>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Detail
                                </button>
                                <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                    Check-in
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing 5 of 7,891 attendees</p>
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