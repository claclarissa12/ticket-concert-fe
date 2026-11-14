"use client"

import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function TicketsPage() {
    const rawTickets = [
        { id: 1, eventTitle: "Konser Melodi Senja", tierName: "VIP", price: 1500000, date: "01 Des 2026", sold: 0, quota: 100, status: "Active" },
        { id: 2, eventTitle: "Konser Melodi Senja", tierName: "Regular", price: 750000, date: "01 Des 2026", sold: 0, quota: 500, status: "Active" },
        { id: 3, eventTitle: "Konser Melodi Senja", tierName: "Festival", price: 500000, date: "01 Des 2026", sold: 0, quota: 1000, status: "Active" },
        { id: 4, eventTitle: "Neon Party 2026", tierName: "VIP EDM", price: 2000000, date: "25 Nov 2026", sold: 0, quota: 50, status: "Upcoming" },
        { id: 5, eventTitle: "Rock In Solo", tierName: "Presale", price: 300000, date: "15 Okt 2026", sold: 0, quota: 200, status: "Sold Out" }
    ]

    const tickets = rawTickets.map(ticket => ({
        ...ticket,
        price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(ticket.price)
    }))

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active": return "bg-green-500/20 text-green-400"
            case "Sold Out": return "bg-red-500/20 text-red-400"
            case "Upcoming": return "bg-blue-500/20 text-blue-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const getBarStyle = (status) => {
        switch (status) {
            case "Sold Out": return "bg-gradient-to-r from-red-500 to-red-600"
            case "Upcoming": return "bg-gradient-to-r from-blue-400 to-blue-600"
            default: return "bg-gradient-to-r from-[#E21D8F] to-[#FBADCC]"
        }
    }

    return (
        <EoGuard>

            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tickets</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage all tickets across events</p>
                            </div>
                            <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25 flex items-center gap-2">
                                Export Data
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Total Tickets</p>
                                <p className="text-2xl font-bold">1.850</p>
                            </div>
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Sold</p>
                                <p className="text-2xl font-bold text-blue-400">0</p>
                            </div>
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Available</p>
                                <p className="text-2xl font-bold text-[#FBADCC]">1.850</p>
                            </div>
                            <div className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                <p className="text-sm text-gray-400">Revenue</p>
                                <p className="text-2xl font-bold text-[#FBADCC]">Rp 0</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                                <option>All Events</option>
                                <option>Konser Melodi Senja</option>
                                <option>Neon Party 2026</option>
                                <option>Rock In Solo</option>
                            </select>
                            <select className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] transition-colors text-sm">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Sold Out</option>
                                <option>Upcoming</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
                            />
                        </div>

                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                            <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                                <div className="col-span-3">Event / Tier</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-2 text-center">Sold / Quota</div>
                                <div className="col-span-1 text-center">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {tickets.map((ticket, index) => (
                                <div key={ticket.id} className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors ${index !== tickets.length - 1 ? 'border-b border-[#333]' : ''}`}>
                                    <div className="col-span-3">
                                        <div>
                                            <p className="font-medium text-sm">{ticket.eventTitle}</p>
                                            <p className="text-xs text-gray-400">{ticket.tierName}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-sm font-medium text-[#FBADCC]">{ticket.price}</div>
                                    <div className="col-span-2 text-sm text-gray-400">{ticket.date}</div>
                                    <div className="col-span-2 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-medium">{ticket.sold}/{ticket.quota}</span>
                                            <div className="w-full max-w-[100px] bg-[#1a1a1a] rounded-full h-1.5 mt-1">
                                                <div className={`${getBarStyle(ticket.status)} rounded-full h-1.5`} style={{ width: `${ticket.quota > 0 ? (ticket.sold / ticket.quota) * 100 : 0}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 text-center">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(ticket.status)}`}>{ticket.status}</span>
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2">
                                        <Link href={`/organizer/events/${ticket.id}/tickets`} className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                            Manage
                                        </Link>
                                        <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">Showing 5 of 5 tickets</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                    1
                                </button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
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