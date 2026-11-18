
"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { organizerApi } from "../../../../lib/api"

export default function TransactionsPage() {
    const params = useParams()
    const concertId = params.id

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [status, setStatus] = useState("")
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1
    })

    const limit = 10

    const fetchOrders = useCallback(async () => {
        if (!concertId) return

        try {
            setLoading(true)
            setError("")

            const response = await organizerApi.getConcertOrder(concertId, {
                page,
                limit,
                ...(status ? { status } : {})
            })

            const result =
                response?.data?.data ??
                response?.data ??
                response

            const data = result?.data ?? result?.rows ?? []

            setOrders(Array.isArray(data) ? data : [])

            const paginationData = result?.pagination ?? {}

            setPagination({
                total: Number(paginationData.total ?? result?.count ?? 0),
                totalPages: Number(
                    paginationData.totalPages ??
                    paginationData.total_pages ??
                    Math.ceil(Number(paginationData.total ?? result?.count ?? 0) / limit) ??
                    1
                )
            })

        } catch (err) {
            console.error("GET TRANSACTIONS ERROR:", err)
            setError(err.message || "Gagal mengambil data transaksi")
        } finally {
            setLoading(false)
        }
    }, [concertId, page, status])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(Number(value || 0))
    }

    const formatDate = (value) => {
        if (!value) return "-"

        return new Date(value).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    const getTicketCount = (order) => {
        return (order.details || []).reduce((total, detail) => {
            return total + Number(detail.quantity ?? 1)
        }, 0)
    }

    const totalPaid = orders.filter(order => order.status === "paid").length
    const totalPending = orders.filter(order => order.status === "pending").length
    const revenue = orders
        .filter(order => order.status === "paid")
        .reduce((total, order) => total + Number(order.total_price || 0), 0)

    const getStatusStyle = (value) => {
        switch (value) {
            case "paid":
                return "bg-green-500/20 text-green-400"
            case "pending":
                return "bg-yellow-500/20 text-yellow-400"
            case "cancelled":
                return "bg-red-500/20 text-red-400"
            case "failed":
                return "bg-red-500/20 text-red-400"
            default:
                return "bg-gray-500/20 text-gray-400"
        }
    }

    const changeStatus = (value) => {
        setStatus(value)
        setPage(1)
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                    Transactions
                                </h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    Manage payment transactions for your event
                                </p>
                            </div>

                            <button
                                onClick={fetchOrders}
                                disabled={loading}
                                className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] border border-[#333] disabled:opacity-50"
                            >
                                {loading ? "Loading..." : "Refresh"}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Transactions</p>
                                <p className="text-2xl font-bold">
                                    {loading ? "..." : pagination.total}
                                </p>
                            </div>

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Revenue (Current Page)</p>
                                <p className="text-xl font-bold text-[#FBADCC]">
                                    {loading ? "..." : formatRupiah(revenue)}
                                </p>
                            </div>

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Successful (Current Page)</p>
                                <p className="text-2xl font-bold text-green-400">
                                    {loading ? "..." : totalPaid}
                                </p>
                            </div>

                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Pending (Current Page)</p>
                                <p className="text-2xl font-bold text-yellow-400">
                                    {loading ? "..." : totalPending}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <select
                                value={status}
                                onChange={(e) => changeStatus(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] text-sm"
                            >
                                <option value="">All Status</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] text-left">
                                    <thead className="bg-[#1a1a1a] text-sm text-gray-400">
                                        <tr>
                                            <th className="p-4">Order ID</th>
                                            <th className="p-4">Buyer</th>
                                            <th className="p-4">Ticket</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="p-10 text-center text-gray-400">
                                                    Loading transactions...
                                                </td>
                                            </tr>
                                        ) : orders.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="p-10 text-center text-gray-400">
                                                    No transactions found
                                                </td>
                                            </tr>
                                        ) : (
                                            orders.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-t border-[#333] hover:bg-[#2f2f2f]"
                                                >
                                                    <td className="p-4">
                                                        <p className="text-sm font-medium text-[#FBADCC]">
                                                            #{order.id}
                                                        </p>
                                                    </td>

                                                    <td className="p-4">
                                                        <p className="text-sm font-medium">
                                                            {order.user?.name || "-"}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {order.user?.email || "-"}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {order.user?.phone || "-"}
                                                        </p>
                                                    </td>

                                                    <td className="p-4">
                                                        <p className="text-sm">
                                                            {getTicketCount(order)} tiket
                                                        </p>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {(order.details || []).map((detail, index) => (
                                                                <p key={detail.id || index}>
                                                                    {detail.tier?.name || "Ticket"}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </td>

                                                    <td className="p-4">
                                                        <p className="text-sm font-bold text-[#FBADCC]">
                                                            {formatRupiah(order.total_price)}
                                                        </p>
                                                    </td>

                                                    <td className="p-4">
                                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>

                                                    <td className="p-4">
                                                        <p className="text-sm text-gray-300">
                                                            {formatDate(order.created_at)}
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                            <p className="text-sm text-gray-400">
                                Showing {orders.length} of {pagination.total} transactions
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1 || loading}
                                    className="px-4 py-2 bg-[#272727] rounded-xl text-sm border border-[#333] disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                    {page}
                                </span>

                                <button
                                    onClick={() => setPage(prev => prev + 1)}
                                    disabled={page >= pagination.totalPages || loading}
                                    className="px-4 py-2 bg-[#272727] rounded-xl text-sm border border-[#333] disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </EoGuard>
    )
}
