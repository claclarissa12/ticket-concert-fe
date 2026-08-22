"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function TransactionsPage() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Transactions</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage all payment transactions</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                </svg>
                                Export
                            </button>
                            <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                + New Transaction
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Total Transactions</p>
                            <p className="text-2xl font-bold">1,234</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-[#FBADCC]">Rp 4.2B</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Successful</p>
                            <p className="text-2xl font-bold text-green-400">1,180</p>
                        </div>
                        <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                            <p className="text-sm text-gray-400">Pending</p>
                            <p className="text-2xl font-bold text-yellow-400">54</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Events</option>
                            <option>Nassar Tour 2026</option>
                            <option>Electronic Fest 2026</option>
                            <option>Jazz Night</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Status</option>
                            <option>Success</option>
                            <option>Pending</option>
                            <option>Failed</option>
                        </select>
                        <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                            <option>All Payment Methods</option>
                            <option>Bank Transfer</option>
                            <option>Credit Card</option>
                            <option>QRIS</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                        />
                    </div>

                    <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                            <div className="col-span-2">Transaction ID</div>
                            <div className="col-span-2">Event</div>
                            <div className="col-span-2">Buyer</div>
                            <div className="col-span-2">Amount</div>
                            <div className="col-span-1 text-center">Tickets</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-2 text-right">Date</div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-[#FBADCC]">#TRX-001</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm">Nassar Tour 2026</p>
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <p className="text-sm">Ahmad Fauzi</p>
                                    <p className="text-xs text-gray-400">ahmad@email.com</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-bold text-[#FBADCC]">Rp 3.400.000</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">2</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Success</span>
                            </div>
                            <div className="col-span-2 text-right">
                                <p className="text-sm text-gray-400">20 Mei 2026</p>
                                <p className="text-xs text-gray-500">14:30</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-[#FBADCC]">#TRX-002</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm">Electronic Fest 2026</p>
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <p className="text-sm">Siti Rahma</p>
                                    <p className="text-xs text-gray-400">siti@email.com</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-bold text-[#FBADCC]">Rp 1.200.000</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">4</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">Pending</span>
                            </div>
                            <div className="col-span-2 text-right">
                                <p className="text-sm text-gray-400">21 Mei 2026</p>
                                <p className="text-xs text-gray-500">09:15</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-[#FBADCC]">#TRX-003</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm">Jazz Night</p>
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <p className="text-sm">Budi Santoso</p>
                                    <p className="text-xs text-gray-400">budi@email.com</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-bold text-[#FBADCC]">Rp 250.000</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">1</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Success</span>
                            </div>
                            <div className="col-span-2 text-right">
                                <p className="text-sm text-gray-400">22 Mei 2026</p>
                                <p className="text-xs text-gray-500">16:45</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333]">
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-[#FBADCC]">#TRX-004</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm">Rock Revolution</p>
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <p className="text-sm">Dewi Lestari</p>
                                    <p className="text-xs text-gray-400">dewi@email.com</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-bold text-[#FBADCC]">Rp 900.000</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">3</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-400">Failed</span>
                            </div>
                            <div className="col-span-2 text-right">
                                <p className="text-sm text-gray-400">23 Mei 2026</p>
                                <p className="text-xs text-gray-500">11:20</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors">
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-[#FBADCC]">#TRX-005</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm">Pop Music Festival</p>
                            </div>
                            <div className="col-span-2">
                                <div>
                                    <p className="text-sm">Rina Andini</p>
                                    <p className="text-xs text-gray-400">rina@email.com</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-bold text-[#FBADCC]">Rp 2.400.000</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-sm">2</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400">Success</span>
                            </div>
                            <div className="col-span-2 text-right">
                                <p className="text-sm text-gray-400">24 Mei 2026</p>
                                <p className="text-xs text-gray-500">08:00</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing 5 of 1,234 transactions</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                1
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                2
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                3
                            </button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}