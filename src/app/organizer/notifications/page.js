"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import { useState } from "react"

export default function OrganizerNotifications() {
    const [activeTab, setActiveTab] = useState("all")

    const notifications = [
        { id: 1, type: "transaction", title: "New Ticket Purchase", message: "Ahmad Fauzi purchased 2 VIP tickets for Nassar Tour 2026", time: "2 minutes ago", read: false, icon: "🎫" },
        { id: 2, type: "system", title: "Event Reminder", message: "Electronic Fest 2026 starts in 3 days. Check all preparations.", time: "1 hour ago", read: false, icon: "📅" },
        { id: 3, type: "transaction", title: "Payment Confirmed", message: "Payment for Rock Revolution tickets has been confirmed. IDR 900.000", time: "3 hours ago", read: false, icon: "💳" },
        { id: 4, type: "promo", title: "Special Offer", message: "Create 3 events and get 10% commission bonus this month!", time: "5 hours ago", read: false, icon: "🎯" },
        { id: 5, type: "system", title: "Ticket Alert", message: "Nassar Tour 2026 ticket quota is running low (78/100 remaining)", time: "Yesterday", read: true, icon: "⚠️" },
        { id: 6, type: "transaction", title: "Refund Request", message: "Dewi Lestari requested a refund for Rock Revolution tickets. IDR 900.000", time: "Yesterday", read: true, icon: "↩️" },
        { id: 7, type: "system", title: "Security Update", message: "Your account password was successfully changed.", time: "2 days ago", read: true, icon: "🔒" },
        { id: 8, type: "promo", title: "New Feature", message: "QR code check-in now available for all events!", time: "3 days ago", read: true, icon: "✨" },
    ]

    const getTypeColor = (type) => {
        switch(type) {
            case "transaction": return "border-l-[#E21D8F]"
            case "system": return "border-l-blue-500"
            case "promo": return "border-l-green-500"
            default: return "border-l-gray-500"
        }
    }

    const getFilteredNotifications = () => {
        if (activeTab === "all") return notifications
        if (activeTab === "unread") return notifications.filter(n => !n.read)
        return notifications.filter(n => n.type === activeTab)
    }

    const filtered = getFilteredNotifications()
    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Notifications</h1>
                            <p className="text-gray-400 text-sm mt-1">Stay updated with all your event activities</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                Mark All Read
                            </button>
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Clear All
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                            <button 
                                onClick={() => setActiveTab("all")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                All
                            </button>
                            <button 
                                onClick={() => setActiveTab("unread")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "unread" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Unread {unreadCount > 0 && `(${unreadCount})`}
                            </button>
                            <button 
                                onClick={() => setActiveTab("transaction")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "transaction" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Transactions
                            </button>
                            <button 
                                onClick={() => setActiveTab("system")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "system" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                System
                            </button>
                            <button 
                                onClick={() => setActiveTab("promo")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "promo" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Promo
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filtered.length === 0 ? (
                            <div className="bg-[#272727] rounded-2xl p-12 text-center border border-[#333]">
                                <div className="text-6xl mb-4">🔔</div>
                                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                                <p className="text-gray-400">You're all caught up!</p>
                            </div>
                        ) : (
                            filtered.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`bg-[#272727] rounded-xl p-5 hover:bg-[#2f2f2f] transition-colors border border-[#333] border-l-4 ${getTypeColor(notification.type)} ${!notification.read ? 'border-l-[#FBADCC]' : 'border-l-[#333]'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-xl flex-shrink-0">
                                            {notification.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.read && (
                                                        <span className="w-2 h-2 rounded-full bg-[#FBADCC] flex-shrink-0"></span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                                            </div>
                                            <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-300' : 'text-gray-400'}`}>
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-4 mt-3">
                                                <button className="text-xs text-[#FBADCC] hover:underline">
                                                    Mark as Read
                                                </button>
                                                <button className="text-xs text-gray-400 hover:text-white transition-colors">
                                                    Archive
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {filtered.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">Showing {filtered.length} notifications</p>
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
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}