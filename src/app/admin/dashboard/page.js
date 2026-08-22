"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

export default function SuperAdminDashboard() {
    const [activeTab, setActiveTab] = useState("all")

    const pendingEvents = [
        { id: 1, name: "Nassar Tour 2026", organizer: "Event Organizer Corp", date: "20 Mei 2026", status: "Pending", submitted: "2 days ago" },
        { id: 2, name: "Electronic Fest 2026", organizer: "Festival Pro", date: "25 Mei 2026", status: "Pending", submitted: "5 days ago" },
        { id: 3, name: "Jazz Night", organizer: "Music Lounge", date: "30 Mei 2026", status: "Pending", submitted: "1 week ago" },
    ]

    const pendingEO = [
        { id: 1, name: "Creative Events", email: "creative@events.com", phone: "+62 812 3456 7890", status: "Pending", submitted: "3 days ago" },
        { id: 2, name: "Concert Pro", email: "info@concertpro.com", phone: "+62 813 4567 8901", status: "Pending", submitted: "1 week ago" },
        { id: 3, name: "Festival Organizer", email: "hello@festival.com", phone: "+62 814 5678 9012", status: "Pending", submitted: "2 weeks ago" },
    ]

    const transactions = [
        { id: 1, event: "Nassar Tour 2026", organizer: "Event Organizer Corp", amount: "Rp 3.400.000", status: "Completed", date: "20 Mei 2026" },
        { id: 2, event: "Electronic Fest 2026", organizer: "Festival Pro", amount: "Rp 1.200.000", status: "Pending", date: "21 Mei 2026" },
        { id: 3, event: "Jazz Night", organizer: "Music Lounge", amount: "Rp 250.000", status: "Completed", date: "22 Mei 2026" },
    ]

    const users = [
        { id: 1, name: "Ahmad Fauzi", email: "ahmad@email.com", role: "User", status: "Active", joined: "Jan 2026" },
        { id: 2, name: "Siti Rahma", email: "siti@email.com", role: "User", status: "Active", joined: "Feb 2026" },
        { id: 3, name: "Budi Santoso", email: "budi@email.com", role: "Organizer", status: "Active", joined: "Mar 2026" },
        { id: 4, name: "Dewi Lestari", email: "dewi@email.com", role: "User", status: "Inactive", joined: "Apr 2026" },
    ]

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin/>

            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-gray-400 text-sm mt-1">Super Admin - Overview</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                Refresh
                            </button>
                            <select className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 3 Months</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400">+12%</span>
                            </div>
                            <p className="text-3xl font-bold">12,847</p>
                            <p className="text-sm text-gray-400 mt-1">Total Users</p>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400">8</span>
                            </div>
                            <p className="text-3xl font-bold">156</p>
                            <p className="text-sm text-gray-400 mt-1">Total Events</p>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400">+5%</span>
                            </div>
                            <p className="text-3xl font-bold">Rp 8.7B</p>
                            <p className="text-sm text-gray-400 mt-1">Total Revenue</p>
                        </div>

                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-400">12</span>
                            </div>
                            <p className="text-3xl font-bold">23</p>
                            <p className="text-sm text-gray-400 mt-1">Pending Approvals</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pending Event Approvals */}
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Ajuan Event</h2>
                                <Link href="/superadmin/approve-event" className="text-sm text-[#FBADCC] hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {pendingEvents.map((event) => (
                                    <div key={event.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{event.name}</p>
                                            <p className="text-xs text-gray-400">{event.organizer} • {event.submitted}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-colors">
                                                Approve
                                            </button>
                                            <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending EO Registration */}
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Register EO</h2>
                                <Link href="/superadmin/approve-eo" className="text-sm text-[#FBADCC] hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {pendingEO.map((eo) => (
                                    <div key={eo.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{eo.name}</p>
                                            <p className="text-xs text-gray-400">{eo.email} • {eo.submitted}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-colors">
                                                Approve
                                            </button>
                                            <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Transaksi Terbaru</h2>
                                <Link href="/superadmin/transactions" className="text-sm text-[#FBADCC] hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{transaction.event}</p>
                                            <p className="text-xs text-gray-400">{transaction.organizer}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-[#FBADCC]">{transaction.amount}</p>
                                            <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                                                transaction.status === 'Completed' 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* All Users */}
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Semua User</h2>
                                <Link href="/superadmin/users" className="text-sm text-[#FBADCC] hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] flex items-center justify-center text-black font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{user.name}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                                                {user.role}
                                            </span>
                                            <span className={`text-xs ml-2 px-2.5 py-0.5 rounded-full ${
                                                user.status === 'Active' 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}