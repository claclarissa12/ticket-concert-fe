"use client"
import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { useCallback, useEffect, useState } from "react"
import { adminApi } from "../../../../lib/api"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

export default function SuperAdminTransactions() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [page, setPage] = useState(1)
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 10

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true)
            setError("")
            const response = await adminApi.getAllOrders({
                page,
                limit,
                status: activeTab === "all" ? "" : activeTab
            })
            const result = response.data || {}
            setTransactions(Array.isArray(result.items) ? result.items : [])
            setTotalOrders(Number(result.pagination?.total || 0))
            setTotalPages(Number(result.pagination?.total_pages || 1))
        } catch (err) {
            setError(err.message || "Gagal mengambil data transaksi")
            setTransactions([])
        } finally {
            setLoading(false)
        }
    }, [page, activeTab])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    const formatPrice = (price) => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(Number(price || 0))

    const formatDate = (date) => {
        if (!date) return "-"
        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "paid": return "bg-green-500/20 text-green-400"
            case "pending": return "bg-yellow-500/20 text-yellow-400"
            case "cancelled": return "bg-red-500/20 text-red-400"
            case "expired": return "bg-gray-500/20 text-gray-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case "paid": return "Paid"
            case "pending": return "Pending"
            case "cancelled": return "Cancelled"
            case "expired": return "Expired"
            default: return status || "-"
        }
    }

    const filteredTransactions = transactions.filter((transaction) => {
        const buyer = transaction.user?.name || ""
        const event = transaction.concert?.title || ""
        const search = searchTerm.toLowerCase()
        return buyer.toLowerCase().includes(search) || event.toLowerCase().includes(search)
    })

    const getAmount = (transaction) => {
        return transaction.total_amount || transaction.total_price || transaction.amount || 0
    }

    const handleTabChange = (status) => {
        setActiveTab(status)
        setPage(1)
    }

    const chartData = ["paid", "pending", "cancelled", "expired"].map((status) => ({
        status: getStatusLabel(status),
        total: transactions
            .filter((t) => t.status === status)
            .reduce((sum, t) => sum + Number(getAmount(t)), 0)
    }))

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Memantau Transaksi</h1>
                            <p className="text-gray-400 text-sm mt-1">Monitor all transactions across platform</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#1a1a1a] rounded-xl p-1 border border-[#333]">
                                {["all", "paid", "pending", "cancelled", "expired"].map((status) => (
                                    <button key={status} onClick={() => handleTabChange(status)} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === status ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>
                                        {status === "all" ? "All" : getStatusLabel(status)}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2.5 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                            />
                        </div>
                        <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] mb-6">
                            <h2 className="text-lg font-semibold mb-4">Total Amount per Status</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                        <XAxis dataKey="status" stroke="#888" fontSize={12} />
                                        <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
                                            formatter={(value) => formatPrice(value)}
                                        />
                                        <Bar dataKey="total" fill="#FBADCC" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-[#272727] rounded-2xl overflow-x-auto border border-[#333]">
                            <div className="min-w-[800px]">
                                <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                                    <div className="col-span-3">Transaction</div>
                                    <div className="col-span-2">Buyer</div>
                                    <div className="col-span-2">Event</div>
                                    <div className="col-span-2">Amount</div>
                                    <div className="col-span-1 text-center">Status</div>
                                    <div className="col-span-2 text-right">Date</div>
                                </div>
                                {loading ? (
                                    <div className="text-center py-16 text-gray-400">Loading transactions...</div>
                                ) : error ? (
                                    <div className="text-center py-16 text-red-400">{error}</div>
                                ) : filteredTransactions.length === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="text-6xl mb-4">💳</div>
                                        <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
                                        <p className="text-gray-400">No transactions match your current filter</p>
                                    </div>
                                ) : (
                                    filteredTransactions.map((transaction) => (
                                        <div key={transaction.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333] last:border-0">
                                            <div className="col-span-3 min-w-0">
                                                <p className="text-sm font-medium truncate">Order #{transaction.id}</p>
                                                <p className="text-xs text-gray-400">{transaction.payment_method || transaction.payment_type || "Transaction"}</p>
                                            </div>
                                            <div className="col-span-2 min-w-0">
                                                <p className="text-sm truncate">{transaction.user?.name || "-"}</p>
                                                <p className="text-xs text-gray-400 truncate">{transaction.user?.email || ""}</p>
                                            </div>
                                            <div className="col-span-2 text-sm truncate">{transaction.concert?.title || "-"}</div>
                                            <div className="col-span-2 text-sm font-bold text-[#FBADCC]">{formatPrice(getAmount(transaction))}</div>
                                            <div className="col-span-1 text-center">
                                                <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                                                    {getStatusLabel(transaction.status)}
                                                </span>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <p className="text-sm text-gray-400">{formatDate(transaction.created_at)}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">Showing {filteredTransactions.length} of {totalOrders} transactions</p>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1 || loading} className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] disabled:opacity-40">
                                    Previous
                                </button>
                                <span className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">{page}</span>
                                <button onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} disabled={page >= totalPages || loading} className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] disabled:opacity-40">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}