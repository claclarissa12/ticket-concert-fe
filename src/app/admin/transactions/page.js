"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import { useState } from "react"

export default function SuperAdminTransactions() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const transactions = [
        { id: 1, event: "Konser Melodi Senja", buyer: "Admin", tickets: 1, amount: 1500000, status: "paid", date: "15 Nov 2026", time: "12:00", method: "Bank Transfer", image: "https://images.unsplash.com/photo-1540039155732-684736882273?w=200" },
        { id: 2, event: "Konser Melodi Senja", buyer: "Admin", tickets: 1, amount: 750000, status: "pending", date: "16 Nov 2026", time: "15:00", method: "QRIS", image: "https://images.unsplash.com/photo-1540039155732-684736882273?w=200" },
        { id: 3, event: "Neon Party 2026", buyer: "Admin", tickets: 2, amount: 4000000, status: "paid", date: "18 Nov 2026", time: "10:00", method: "Credit Card", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200" },
        { id: 4, event: "Rock In Solo", buyer: "Admin", tickets: 1, amount: 300000, status: "cancelled", date: "05 Okt 2026", time: "10:00", method: "OVO", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" },
        { id: 5, event: "Konser Melodi Senja", buyer: "Admin", tickets: 1, amount: 500000, status: "expired", date: "10 Nov 2026", time: "10:00", method: "GoPay", image: "https://images.unsplash.com/photo-1540039155732-684736882273?w=200" },
    ]

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
    }

    const getStatusColor = (status) => {
        switch(status) {
            case "paid": return "bg-green-500/20 text-green-400"
            case "pending": return "bg-yellow-500/20 text-yellow-400"
            case "cancelled": return "bg-red-500/20 text-red-400"
            case "expired": return "bg-gray-500/20 text-gray-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const getStatusLabel = (status) => {
        switch(status) {
            case "paid": return "Paid"
            case "pending": return "Pending"
            case "cancelled": return "Cancelled"
            case "expired": return "Expired"
            default: return status
        }
    }

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && transaction.status === activeTab
    })

    const totalRevenue = transactions.filter(t => t.status === "paid").reduce((sum, t) => sum + t.amount, 0)
    const totalCompleted = transactions.filter(t => t.status === "paid").length
    const totalPending = transactions.filter(t => t.status === "pending").length

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Memantau Transaksi</h1>
                            <p className="text-gray-400 text-sm mt-1">Monitor all transactions across platform</p>
                        </div>
                        <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Export
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Total Transactions</p>
                            <p className="text-2xl font-bold">{transactions.length}</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-[#FBADCC]">{formatPrice(totalRevenue)}</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Completed</p>
                            <p className="text-2xl font-bold text-green-400">{totalCompleted}</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Pending</p>
                            <p className="text-2xl font-bold text-yellow-400">{totalPending}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                            <button onClick={() => setActiveTab("all")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>All</button>
                            <button onClick={() => setActiveTab("paid")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "paid" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Paid</button>
                            <button onClick={() => setActiveTab("pending")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "pending" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Pending</button>
                            <button onClick={() => setActiveTab("cancelled")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "cancelled" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Cancelled</button>
                            <button onClick={() => setActiveTab("expired")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "expired" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Expired</button>
                        </div>
                        <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]" />
                    </div>

                    <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                            <div className="col-span-3">Transaction</div>
                            <div className="col-span-2">Buyer</div>
                            <div className="col-span-2">Event</div>
                            <div className="col-span-1 text-center">Tickets</div>
                            <div className="col-span-1">Amount</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-2 text-right">Date</div>
                        </div>

                        {filteredTransactions.map((transaction) => (
                            <div key={transaction.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333] last:border-0">
                                <div className="col-span-3">
                                    <div className="flex items-center gap-3">
                                        <img src={transaction.image} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">{transaction.event}</p>
                                            <p className="text-xs text-gray-400">{transaction.method}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm">{transaction.buyer}</p>
                                </div>
                                <div className="col-span-2 text-sm truncate">{transaction.event}</div>
                                <div className="col-span-1 text-center text-sm">{transaction.tickets}</div>
                                <div className="col-span-1 text-sm font-bold text-[#FBADCC]">{formatPrice(transaction.amount)}</div>
                                <div className="col-span-1 text-center">
                                    <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                                        {getStatusLabel(transaction.status)}
                                    </span>
                                </div>
                                <div className="col-span-2 text-right">
                                    <p className="text-sm text-gray-400">{transaction.date}</p>
                                    <p className="text-xs text-gray-500">{transaction.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">💳</div>
                            <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
                            <p className="text-gray-400">No transactions match your current filter</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing {filteredTransactions.length} of {transactions.length} transactions</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Previous</button>
                            <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">1</button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}