
"use client"

import { useCallback, useEffect, useState } from "react"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { apiFetch } from "../../../../lib/api"
import Link from "next/link"
import {
    RefreshCw, Plus, CalendarDays, Ticket, Wallet, CheckCircle2,
    Clock, XCircle, TrendingUp, ArrowUpRight, Receipt
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(value || 0)

const formatRupiah = (value) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
}).format(value || 0)

export default function OrganizerDashboard() {
    const [data, setData] = useState({
        concert: { draft: 0, published: 0, cancelled: 0 },
        paid_order: 0,
        revenue: 0,
        ticket_issues: 0,
        ticket_check_in: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true)
            setError("")

            const result = await apiFetch("/eo/dashboard")
            const response = result?.data?.data ?? result?.data ?? result

            if (result?.status === "error" || response?.status === "error") {
                throw new Error(result?.message || response?.message || "Gagal mengambil dashboard")
            }

            setData({
                concert: {
                    draft: Number(response.concert?.draft || 0),
                    published: Number(response.concert?.published || 0),
                    cancelled: Number(response.concert?.cancelled || 0)
                },
                paid_order: Number(response.paid_order || 0),
                revenue: Number(response.revenue || 0),
                ticket_issues: Number(response.ticket_issues || 0),
                ticket_check_in: Number(response.ticket_check_in || 0)
            })
        } catch (err) {
            setError(err.message || "Gagal mengambil data dashboard")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDashboard()
    }, [fetchDashboard])

    const totalConcert = data.concert.draft + data.concert.published + data.concert.cancelled
    const checkInPercent = data.ticket_issues ? Math.round(data.ticket_check_in / data.ticket_issues * 100) : 0
    const remainingTickets = Math.max(data.ticket_issues - data.ticket_check_in, 0)

    const stats = [
        { label: "Total Events", value: formatNumber(totalConcert), description: "Seluruh konser milikmu", icon: CalendarDays, color: "text-[#FBADCC]", bg: "bg-pink-500/10" },
        { label: "Paid Orders", value: formatNumber(data.paid_order), description: "Transaksi berhasil", icon: Receipt, color: "text-green-400", bg: "bg-green-500/10" },
        { label: "Total Revenue", value: formatRupiah(data.revenue), description: "Pendapatan konser", icon: Wallet, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Tickets Issued", value: formatNumber(data.ticket_issues), description: "Total tiket diterbitkan", icon: Ticket, color: "text-blue-400", bg: "bg-blue-500/10" }
    ]

    const chartData = [
        { name: "Published", value: data.concert.published, color: "#FBADCC" },
        { name: "Draft", value: data.concert.draft, color: "#A78BFA" },
        { name: "Cancelled", value: data.concert.cancelled, color: "#F87171" }
    ]

    const concertStats = [
        { label: "Published", value: data.concert.published, color: "bg-[#FBADCC]", icon: CheckCircle2, textColor: "text-[#FBADCC]" },
        { label: "Draft", value: data.concert.draft, color: "bg-purple-400", icon: Clock, textColor: "text-purple-400" },
        { label: "Cancelled", value: data.concert.cancelled, color: "bg-red-400", icon: XCircle, textColor: "text-red-400" }
    ]

    const quickActions = [
        { title: "Create Event", description: "Buat konser baru", href: "/organizer/create-event", icon: Plus },
        { title: "Manage Events", description: "Kelola seluruh konser", href: "/organizer/events", icon: CalendarDays },
        { title: "Transactions", description: "Lihat pembayaran tiket", href: "/organizer/transactions", icon: Wallet }
    ]

    return (
        <EoGuard>
            <div className="min-h-screen flex bg-[#131313] text-white">
                <OrganizerSidebar />
                <main className="flex-1 min-w-0 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto p-5 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                                <p className="text-gray-400 text-sm mt-2">Welcome back, Event Organizer!</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={fetchDashboard} disabled={loading} className="p-3 rounded-xl bg-[#272727] border border-[#383838] hover:bg-[#383838] disabled:opacity-50 transition-colors">
                                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                                </button>
                                <Link href="/organizer/create-event" className="flex items-center gap-2 bg-[#FBADCC] text-black px-4 py-3 rounded-xl font-semibold hover:bg-[#f99fc3] transition-colors">
                                    <Plus size={18} />
                                    Create Event
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex flex-wrap justify-between gap-3">
                                <p className="text-sm">{error}</p>
                                <button onClick={fetchDashboard} className="text-sm underline">Coba lagi</button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                            {stats.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.label} className="bg-[#272727] border border-[#333] p-5 rounded-2xl hover:border-[#555] transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-gray-400 text-sm">{item.label}</p>
                                                <h2 className="text-xl sm:text-2xl font-bold mt-3">{loading ? "..." : item.value}</h2>
                                            </div>
                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}>
                                                <Icon className={item.color} size={22} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-4">{item.description}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="bg-gradient-to-r from-[#30202a] to-[#272727] border border-[#533342] rounded-2xl p-6 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <TrendingUp size={17} />
                                        Total Revenue
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[#FBADCC] mt-3">
                                        {loading ? "..." : formatRupiah(data.revenue)}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-2">Total pendapatan dari transaksi berhasil</p>
                                </div>
                                <div className="bg-black/20 rounded-xl p-5 min-w-[170px]">
                                    <p className="text-sm text-gray-400">Paid Orders</p>
                                    <p className="text-2xl font-bold mt-2">{loading ? "..." : formatNumber(data.paid_order)}</p>
                                    <p className="text-xs text-green-400 mt-1">Transaksi berhasil</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="bg-[#272727] border border-[#333] rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h2 className="font-semibold text-lg">Concert Statistics</h2>
                                        <p className="text-xs text-gray-400 mt-1">Statistik konser milikmu</p>
                                    </div>
                                    <CalendarDays className="text-[#FBADCC]" size={21} />
                                </div>

                                {loading ? (
                                    <p className="text-gray-400 py-20 text-center">Loading...</p>
                                ) : totalConcert === 0 ? (
                                    <div className="py-16 text-center">
                                        <CalendarDays className="mx-auto text-gray-600 mb-3" size={35} />
                                        <p className="text-gray-400 text-sm">Belum ada data konser</p>
                                        <Link href="/organizer/create-event" className="inline-flex items-center gap-2 mt-4 text-sm text-[#FBADCC] hover:underline">
                                            <Plus size={16} />
                                            Buat konser pertama
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className="h-56">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={chartData.filter(item => item.value > 0)} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                                                        {chartData.filter(item => item.value > 0).map(item => (
                                                            <Cell key={item.name} fill={item.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #444", borderRadius: "12px", color: "#fff" }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            {chartData.map(item => (
                                                <div key={item.name} className="bg-[#1a1a1a] p-3 rounded-xl">
                                                    <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                                                    <p className="text-xs text-gray-400">{item.name}</p>
                                                    <p className="font-bold text-xl mt-1">{formatNumber(item.value)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="bg-[#272727] border border-[#333] rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="font-semibold text-lg">Ticket Check-in</h2>
                                        <p className="text-xs text-gray-400 mt-1">Statistik penggunaan tiket</p>
                                    </div>
                                    <Ticket className="text-[#FBADCC]" size={21} />
                                </div>

                                <p className="text-4xl font-bold text-[#FBADCC]">{loading ? "..." : `${checkInPercent}%`}</p>
                                <p className="text-sm text-gray-400 mt-2">Tiket sudah melakukan check-in</p>

                                <div className="w-full h-3 bg-[#3a3a3a] rounded-full mt-6 overflow-hidden">
                                    <div className="h-full bg-[#FBADCC] rounded-full transition-all duration-500" style={{ width: `${Math.min(checkInPercent, 100)}%` }} />
                                </div>

                                <div className="flex justify-between text-xs mt-4 text-gray-400">
                                    <span>{formatNumber(data.ticket_check_in)} Checked-in</span>
                                    <span>{formatNumber(remainingTickets)} Remaining</span>
                                </div>

                                <div className="border-t border-[#444] mt-7 pt-5">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-[#1a1a1a] rounded-xl p-4">
                                            <Ticket size={20} className="text-blue-400 mb-3" />
                                            <p className="text-xs text-gray-400">Tickets Issued</p>
                                            <p className="text-xl font-bold mt-1">{formatNumber(data.ticket_issues)}</p>
                                        </div>
                                        <div className="bg-[#1a1a1a] rounded-xl p-4">
                                            <CheckCircle2 size={20} className="text-green-400 mb-3" />
                                            <p className="text-xs text-gray-400">Tickets Used</p>
                                            <p className="text-xl font-bold mt-1">{formatNumber(data.ticket_check_in)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#272727] border border-[#333] rounded-2xl p-6 mb-6">
                            <h2 className="font-semibold text-lg mb-5">Event Status Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {concertStats.map(item => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.label} className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Icon className={item.textColor} size={22} />
                                                <div>
                                                    <p className="text-sm text-gray-400">{item.label}</p>
                                                    <p className="text-xl font-bold mt-1">{formatNumber(item.value)}</p>
                                                </div>
                                            </div>
                                            <div className={`w-2 h-10 rounded-full ${item.color}`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="bg-[#272727] border border-[#333] rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="font-semibold text-lg">Quick Actions</h2>
                                    <p className="text-xs text-gray-400 mt-1">Akses cepat pengelolaan konser</p>
                                </div>
                                <ArrowUpRight className="text-gray-400" size={20} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {quickActions.map(item => {
                                    const Icon = item.icon
                                    return (
                                        <Link key={item.title} href={item.href} className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl hover:bg-[#333] hover:border-[#FBADCC] transition-all group">
                                            <div className="flex justify-between items-center">
                                                <Icon className="text-[#FBADCC]" size={22} />
                                                <ArrowUpRight size={17} className="text-gray-500 group-hover:text-[#FBADCC]" />
                                            </div>
                                            <p className="font-medium mt-4">{item.title}</p>
                                            <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="text-center text-xs text-gray-500 py-6">
                            Concert Management System • Event Organizer Dashboard
                        </div>
                    </div>
                </main>
            </div>
        </EoGuard>
    )
}
