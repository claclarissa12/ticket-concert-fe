"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import { useState } from "react"

export default function OrganizerNotifications() {
    const [activeTab, setActiveTab] = useState("all")

    const notifications = [
        { id: 1, type: "transaction", title: "Pembelian Tiket Baru", message: "Ahmad Fauzi membeli 2 tiket VIP untuk Nassar Tour 2026", time: "2 menit yang lalu", read: false },
        { id: 2, type: "system", title: "Pengingat Acara", message: "Electronic Fest 2026 dimulai dalam 3 hari. Periksa semua persiapan.", time: "1 jam yang lalu", read: false },
        { id: 3, type: "transaction", title: "Pembayaran Dikonfirmasi", message: "Pembayaran untuk tiket Rock Revolution telah dikonfirmasi. IDR 900.000", time: "3 jam yang lalu", read: false },
        { id: 4, type: "promo", title: "Penawaran Spesial", message: "Buat 3 acara dan dapatkan bonus komisi 10% bulan ini!", time: "5 jam yang lalu", read: false },
        { id: 5, type: "system", title: "Peringatan Tiket", message: "Kuota tiket Nassar Tour 2026 hampir habis (tersisa 78/100)", time: "Kemarin", read: true },
        { id: 6, type: "transaction", title: "Permintaan Pengembalian Dana", message: "Dewi Lestari meminta pengembalian dana untuk tiket Rock Revolution. IDR 900.000", time: "Kemarin", read: true },
        { id: 7, type: "system", title: "Pembaruan Keamanan", message: "Kata sandi akun Anda berhasil diubah.", time: "2 hari yang lalu", read: true },
        { id: 8, type: "promo", title: "Fitur Baru", message: "Check-in kode QR sekarang tersedia untuk semua acara!", time: "3 hari yang lalu", read: true },
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
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Notifikasi</h1>
                            <p className="text-gray-400 text-sm mt-1">Tetap terupdate dengan semua aktivitas acara Anda</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                Tandai Semua Dibaca
                            </button>
                            <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Hapus Semua
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                            <button 
                                onClick={() => setActiveTab("all")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Semua
                            </button>
                            <button 
                                onClick={() => setActiveTab("unread")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "unread" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Belum Dibaca {unreadCount > 0 && `(${unreadCount})`}
                            </button>
                            <button 
                                onClick={() => setActiveTab("transaction")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "transaction" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Transaksi
                            </button>
                            <button 
                                onClick={() => setActiveTab("system")}
                                className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "system" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Sistem
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
                                <div className="w-16 h-16 mx-auto mb-4 text-gray-500 flex items-center justify-center">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Tidak ada notifikasi</h3>
                                <p className="text-gray-400">Anda sudah melihat semuanya!</p>
                            </div>
                        ) : (
                            filtered.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`bg-[#272727] rounded-xl p-5 hover:bg-[#2f2f2f] transition-colors border border-[#333] border-l-4 ${getTypeColor(notification.type)} ${!notification.read ? 'border-l-[#FBADCC]' : 'border-l-[#333]'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-[#1a1a1a]" />
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
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {filtered.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">Menampilkan {filtered.length} notifikasi</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Sebelumnya
                                </button>
                                <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                    1
                                </button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    2
                                </button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}