// app/user/orders/page.js
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import UserNavbar from "@/components/layout/UserNavbar"
import Footer from "@/components/layout/footer"

/* ------------------------------------------------------------------ */
/* Data (ganti dengan data dari API / database)                        */
/* ------------------------------------------------------------------ */

const initialOrders = [
    {
        id: "TIX-20261009-8842",
        eventTitle: "Tom Jones (21+)",
        eventDate: "2026-10-04",
        eventTime: "19.00",
        venue: "The Hall at Live!, Hanover, MD",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
        section: "Section Gold • Row G",
        ticketType: "VIP Ticket",
        quantity: 2,
        total: 6872000,
        status: "paid",
        orderDate: "09 Okt 2026",
    },
    {
        id: "TIX-20261008-7712",
        eventTitle: "Nassar Tour 2026",
        eventDate: "2026-11-15",
        eventTime: "20.00",
        venue: "Jakarta International Stadium",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
        section: "Section VIP • Row A",
        ticketType: "VIP Ticket",
        quantity: 1,
        total: 3500000,
        status: "pending",
        orderDate: "08 Okt 2026",
        payBefore: "13 Okt 2026, 14.00 WIB",
    },
    {
        id: "TIX-20261005-3391",
        eventTitle: "Nassar Horizon World Tour",
        eventDate: "2027-07-22",
        eventTime: "19.00",
        venue: "Jakarta International Stadium",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
        section: "Section Silver • Row C",
        ticketType: "Silver Ticket",
        quantity: 3,
        total: 5400000,
        status: "expired",
        orderDate: "05 Okt 2026",
    },
    {
        id: "TIX-20261001-1122",
        eventTitle: "Nassar Tour 2026",
        eventDate: "2026-09-20",
        eventTime: "19.00",
        venue: "Jakarta International Stadium",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
        section: "Section Bronze • Row F",
        ticketType: "Bronze Ticket",
        quantity: 2,
        total: 2400000,
        status: "paid",
        orderDate: "01 Okt 2026",
    },
]

const tabs = [
    { id: "all", label: "Semua" },
    { id: "pending", label: "Menunggu" },
    { id: "paid", label: "Berhasil" },
    { id: "expired", label: "Kedaluwarsa" },
]

const statusConfig = {
    paid: { label: "Berhasil", badge: "border-green-500/25 bg-green-500/10 text-green-400", dot: "bg-green-400" },
    pending: { label: "Menunggu pembayaran", badge: "border-yellow-500/25 bg-yellow-500/10 text-yellow-400", dot: "bg-yellow-400" },
    expired: { label: "Kedaluwarsa", badge: "border-red-500/25 bg-red-500/10 text-red-400", dot: "bg-red-400" },
    cancelled: { label: "Dibatalkan", badge: "border-[#333] bg-[#272727] text-gray-400", dot: "bg-gray-500" },
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

// "2026-10-04" -> "Minggu, 4 Oktober 2026" (manual agar sama di server & client)
const formatEventDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number)
    const day = DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
    return `${day}, ${d} ${MONTHS[m - 1]} ${y}`
}
const formatRupiah = (value) => new Intl.NumberFormat("id-ID").format(value)

const FOCUS =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBADCC]"
const BTN_PRIMARY = `block w-full rounded-lg bg-[#FBADCC] px-4 py-2.5 text-center text-xs font-semibold text-black transition-colors hover:bg-[#f8a0c4] ${FOCUS}`
const BTN_OUTLINE = `block w-full rounded-lg border border-[#333] px-4 py-2.5 text-center text-xs font-semibold text-gray-300 transition-colors hover:border-[#555] hover:text-white ${FOCUS}`

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function PinIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
            <path fillRule="evenodd" d="M10 18s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10zm0-7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
            <rect x="3" y="4.5" width="14" height="12" rx="2" />
            <path d="M3 8.5h14M7 3v3M13 3v3" strokeLinecap="round" />
        </svg>
    )
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="h-4 w-4">
            <circle cx="9" cy="9" r="5.5" />
            <path d="M13.5 13.5L17 17" strokeLinecap="round" />
        </svg>
    )
}

