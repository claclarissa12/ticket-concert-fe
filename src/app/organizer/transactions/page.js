
"use client"

import { useCallback, useEffect, useState } from "react"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { organizerApi } from "../../../../lib/api"
import BackButton from "@/components/cards/back"

export default function TransactionsPage() {
    const [orders, setOrders] = useState([])
    const [concerts, setConcerts] = useState([])
    const [selectedConcertId, setSelectedConcertId] = useState("")
    const [loading, setLoading] = useState(false)
    const [concertLoading, setConcertLoading] = useState(true)
    const [error, setError] = useState("")
    const [status, setStatus] = useState("")
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 })

    const limit = 10

    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const res = await organizerApi.getMyConcert()
                const data = res?.data?.data ?? res?.data ?? []
                const items = Array.isArray(data) ? data : data.items || data.rows || []
                setConcerts(items)
                if (items.length) setSelectedConcertId(String(items[0].id))
            } catch (err) {
                setError(err.message || "Gagal mengambil daftar konser")
            } finally {
                setConcertLoading(false)
            }
        }
        fetchConcerts()
    }, [])

    const fetchOrders = useCallback(async () => {
        if (!selectedConcertId) return
        try {
            setLoading(true)
            setError("")
            const res = await organizerApi.getConcertOrder(selectedConcertId, { page, limit, status })
            const data = res?.data?.data ?? res?.data ?? {}
            setOrders(data.items || [])
            setPagination({
                total: Number(data.pagination?.total || 0),
                totalPages: Number(data.pagination?.total_pages || 1)
            })
        } catch (err) {
            setError(err.message || "Gagal mengambil transaksi")
            setOrders([])
        } finally {
            setLoading(false)
        }
    }, [selectedConcertId, page, status])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const formatRupiah = (value) => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value || 0))

    const formatDate = (value) => value ? new Date(value).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }) : "-"

    const getTicketCount = (order) => (order.details || []).reduce(
        (total, detail) => total + Number(detail.quantity || 0), 0
    )

    const totalPaid = orders.filter(order => order.status === "paid").length
    const totalPending = orders.filter(order => order.status === "pending").length
    const revenue = orders.filter(order => order.status === "paid").reduce(
        (total, order) => total + Number(order.total_price || 0), 0
    )

    const getStatusStyle = (value) => {
        switch (value) {
            case "paid": return "bg-green-500/20 text-green-400"
            case "pending": return "bg-yellow-500/20 text-yellow-400"
            case "cancelled":
            case "failed": return "bg-red-500/20 text-red-400"
            case "expired": return "bg-gray-500/20 text-gray-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const changeConcert = (value) => {
        setSelectedConcertId(value)
        setPage(1)
        setStatus("")
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <BackButton className="mb-5" />

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Transactions</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage payment transactions for your event</p>
                            </div>
                           
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2">Select Concert</label>
                            <select value={selectedConcertId} onChange={(e) => changeConcert(e.target.value)} disabled={concertLoading || concerts.length === 0} className="w-full sm:w-96 px-4 py-3 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] text-sm disabled:opacity-50">
                                {concertLoading ? (
                                    <option value="">Loading concerts...</option>
                                ) : concerts.length === 0 ? (
                                    <option value="">No concerts found</option>
                                ) : (
                                    concerts.map(concert => <option key={concert.id} value={String(concert.id)}>{concert.title}</option>)
                                )}
                            </select>
                        </div>

                        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">{error}</div>}

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Transactions</p>
                                <p className="text-2xl font-bold">{loading ? "..." : pagination.total}</p>
                            </div>
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Revenue (Current Page)</p>
                                <p className="text-xl font-bold text-[#FBADCC]">{loading ? "..." : formatRupiah(revenue)}</p>
                            </div>
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Successful (Current Page)</p>
                                <p className="text-2xl font-bold text-green-400">{loading ? "..." : totalPaid}</p>
                            </div>
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Pending (Current Page)</p>
                                <p className="text-2xl font-bold text-yellow-400">{loading ? "..." : totalPending}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] text-sm">
                                <option value="">All Status</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>

                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] text-left">
                                    <thead className="bg-[#1a1a1a] text-xs uppercase tracking-wider text-gray-400">
                                        <tr>
                                            <th className="px-5 py-4">Order ID</th>
                                            <th className="px-5 py-4">Buyer</th>
                                            <th className="px-5 py-4">Ticket Details</th>
                                            <th className="px-5 py-4">Amount</th>
                                            <th className="px-5 py-4 text-center">Status</th>
                                            <th className="px-5 py-4 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="6" className="p-12 text-center text-gray-400">Loading transactions...</td></tr>
                                        ) : orders.length === 0 ? (
                                            <tr><td colSpan="6" className="p-12 text-center text-gray-400">No transactions found</td></tr>
                                        ) : (
                                            orders.map(order => (
                                                <tr key={order.id} className="border-t border-[#333] hover:bg-[#303030] transition-colors">
                                                    <td className="px-5 py-5">
                                                        <p className="text-sm font-semibold text-[#FBADCC]">#{order.id}</p>
                                                    </td>
                                                    <td className="px-5 py-5">
                                                        <p className="text-sm font-medium">{order.user?.name || "-"}</p>
                                                        <p className="text-xs text-gray-400 mt-1">{order.user?.email || "-"}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{order.user?.phone || "-"}</p>
                                                    </td>
                                                    <td className="px-5 py-5">
                                                        <p className="text-sm font-semibold">{getTicketCount(order)} Tickets</p>
                                                        <div className="mt-2 space-y-1">
                                                            {(order.details || []).map((detail, index) => (
                                                                <p key={detail.id || index} className="text-xs text-gray-400">
                                                                    {detail.tier?.name || "Ticket"} × {detail.quantity || 0}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5">
                                                        <p className="text-sm font-bold text-[#FBADCC]">{formatRupiah(order.total_price)}</p>
                                                    </td>
                                                    <td className="px-5 py-5 text-center">
                                                        <span className={`inline-flex text-xs font-medium px-3 py-1.5 rounded-full capitalize whitespace-nowrap ${getStatusStyle(order.status)}`}>
                                                            {order.status || "-"}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-5 text-right">
                                                        <p className="text-sm text-gray-300">{formatDate(order.created_at)}</p>
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
                                <button onClick={() => setPage(page - 1)} disabled={page === 1 || loading} className="px-4 py-2 bg-[#272727] rounded-xl text-sm border border-[#333] disabled:opacity-40">
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">{page}</span>
                                <button onClick={() => setPage(page + 1)} disabled={page >= pagination.totalPages || loading} className="px-4 py-2 bg-[#272727] rounded-xl text-sm border border-[#333] disabled:opacity-40">
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
