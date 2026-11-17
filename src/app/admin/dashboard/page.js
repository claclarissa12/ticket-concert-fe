"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { adminApi } from "../../../../lib/api"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchDashboard = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await adminApi.getDashboard()
            const payload = res?.data?.data ?? res?.data ?? res
            setStats(payload)
        } catch (err) {
            console.error("ERROR:", err)
            setError(err.response?.data?.message || err.message || "Gagal memuat dashboard")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchDashboard() }, [fetchDashboard])

    // Data chart: backend belum kirim timeseries, jadi kosongkan dulu
    // Nanti kalau backend punya endpoint /dashboard/revenue-chart, isi dari situ
    const chartData = useMemo(() => {
        return stats?.revenue_chart ?? []
    }, [stats])

    // List yang belum ada di response getDashboard -> sementara kosong
    const pendingEvents = stats?.pending_events ?? []
    const pendingEO = stats?.pending_eo ?? []
    const transactions = stats?.recent_transactions ?? []
    const users = stats?.recent_users ?? []

    const totalUsers = stats?.users ?? 0
    const totalEvents = (stats?.concerts?.draft ?? 0) + (stats?.concerts?.published ?? 0) + (stats?.concerts?.cancelled ?? 0)
    const totalRevenue = stats?.revenue ?? 0
    const pendingApprovals = pendingEvents.length + pendingEO.length

    const formatRupiah = (n) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0)

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />

                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                                <p className="text-gray-400 text-sm mt-1">Super Admin - Overview</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={fetchDashboard}
                                    disabled={loading}
                                    className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] disabled:opacity-50"
                                >
                                    {loading ? "Loading..." : "Refresh"}
                                </button>
                                <select className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] outline-none">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                    <option>Last 3 Months</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm border border-red-500/30">
                                {error}
                            </div>
                        )}

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-[#272727] rounded-2xl p-5 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Users</p>
                                <p className="text-2xl font-bold mt-1">{totalUsers.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-5 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Events</p>
                                <p className="text-2xl font-bold mt-1">{totalEvents.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-5 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Revenue</p>
                                <p className="text-2xl font-bold mt-1 text-[#FBADCC]">{formatRupiah(totalRevenue)}</p>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-5 border border-[#333]">
                                <p className="text-sm text-gray-400">Pending Approvals</p>
                                <p className="text-2xl font-bold mt-1 text-yellow-400">{pendingApprovals}</p>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Grafik Pendapatan</h2>
                                <span className="text-xs text-gray-400">6 bulan terakhir</span>
                            </div>
                            <div className="w-full">
                                {chartData.length === 0 ? (
                                    <p className="text-sm text-gray-400 py-10 text-center">
                                        Data grafik belum tersedia.
                                    </p>
                                ) : (
                                    <BarChart
                                        style={{ width: "100%", maxWidth: "100%", height: 320 }}
                                        data={chartData}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="month" stroke="#888" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="#888" tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#1a1a1a",
                                                border: "1px solid #333",
                                                borderRadius: "8px",
                                            }}
                                            labelStyle={{ color: "#fff" }}
                                        />
                                        <Legend wrapperStyle={{ fontSize: 12 }} />
                                        <Bar dataKey="revenue" barSize={24} fill="#E21D8F" name="Pendapatan" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="profit" barSize={24} fill="#FBADCC" name="Keuntungan" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                )}
                            </div>
                        </div>

                        {/* Grid Panels */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Ajuan Event */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold">Ajuan Event</h2>
                                    <Link href="/admin/concert" className="text-sm text-[#FBADCC] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {pendingEvents.length === 0 ? (
                                        <p className="text-sm text-gray-400">Tidak ada ajuan event.</p>
                                    ) : pendingEvents.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{event.name}</p>
                                                <p className="text-xs text-gray-400">{event.organizer} • {event.submitted}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
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

                            {/* Register EO */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold">Register EO</h2>
                                    <Link href="/admin/eo" className="text-sm text-[#FBADCC] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {pendingEO.length === 0 ? (
                                        <p className="text-sm text-gray-400">Tidak ada pendaftaran EO.</p>
                                    ) : pendingEO.map((eo) => (
                                        <div key={eo.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{eo.name}</p>
                                                <p className="text-xs text-gray-400">{eo.email} • {eo.submitted}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
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

                            {/* Transaksi Terbaru */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold">Transaksi Terbaru</h2>
                                    <Link href="/admin/orders" className="text-sm text-[#FBADCC] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {transactions.length === 0 ? (
                                        <p className="text-sm text-gray-400">Belum ada transaksi.</p>
                                    ) : transactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{transaction.event}</p>
                                                <p className="text-xs text-gray-400">{transaction.organizer} • {transaction.date}</p>
                                            </div>
                                            <div className="text-right shrink-0 ml-3">
                                                <p className="text-sm font-bold text-[#FBADCC]">{transaction.amount}</p>
                                                <span className={`text-xs px-2.5 py-0.5 rounded-full ${transaction.status === "Completed"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Semua User */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold">Semua User</h2>
                                    <Link href="/admin/users" className="text-sm text-[#FBADCC] hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {users.length === 0 ? (
                                        <p className="text-sm text-gray-400">Belum ada data user.</p>
                                    ) : users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-8 h-8 rounded-full bg-[#FBADCC] flex items-center justify-center text-black font-bold text-xs shrink-0">
                                                    {user.name?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate">{user.name}</p>
                                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0 ml-3">
                                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                                                    {user.role}
                                                </span>
                                                <span className={`text-xs px-2.5 py-0.5 rounded-full ${user.status === "Active"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
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