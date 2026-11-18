
"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { adminApi } from "../../../../lib/api"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
    RefreshCw,
    Users,
    CalendarDays,
    Wallet,
    Ticket,
    UserRoundCog,
    TrendingUp,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowUpRight,
    Plus,
    ListChecks,
    Receipt
} from "lucide-react"

const formatNumber = (number) => {
    return Number(number || 0).toLocaleString("id-ID")
}

const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(number) || 0)
}

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchDashboard = useCallback(async () => {
        setLoading(true)
        setError("")

        try {
            const res = await adminApi.getDashboard()
            const payload = res?.data?.data ?? res?.data ?? res

            if (res?.status === "error") {
                throw new Error(res.message || "Gagal memuat dashboard")
            }

            setStats({
                users: Number(payload.users || 0),
                event_organizers: Number(payload.event_organizers || 0),
                concerts: {
                    draft: Number(payload.concerts?.draft || 0),
                    published: Number(payload.concerts?.published || 0),
                    cancelled: Number(payload.concerts?.cancelled || 0)
                },
                paid_orders: Number(payload.paid_orders || 0),
                revenue: Number(payload.revenue || 0),
                tickets_issued: Number(payload.tickets_issued || 0),
                tickets_checked_in: Number(payload.tickets_checked_in || 0)
            })
        } catch (err) {
            console.error("DASHBOARD ERROR:", err)
            setError(err.response?.data?.message || err.message || "Gagal memuat dashboard")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDashboard()
    }, [fetchDashboard])

    const totalEvents = stats
        ? stats.concerts.draft + stats.concerts.published + stats.concerts.cancelled
        : 0

    const checkInPercent = stats?.tickets_issued
        ? Math.round(stats.tickets_checked_in / stats.tickets_issued * 100)
        : 0

    const remainingTickets = Math.max(
        (stats?.tickets_issued || 0) - (stats?.tickets_checked_in || 0),
        0
    )

    const cards = [
        {
            title: "Total Users",
            value: formatNumber(stats?.users),
            description: "Pengguna terdaftar",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            title: "Event Organizer",
            value: formatNumber(stats?.event_organizers),
            description: "Total penyelenggara",
            icon: UserRoundCog,
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            title: "Total Events",
            value: formatNumber(totalEvents),
            description: "Seluruh konser",
            icon: CalendarDays,
            color: "text-[#FBADCC]",
            bg: "bg-pink-500/10"
        },
        {
            title: "Paid Orders",
            value: formatNumber(stats?.paid_orders),
            description: "Transaksi berhasil",
            icon: Ticket,
            color: "text-green-400",
            bg: "bg-green-500/10"
        }
    ]

    const concertStats = [
        {
            label: "Published",
            value: stats?.concerts.published || 0,
            color: "bg-green-400",
            icon: CheckCircle2,
            textColor: "text-green-400"
        },
        {
            label: "Draft",
            value: stats?.concerts.draft || 0,
            color: "bg-yellow-400",
            icon: Clock,
            textColor: "text-yellow-400"
        },
        {
            label: "Cancelled",
            value: stats?.concerts.cancelled || 0,
            color: "bg-red-400",
            icon: XCircle,
            textColor: "text-red-400"
        }
    ]

    const quickActions = [
        {
            title: "Manage Users",
            description: "Kelola akun pengguna",
            href: "/admin/users",
            icon: Users
        },
        {
            title: "Manage Organizers",
            description: "Kelola akun event organizer",
            href: "/admin/organizers",
            icon: UserRoundCog
        },
        {
            title: "Manage Concerts",
            description: "Pantau seluruh konser",
            href: "/admin/concert",
            icon: CalendarDays
        },
        {
            title: "Manage Orders",
            description: "Pantau transaksi tiket",
            href: "/admin/orders",
            icon: Receipt
        }
    ]

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />

                <main className="flex-1 min-w-0 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                    Dashboard
                                </h1>
                                <p className="text-gray-400 text-sm mt-2">
                                    Welcome back, Super Admin!
                                </p>
                            </div>

                            <button
                                onClick={fetchDashboard}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#383838] disabled:opacity-50"
                            >
                                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                                Refresh
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20 flex items-center justify-between gap-3">
                                <span>{error}</span>
                                <button onClick={fetchDashboard} className="underline shrink-0">
                                    Coba lagi
                                </button>
                            </div>
                        )}

                        {loading && !stats ? (
                            <div className="text-center py-24 text-gray-400">
                                <RefreshCw className="animate-spin mx-auto mb-3" size={28} />
                                Memuat dashboard...
                            </div>
                        ) : stats && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                                    {cards.map((item) => {
                                        const Icon = item.icon

                                        return (
                                            <div
                                                key={item.title}
                                                className="bg-[#272727] rounded-2xl p-5 border border-[#333] hover:border-[#555] transition-colors"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm text-gray-400">
                                                            {item.title}
                                                        </p>
                                                        <h2 className="text-2xl font-bold mt-3">
                                                            {loading ? "..." : item.value}
                                                        </h2>
                                                    </div>

                                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}>
                                                        <Icon className={item.color} size={22} />
                                                    </div>
                                                </div>

                                                <p className="text-xs text-gray-500 mt-4">
                                                    {item.description}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="bg-gradient-to-r from-[#30202a] to-[#272727] border border-[#533342] rounded-2xl p-6 mb-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                        <div>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Wallet size={17} />
                                                Total Revenue
                                            </div>

                                            <h2 className="text-3xl sm:text-4xl font-bold text-[#FBADCC] mt-3">
                                                {formatRupiah(stats.revenue)}
                                            </h2>

                                            <p className="text-gray-400 text-xs mt-2">
                                                Total pendapatan dari transaksi paid
                                            </p>
                                        </div>

                                        <div className="bg-black/20 rounded-xl p-5 min-w-[170px]">
                                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                                <TrendingUp size={17} />
                                                Paid Orders
                                            </div>
                                            <p className="text-2xl font-bold mt-2">
                                                {formatNumber(stats.paid_orders)}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Transaksi berhasil
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    Concert Statistics
                                                </h2>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Distribusi status seluruh konser
                                                </p>
                                            </div>
                                            <CalendarDays className="text-[#FBADCC]" size={21} />
                                        </div>

                                        <div className="space-y-6">
                                            {concertStats.map((item) => {
                                                const Icon = item.icon
                                                const percentage = totalEvents
                                                    ? item.value / totalEvents * 100
                                                    : 0

                                                return (
                                                    <div key={item.label}>
                                                        <div className="flex justify-between items-center text-sm mb-2">
                                                            <div className="flex items-center gap-2 text-gray-300">
                                                                <Icon size={16} className={item.textColor} />
                                                                {item.label}
                                                            </div>
                                                            <span className="font-semibold">
                                                                {formatNumber(item.value)}
                                                            </span>
                                                        </div>

                                                        <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${item.color} rounded-full transition-all`}
                                                                style={{ width: `${percentage}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="mt-7 pt-5 border-t border-[#3a3a3a] flex justify-between items-center">
                                            <span className="text-sm text-gray-400">
                                                Total Events
                                            </span>
                                            <span className="text-xl font-bold">
                                                {formatNumber(totalEvents)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    Ticket Check-in
                                                </h2>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Statistik penggunaan tiket
                                                </p>
                                            </div>
                                            <Ticket className="text-[#FBADCC]" size={21} />
                                        </div>

                                        <div className="flex items-end justify-between gap-3">
                                            <div>
                                                <p className="text-4xl font-bold text-[#FBADCC]">
                                                    {checkInPercent}%
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Tiket sudah check-in
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold">
                                                    {formatNumber(stats.tickets_checked_in)}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Checked-in
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full h-3 bg-[#1a1a1a] rounded-full mt-7 overflow-hidden">
                                            <div
                                                className="h-full bg-[#FBADCC] rounded-full transition-all"
                                                style={{ width: `${Math.min(checkInPercent, 100)}%` }}
                                            />
                                        </div>

                                        <div className="flex justify-between text-xs mt-3 text-gray-400">
                                            <span>{checkInPercent}% Completed</span>
                                            <span>{formatNumber(stats.tickets_issued)} Total</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-7">
                                            <div className="bg-[#1a1a1a] rounded-xl p-4">
                                                <Ticket size={19} className="text-blue-400 mb-3" />
                                                <p className="text-xs text-gray-400">
                                                    Tickets Issued
                                                </p>
                                                <p className="text-xl font-bold mt-1">
                                                    {formatNumber(stats.tickets_issued)}
                                                </p>
                                            </div>

                                            <div className="bg-[#1a1a1a] rounded-xl p-4">
                                                <CheckCircle2 size={19} className="text-green-400 mb-3" />
                                                <p className="text-xs text-gray-400">
                                                    Remaining Tickets
                                                </p>
                                                <p className="text-xl font-bold mt-1">
                                                    {formatNumber(remainingTickets)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] mb-6">
                                    <div className="flex justify-between items-center mb-5">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Quick Actions
                                            </h2>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Akses cepat pengelolaan platform
                                            </p>
                                        </div>
                                        <ArrowUpRight className="text-gray-400" size={20} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                        {quickActions.map((item) => {
                                            const Icon = item.icon

                                            return (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="bg-[#1a1a1a] border border-[#333] rounded-xl p-4 hover:border-[#FBADCC] hover:bg-[#222] transition-all group"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <Icon size={21} className="text-[#FBADCC]" />
                                                        <ArrowUpRight
                                                            size={17}
                                                            className="text-gray-500 group-hover:text-[#FBADCC] transition-colors"
                                                        />
                                                    </div>
                                                    <p className="font-semibold mt-4 text-sm">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {item.description}
                                                    </p>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="text-center text-xs text-gray-500 py-3">
                                    Concert Management System • Super Admin Dashboard
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </AdminGuard>
    )
}
