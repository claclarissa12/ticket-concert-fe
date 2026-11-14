"use client"

import AdminGuard from "@/components/admin/guardAdmin";
import SidebarAdmin from "@/components/admin/sidebarADM"
import { LineChart } from "lucide-react";
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { month: 'Jan', revenue: 4200, profit: 1100 },
    { month: 'Feb', revenue: 5800, profit: 1500 },
    { month: 'Mar', revenue: 7200, profit: 2400 },
    { month: 'Apr', revenue: 6100, profit: 1800 },
    { month: 'May', revenue: 8900, profit: 3100 },
    { month: 'Jun', revenue: 7400, profit: 2600 },
];

export default function SuperAdminDashboard() {
    const pendingEvents = [
        { id: 1, name: "Nassar Tour 2026", organizer: "Event Organizer Corp", date: "20 Mei 2026", status: "Pending", submitted: "2 hari lalu" },
        { id: 2, name: "Electronic Fest 2026", organizer: "Festival Pro", date: "25 Mei 2026", status: "Pending", submitted: "5 hari lalu" },
        { id: 3, name: "Jazz Night", organizer: "Music Lounge", date: "30 Mei 2026", status: "Pending", submitted: "1 minggu lalu" },
    ]

    const pendingEO = [
        { id: 1, name: "Creative Events", email: "creative@events.com", phone: "+62 812 3456 7890", status: "Pending", submitted: "3 hari lalu" },
        { id: 2, name: "Concert Pro", email: "info@concertpro.com", phone: "+62 813 4567 8901", status: "Pending", submitted: "1 minggu lalu" },
        { id: 3, name: "Festival Organizer", email: "hello@festival.com", phone: "+62 814 5678 9012", status: "Pending", submitted: "2 minggu lalu" },
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
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />

                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                                <p className="text-gray-400 text-sm mt-1">Super Admin - Overview</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Refresh
                                </button>
                                <select className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] outline-none">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                    <option>Last 3 Months</option>
                                </select>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <p className="text-3xl font-bold">12,847</p>
                                <p className="text-sm text-gray-400 mt-1">Total Users</p>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <p className="text-3xl font-bold">156</p>
                                <p className="text-sm text-gray-400 mt-1">Total Events</p>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <p className="text-3xl font-bold">Rp 8.7B</p>
                                <p className="text-sm text-gray-400 mt-1">Total Revenue</p>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <p className="text-3xl font-bold">23</p>
                                <p className="text-sm text-gray-400 mt-1">Pending Approvals</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">


                            <div className="bg-[#FBADCC]/20 rounded-xl p-4 ">
                                <h3 className="text-lg font-semibold mb-4">Grafik Pendapatan</h3>

                                <BarChart
                                    style={{ width: '100%', maxWidth: 600, maxHeight: '70vh', aspectRatio: 1.618 }}
                                    responsive
                                    data={data}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="5 5" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" barSize={20} fill="#E21D8F" name="Pendapatan" />
                                    <Bar dataKey="profit" barSize={20} fill="#FBADCC" name="Keuntungan" />
                                </BarChart>
                            </div>
                            <div className="bg-[#FBADCC]/20 rounded-xl p-4">
                                <h3 className="text-lg font-semibold mb-4">Grafik Pendapatan</h3>

                                <BarChart
                                    style={{ width: '100%', maxWidth: 600, maxHeight: '70vh', aspectRatio: 1.618 }}
                                    responsive
                                    data={data}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="5 5" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" barSize={20} fill="#E21D8F" name="Pendapatan" />
                                    <Bar dataKey="profit" barSize={20} fill="#FBADCC" name="Keuntungan" />
                                </BarChart>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                                <span className={`text-xs px-2.5 py-0.5 rounded-full ${transaction.status === 'Completed'
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
                                                <div className="w-8 h-8 rounded-full bg-[#FBADCC] flex items-center justify-center text-black font-bold text-xs">
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
                                                <span className={`text-xs ml-2 px-2.5 py-0.5 rounded-full ${user.status === 'Active'
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
        </AdminGuard>

    )
}