"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

export default function SuperAdminTransactions() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const transactions = [
        { id: 1, event: "Nassar Tour 2026", organizer: "Event Organizer Corp", buyer: "Ahmad Fauzi", tickets: 2, amount: "Rp 3.400.000", status: "Completed", date: "20 Mei 2026", time: "14:30", method: "Bank Transfer", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" },
        { id: 2, event: "Electronic Fest 2026", organizer: "Festival Pro", buyer: "Siti Rahma", tickets: 4, amount: "Rp 1.200.000", status: "Pending", date: "21 Mei 2026", time: "09:15", method: "Credit Card", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
        { id: 3, event: "Jazz Night", organizer: "Music Lounge", buyer: "Budi Santoso", tickets: 1, amount: "Rp 250.000", status: "Completed", date: "22 Mei 2026", time: "16:45", method: "QRIS", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200" },
        { id: 4, event: "Rock Revolution", organizer: "Rock Empire", buyer: "Dewi Lestari", tickets: 3, amount: "Rp 900.000", status: "Failed", date: "23 Mei 2026", time: "11:20", method: "Bank Transfer", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" },
        { id: 5, event: "Pop Music Festival", organizer: "Pop Culture", buyer: "Rina Andini", tickets: 2, amount: "Rp 2.400.000", status: "Completed", date: "24 Mei 2026", time: "08:00", method: "Credit Card", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
        { id: 6, event: "EDM Night", organizer: "Electronic Dreams", buyer: "Andi Wijaya", tickets: 5, amount: "Rp 2.500.000", status: "Pending", date: "25 Mei 2026", time: "13:30", method: "QRIS", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200" },
        { id: 7, event: "Acoustic Session", organizer: "Music Lounge", buyer: "Nina Sari", tickets: 1, amount: "Rp 150.000", status: "Completed", date: "26 Mei 2026", time: "10:00", method: "Bank Transfer", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" },
        { id: 8, event: "Metal Fest", organizer: "Rock Empire", buyer: "Rizki Pratama", tickets: 2, amount: "Rp 700.000", status: "Refunded", date: "27 Mei 2026", time: "15:20", method: "Credit Card", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
    ]

    const getStatusColor = (status) => {
        switch(status) {
            case "Completed": return "bg-green-500/20 text-green-400"
            case "Pending": return "bg-yellow-500/20 text-yellow-400"
            case "Failed": return "bg-red-500/20 text-red-400"
            case "Refunded": return "bg-purple-500/20 text-purple-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             transaction.organizer.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && transaction.status === activeTab
    })

    const totalRevenue = transactions.reduce((sum, t) => {
        const amount = parseInt(t.amount.replace(/[^0-9]/g, ''))
        return sum + amount
    }, 0)

    const totalCompleted = transactions.filter(t => t.status === "Completed").length
    const totalPending = transactions.filter(t => t.status === "Pending").length

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
                            <p className="text-2xl font-bold text-[#FBADCC]">Rp {new Intl.NumberFormat('id-ID').format(totalRevenue / 1000)}B</p>
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
                            <button onClick={() => setActiveTab("Completed")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Completed" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Completed</button>
                            <button onClick={() => setActiveTab("Pending")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Pending" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Pending</button>
                            <button onClick={() => setActiveTab("Failed")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Failed" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Failed</button>
                            <button onClick={() => setActiveTab("Refunded")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "Refunded" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Refunded</button>
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
                                    <p className="text-xs text-gray-400">{transaction.organizer}</p>
                                </div>
                                <div className="col-span-2 text-sm truncate">{transaction.event}</div>
                                <div className="col-span-1 text-center text-sm">{transaction.tickets}</div>
                                <div className="col-span-1 text-sm font-bold text-[#FBADCC]">{transaction.amount}</div>
                                <div className="col-span-1 text-center">
                                    <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
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
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">2</button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}