// app/user/orders/[orderId]/page.js
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import BackButton from "@/components/cards/back"

const orderData = {
    id: "TIX-20261009-8842",
    eventTitle: "Tom Jones (21+)",
    eventDate: "Sun • Oct 04, 2026 • 7:00 PM",
    venue: "The Hall at Live!, Hanover, MD",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
    section: "Section Gold • Row G",
    ticketType: "VIP Ticket",
    quantity: 2,
    subtotal: 6800000,
    adminFee: 6000,
    tax: 66000,
    total: 6872000,
    status: "paid",
    orderDate: "09 Okt 2026, 14:32 WIB",
    paidAt: "09 Okt 2026, 14:35 WIB",
    paymentMethod: "Bank Mandiri",
    customer: {
        name: "Budi Santoso",
        email: "budi@gmail.com",
        phone: "081234567890",
        ktp: "3271234567890001",
    },
    tickets: [
        {
            id: "TKT-001",
            holder: "Budi Santoso",
            seat: "G-12",
            qrCode: "TIX-20261009-8842-001",
        },
        {
            id: "TKT-002",
            holder: "Budi Santoso",
            seat: "G-13",
            qrCode: "TIX-20261009-8842-002",
        },
    ],
}

const statusConfig = {
    paid: {
        label: "Pembayaran Berhasil",
        sublabel: "Tiket Anda sudah aktif",
        className: "bg-green-500/10 text-green-400 border-green-500/20",
        icon: "check",
    },
    pending: {
        label: "Menunggu Pembayaran",
        sublabel: "Selesaikan pembayaran Anda",
        className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        icon: "clock",
    },
    expired: {
        label: "Pesanan Kedaluwarsa",
        sublabel: "Waktu pembayaran telah habis",
        className: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: "x",
    },
}

const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID").format(value)

function StatusIcon({ type }) {
    if (type === "check") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        )
    }
    if (type === "clock") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
            </svg>
        )
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

export default function OrderDetailPage() {
    const params = useParams()
    const [timeLeft, setTimeLeft] = useState(300)

    useEffect(() => {
        if (orderData.status !== "pending") return
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const status = statusConfig[orderData.status]

    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
                <BackButton className="mb-6" />

                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Detail Pesanan</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Informasi lengkap pesanan tiket Anda
                    </p>
                </div>

                <div className={`flex items-center gap-3 p-4 rounded-xl border mb-6 ${status.className}`}>
                    <div className="w-10 h-10 rounded-full bg-current/10 flex items-center justify-center flex-shrink-0">
                        <StatusIcon type={status.icon} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{status.label}</p>
                        <p className="text-xs opacity-80">{status.sublabel}</p>
                    </div>
                </div>

                {orderData.status === "pending" && (
                    <div className="bg-[#1a1a1a] border border-[#FBADCC]/30 rounded-xl p-5 mb-6 text-center">
                        <p className="text-xs text-gray-400 mb-2">Selesaikan pembayaran dalam</p>
                        <p className="text-3xl font-bold text-[#FBADCC] font-mono tracking-wider mb-1">
                            {formatTime(timeLeft)}
                        </p>
                        <p className="text-[11px] text-gray-500">
                            Pesanan akan otomatis dibatalkan jika waktu habis
                        </p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Informasi Event</h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <img
                                    src={orderData.image}
                                    alt={orderData.eventTitle}
                                    className="w-full sm:w-32 h-40 sm:h-32 rounded-xl object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold leading-snug">
                                        {orderData.eventTitle}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">{orderData.eventDate}</p>
                                    <p className="text-xs text-gray-500">{orderData.venue}</p>

                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        <span className="text-xs px-2 py-0.5 bg-[#272727] rounded-md">
                                            {orderData.section}
                                        </span>
                                        <span className="text-xs px-2 py-0.5 bg-[#272727] rounded-md">
                                            {orderData.ticketType}
                                        </span>
                                        <span className="text-xs text-[#FBADCC] font-semibold">
                                            x{orderData.quantity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {orderData.status === "paid" && (
                            <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                                <h2 className="text-sm font-semibold mb-4">Tiket Anda</h2>
                                <div className="space-y-3">
                                    {orderData.tickets.map((ticket, idx) => (
                                        <div
                                            key={ticket.id}
                                            className="flex items-center gap-4 p-3 bg-[#141414] border border-[#272727] rounded-xl"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                                <div className="grid grid-cols-4 gap-0.5">
                                                    {[...Array(16)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-2 h-2 ${(i + idx) % 3 === 0 ? "bg-black" : "bg-white"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-gray-500">Tiket {idx + 1}</p>
                                                <p className="text-sm font-semibold">{ticket.holder}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    Seat: {ticket.seat}
                                                </p>
                                                <p className="text-[10px] font-mono text-[#FBADCC] mt-1 truncate">
                                                    {ticket.qrCode}
                                                </p>
                                            </div>
                                            <button className="px-3 py-2 bg-[#FBADCC] text-black rounded-lg text-xs font-semibold hover:bg-[#f8a0c4] transition-colors flex-shrink-0">
                                                Unduh
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Data Pemesan</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[11px] text-gray-500 mb-1">Nama</p>
                                    <p className="text-sm">{orderData.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-gray-500 mb-1">Email</p>
                                    <p className="text-sm truncate">{orderData.customer.email}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-gray-500 mb-1">Nomor Telepon</p>
                                    <p className="text-sm">{orderData.customer.phone}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-gray-500 mb-1">Nomor KTP</p>
                                    <p className="text-sm font-mono">{orderData.customer.ktp}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Ringkasan Pembayaran</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>IDR {formatRupiah(orderData.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Biaya Admin</span>
                                    <span>IDR {formatRupiah(orderData.adminFee)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Pajak</span>
                                    <span>IDR {formatRupiah(orderData.tax)}</span>
                                </div>
                                <div className="border-t border-[#272727] pt-3 mt-3 flex justify-between font-semibold text-white">
                                    <span>Total</span>
                                    <span className="text-[#FBADCC]">IDR {formatRupiah(orderData.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Info Pesanan</h2>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">ID Pesanan</span>
                                    <span className="font-mono text-[#FBADCC]">{orderData.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tanggal Pesan</span>
                                    <span>{orderData.orderDate}</span>
                                </div>
                                {orderData.paidAt && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Tanggal Bayar</span>
                                        <span>{orderData.paidAt}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Metode</span>
                                    <span>{orderData.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {orderData.status === "pending" && (
                                <Link href={`/user/checkout/[id]`}>
                                    <button className="w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-xl transition-colors text-sm">
                                        Lanjutkan Pembayaran
                                    </button>
                                </Link>
                            )}
                            {orderData.status === "paid" && (
                                <>
                                    <button className="w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-xl transition-colors text-sm">
                                        Unduh Semua Tiket
                                    </button>
                                    <button className="w-full bg-transparent border border-[#333] text-gray-300 hover:text-white hover:border-[#555] font-semibold py-3 rounded-xl transition-colors text-sm">
                                        Unduh Invoice
                                    </button>
                                </>
                            )}
                            {orderData.status === "expired" && (
                                <Link href="/user/events">
                                    <button className="w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-xl transition-colors text-sm">
                                        Beli Ulang Tiket
                                    </button>
                                </Link>
                            )}
                            <button className="w-full text-gray-400 hover:text-white text-sm py-2 transition-colors">
                                Hubungi Customer Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}