"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function OrganizerDashboard() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-gray-400 text-sm mt-1">Welcome back, Event Organizer!</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors flex items-center gap-2 border border-[#333]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>
                            <select className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 3 Months</option>
                            </select>
                            <Link href="/organizer/create-event" className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                + Create Event
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-all hover:scale-[1.02] border border-[#333]">
                            <div className="flex items-center justify-between mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" color="#FBADCC"
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V6c0-1.1-.9-2-2-2ZM5,20v-12h14v-2,14s-14,0-14,0Z" /><path d="M12 13H17V18H12z" />
                                </svg>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500 text-black">
                                    +12%
                                </span>
                            </div>
                            <p className="text-3xl font-bold tracking-tight">12</p>
                            <p className="text-sm text-gray-400 mt-1">Total Events</p>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-all hover:scale-[1.02] border border-[#333]">
                            <div className="flex items-center justify-between mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" color="#FBADCC"
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M21 8h-2V3a1 1 0 0 0-1.37-.93l-15 6c-.09.04-.16.1-.24.16-.03.02-.06.03-.09.06-.04.04-.05.08-.08.12-.05.06-.1.12-.13.19-.01.02 0 .05-.02.08-.03.1-.06.2-.06.31v3.55c0 .48.33.89.8.98a1.499 1.499 0 0 1 0 2.94c-.47.09-.8.5-.8.98v3.55c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-3.55c0-.48-.33-.89-.8-.98a1.499 1.499 0 0 1 0-2.94c.47-.09.8-.5.8-.98V8.99c0-.55-.45-1-1-1Zm-4 0H8.19L17 4.48zm3 3.84c-1.2.57-2 1.79-2 3.16s.8 2.59 2 3.16V20h-4v-2h-1v2H4v-1.84c1.2-.57 2-1.79 2-3.16s-.8-2.59-2-3.16V10h11v1h1v-1h4z"></path><path d="M15 12h1v2h-1zm0 3h1v2h-1z"></path>
                                </svg>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FBADCC] text-black">
                                    +12%
                                </span>
                            </div>
                            <p className="text-3xl font-bold tracking-tight">8,432</p>
                            <p className="text-sm text-gray-400 mt-1">Tickets Sold</p>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-all hover:scale-[1.02] border border-[#333]">
                            <div className="flex items-center justify-between mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" color="#FBADCC"
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    \                                    <path d="M8 15.5H6c0 2.59 2.42 4.12 5 4.44V22h2v-2.07c2.25-.3 5-1.59 5-4.43s-2.75-4.13-5-4.43V6.1c1.33.24 3 .94 3 2.4h2c0-2.84-2.75-4.13-5-4.43V2h-2v2.07c-2.25.3-5 1.59-5 4.43s2.67 4.11 5 4.43v4.97c-1.45-.25-3-1.02-3-2.4m8 0c0 1.46-1.67 2.16-3 2.4v-4.8c1.33.24 3 .94 3 2.4m-8-7c0-1.46 1.67-2.16 3-2.4v4.8c-1.37-.25-3-1-3-2.4"></path>
                                </svg>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-600 text-black">
                                    +12%
                                </span>
                            </div>
                            <p className="text-3xl font-bold tracking-tight">Rp 4.2B</p>
                            <p className="text-sm text-gray-400 mt-1">Revenue</p>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-all hover:scale-[1.02] border border-[#333]">
                            <div className="flex items-center justify-between mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" color="#FBADCC"
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M12 11c1.71 0 3-1.29 3-3s-1.29-3-3-3-3 1.29-3 3 1.29 3 3 3m0-4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m1 5h-2c-2.76 0-5 2.24-5 5v.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V17c0-2.76-2.24-5-5-5m-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3zm-1.5-6c.47 0 .9-.12 1.27-.33a5.03 5.03 0 0 1-.42-4.52C7.09 6.06 6.8 6 6.5 6 5.06 6 4 7.06 4 8.5S5.06 11 6.5 11m-.39 1H5.5C3.57 12 2 13.57 2 15.5v1c0 .28.22.5.5.5H4c0-1.96.81-3.73 2.11-5m11.39-1c1.44 0 2.5-1.06 2.5-2.5S18.94 6 17.5 6c-.31 0-.59.06-.85.15a5.03 5.03 0 0 1-.42 4.52c.37.21.79.33 1.27.33m1 1h-.61A6.97 6.97 0 0 1 20 17h1.5c.28 0 .5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5"></path>
                                </svg>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-600 text-black">
                                    +12%
                                </span>
                            </div>
                            <p className="text-3xl font-bold tracking-tight">7,891</p>
                            <p className="text-sm text-gray-400 mt-1">Attendees</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Ticket Sales</h2>
                                <select className="bg-[#1a1a1a] text-sm px-4 py-2 rounded-lg border border-[#333] outline-none focus:border-[#FBADCC] transition-colors">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                    <option>Last 3 Months</option>
                                </select>
                            </div>
                            <div className="h-52 flex items-end gap-3">
                                {[45, 62, 38, 75, 90, 55, 70].map((value, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-gradient-to-t from-[#E21D8F] to-[#FBADCC] rounded-lg transition-all hover:opacity-80"
                                            style={{ height: `${(value / 100) * 100}%`, minHeight: '8px' }}
                                        ></div>
                                        <span className="text-xs text-gray-500 mt-2">{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link href="/organizer/create-event" className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] flex items-center justify-center text-black font-bold text-lg">
                                        +
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Create New Event</p>
                                        <p className="text-xs text-gray-400">Start a new event</p>
                                    </div>
                                </Link>
                                <Link href="/organizer/tickets" className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-lg">
                                        🎫
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Manage Tickets</p>
                                        <p className="text-xs text-gray-400">Set prices & quota</p>
                                    </div>
                                </Link>
                                <Link href="/organizer/transactions" className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-lg">
                                        💳
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Transactions</p>
                                        <p className="text-xs text-gray-400">View all payments</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                                <Link href="/organizer/transactions" className="text-sm text-[#FBADCC] hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Nassar Tour 2026</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>Ahmad Fauzi</span>
                                            <span>•</span>
                                            <span>2 tickets</span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">Rp 680.000</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Success</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Electronic Fest 2026</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>Siti Rahma</span>
                                            <span>•</span>
                                            <span>4 tickets</span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">Rp 1.200.000</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Pending</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Jazz Night</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>Budi Santoso</span>
                                            <span>•</span>
                                            <span>1 tickets</span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">Rp 250.000</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Success</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Rock Revolution</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>Dewi Lestari</span>
                                            <span>•</span>
                                            <span>3 tickets</span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">Rp 900.000</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400">Failed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                                <Link href="/organizer/events" className="text-sm text-[#FBADCC] hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Nassar Tour 2026</p>
                                        <p className="text-xs text-gray-400">20 Mei 2026</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">234 tickets</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Active</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Electronic Fest 2026</p>
                                        <p className="text-xs text-gray-400">25 Mei 2026</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">156 tickets</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Draft</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">Jazz Night</p>
                                        <p className="text-xs text-gray-400">30 Mei 2026</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold">89 tickets</p>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}