function StatusBadge({ status }) {
    const s = statusConfig[status]
    return (
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${s.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
            {s.label}
        </span>
    )
}

function Stat({ label, value, hint }) {
    return (
        <div className="rounded-2xl border border-[#272727] bg-[#1a1a1a] px-4 py-4 sm:px-5">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-1 text-xl font-semibold sm:text-2xl">{value}</p>
            {hint && <p className="mt-0.5 text-[11px] text-gray-500">{hint}</p>}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Order card (ticket-style)                                           */
/* ------------------------------------------------------------------ */

function OrderCard({ order, confirming, onAskCancel, onConfirmCancel, onDismissCancel }) {
    return (
        <article className="overflow-hidden rounded-2xl border border-[#272727] bg-[#1a1a1a] transition-colors hover:border-[#3a3a3a] md:flex">
            {/* Gambar */}
            <div className="relative h-44 shrink-0 md:h-auto md:w-44 lg:w-52">
                <img
                    src={order.image}
                    alt={order.eventTitle}
                    loading="lazy"
                    className={`h-full w-full object-cover ${order.status === "expired" || order.status === "cancelled" ? "grayscale" : ""}`}
                />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1 p-5">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <p className="truncate font-mono text-[11px] text-[#FBADCC]">{order.id}</p>
                    <p className="text-[11px] text-gray-500">Dipesan {order.orderDate}</p>
                </div>

                <h3 className="mt-2 text-base font-semibold leading-snug sm:text-lg">{order.eventTitle}</h3>

                <div className="mt-2 space-y-1.5 text-xs text-gray-400">
                    <p className="flex items-center gap-1.5">
                        <CalendarIcon />
                        <span>{formatEventDate(order.eventDate)}, {order.eventTime} WIB</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                        <PinIcon />
                        <span className="truncate">{order.venue}</span>
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-md bg-[#272727] px-2.5 py-1 text-gray-300">{order.section}</span>
                    <span className="rounded-md bg-[#272727] px-2.5 py-1 text-gray-300">{order.ticketType}</span>
                    <span className="rounded-md bg-[#FBADCC]/10 px-2.5 py-1 font-semibold text-[#FBADCC]">
                        {order.quantity} tiket
                    </span>
                </div>
            </div>

            {/* Perforasi: horizontal di mobile, vertikal di md ke atas */}
            <div className="relative h-0 border-t border-dashed border-[#333] md:h-auto md:w-0 md:border-l md:border-t-0" aria-hidden="true">
                <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-[#272727] bg-[#131313]" />
                <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full border border-[#272727] bg-[#131313] md:-bottom-2.5 md:left-[-10px] md:right-auto md:top-auto" />
            </div>

            {/* Stub: status, total, aksi */}
            <div className="flex flex-col gap-4 p-5 md:w-64 md:shrink-0">
                <div className="flex items-start justify-between gap-3 md:flex-col md:items-start">
                    <StatusBadge status={order.status} />
                    <div className="text-right md:text-left">
                        <p className="text-[11px] text-gray-500">Total pembayaran</p>
                        <p className="text-lg font-bold text-[#FBADCC]">IDR {formatRupiah(order.total)}</p>
                    </div>
                </div>

                {order.status === "pending" && order.payBefore && (
                    <p className="rounded-lg bg-yellow-500/10 px-3 py-2 text-[11px] leading-relaxed text-yellow-300">
                        Selesaikan pembayaran sebelum {order.payBefore}.
                    </p>
                )}

                <div className="mt-auto flex flex-col gap-2 sm:flex-row md:flex-col">
                    {order.status === "pending" && !confirming && (
                        <>
                            <Link href={`/user/checkout/${order.id}`} className={`${BTN_PRIMARY} sm:flex-1`}>
                                Lanjutkan pembayaran
                            </Link>
                            <button type="button" onClick={() => onAskCancel(order.id)} className={`${BTN_OUTLINE} sm:flex-1`}>
                                Batalkan pesanan
                            </button>
                        </>
                    )}

                    {order.status === "pending" && confirming && (
                        <div role="alertdialog" aria-label="Konfirmasi pembatalan" className="w-full rounded-xl border border-red-400/30 bg-red-400/5 p-3">
                            <p className="text-xs font-medium">Batalkan pesanan ini?</p>
                            <p className="mt-0.5 text-[11px] text-gray-400">Kursi yang kamu tahan akan dilepas.</p>
                            <div className="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => onConfirmCancel(order.id)}
                                    className={`flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600 ${FOCUS}`}
                                >
                                    Ya, batalkan
                                </button>
                                <button type="button" onClick={onDismissCancel} className={`${BTN_OUTLINE} flex-1 !py-2`}>
                                    Tidak
                                </button>
                            </div>
                        </div>
                    )}

                    {order.status === "paid" && (
                        <>
                            <Link href={`/user/orders/${order.id}`} className={`${BTN_PRIMARY} sm:flex-1`}>
                                Lihat tiket
                            </Link>
                            {/* TODO: sambungkan ke endpoint invoice */}
                            <button type="button" className={`${BTN_OUTLINE} sm:flex-1`}>
                                Unduh invoice
                            </button>
                        </>
                    )}

                    {(order.status === "expired" || order.status === "cancelled") && (
                        <>
                            <Link href="/user/events" className={`${BTN_PRIMARY} sm:flex-1`}>
                                Beli ulang
                            </Link>
                            <Link href={`/user/orders/${order.id}`} className={`${BTN_OUTLINE} sm:flex-1`}>
                                Lihat detail
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </article>
    )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function OrdersPage() {
    const [orders, setOrders] = useState(initialOrders)
    const [activeTab, setActiveTab] = useState("all")
    const [query, setQuery] = useState("")
    const [confirmingId, setConfirmingId] = useState(null)

    const counts = useMemo(() => {
        const c = { all: orders.length, pending: 0, paid: 0, expired: 0 }
        orders.forEach((o) => {
            if (c[o.status] !== undefined) c[o.status] += 1
        })
        return c
    }, [orders])

    const activeTickets = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.quantity, 0)
    const totalSpent = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.total, 0)

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return orders.filter(
            (o) =>
                (activeTab === "all" || o.status === activeTab) &&
                (!q || o.eventTitle.toLowerCase().includes(q) || o.id.toLowerCase().includes(q))
        )
    }, [orders, activeTab, query])

    const cancelOrder = (id) => {
        // TODO: panggil API pembatalan, lalu perbarui state
        setOrders((list) => list.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o)))
        setConfirmingId(null)
    }

    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <UserNavbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
                {/* Judul */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-1 rounded-full bg-[#FBADCC]" />
                        <div>
                            <h1 className="text-xl font-semibold sm:text-2xl">Pesanan saya</h1>
                            <p className="mt-0.5 text-xs text-gray-500">Pantau pembayaran dan akses e-tiketmu di sini.</p>
                        </div>
                    </div>
                    <Link
                        href="/user/events"
                        className={`self-start rounded-lg border border-[#333] px-4 py-2 text-xs font-medium transition-colors hover:border-[#FBADCC] hover:text-[#FBADCC] sm:self-auto ${FOCUS}`}
                    >
                        Cari event
                    </Link>
                </div>

                {/* Ringkasan */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                    <Stat label="Total pesanan" value={orders.length} />
                    <Stat
                        label="Menunggu pembayaran"
                        value={counts.pending}
                        hint={counts.pending > 0 ? "Segera selesaikan" : "Tidak ada tagihan"}
                    />
                    <div className="col-span-2 lg:col-span-1">
                        <Stat label="Tiket aktif" value={activeTickets} hint={`Total belanja IDR ${formatRupiah(totalSpent)}`} />
                    </div>
                </div>

                {/* Filter */}
                <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div
                        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
                        role="group"
                        aria-label="Filter status pesanan"
                    >
                        {tabs.map((tab) => {
                            const active = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    aria-pressed={active}
                                    className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors ${FOCUS} ${active
                                        ? "border-[#FBADCC] bg-[#FBADCC] text-black"
                                        : "border-[#272727] text-gray-400 hover:border-[#444] hover:text-white"
                                        }`}
                                >
                                    {tab.label}
                                    <span
                                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? "bg-black/20 text-black" : "bg-[#272727] text-gray-400"}`}
                                    >
                                        {counts[tab.id]}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="relative lg:w-72">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                            <SearchIcon />
                        </span>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari event atau ID pesanan"
                            aria-label="Cari pesanan"
                            className="w-full rounded-lg border border-[#272727] bg-[#1a1a1a] py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-[#FBADCC] focus:outline-none focus:ring-1 focus:ring-[#FBADCC]"
                        />
                    </div>
                </div>

                {/* Daftar */}
                <div className="mt-6">
                    {filtered.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[#272727] px-6 py-20 text-center">
                            <p className="text-sm font-medium">
                                {query ? "Pesanan tidak ditemukan" : "Belum ada pesanan di kategori ini"}
                            </p>
                            <p className="mx-auto mt-1 max-w-sm text-xs text-gray-500">
                                {query
                                    ? "Coba kata kunci lain atau periksa ID pesananmu."
                                    : "Temukan konser dan festival favoritmu, lalu pesanannya akan muncul di sini."}
                            </p>
                            <div className="mt-5 flex justify-center gap-2">
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className={`rounded-lg border border-[#333] px-4 py-2 text-xs font-medium transition-colors hover:border-[#555] ${FOCUS}`}
                                    >
                                        Hapus pencarian
                                    </button>
                                )}
                                <Link
                                    href="/user/events"
                                    className={`rounded-lg bg-[#FBADCC] px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f8a0c4] ${FOCUS}`}
                                >
                                    Cari event
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {filtered.map((order) => (
                                <li key={order.id}>
                                    <OrderCard
                                        order={order}
                                        confirming={confirmingId === order.id}
                                        onAskCancel={setConfirmingId}
                                        onConfirmCancel={cancelOrder}
                                        onDismissCancel={() => setConfirmingId(null)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}