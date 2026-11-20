// Place at: src/app/user/orders/[orderID]/page.js   (replaces the current file)
// The folder name must stay exactly [orderID] (same capitals), it is read below with useParams().
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import BackButton from "@/components/cards/back"
import { apiFetch } from "../../../../../lib/api.js"

/* ------------------------------------------------------------------ */
/* Config + helpers                                                    */
/* ------------------------------------------------------------------ */

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
    cancelled: {
        label: "Pesanan Dibatalkan",
        sublabel: "Tiket sudah dilepas kembali",
        className: "bg-[#272727] text-gray-300 border-[#333]",
        icon: "x",
    },
}

const ticketStatus = {
    unused: { label: "Belum dipakai", className: "bg-green-500/10 text-green-400" },
    used: { label: "Sudah dipakai", className: "bg-[#272727] text-gray-400" },
    cancelled: { label: "Dibatalkan", className: "bg-red-500/10 text-red-400" },
}

const TZ = "Asia/Jakarta"

const formatRupiah = (value) => new Intl.NumberFormat("id-ID").format(value)

const formatDateTime = (iso) =>
    new Date(iso).toLocaleString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit", timeZone: TZ,
    }) + " WIB"

const formatOrderDate = (iso) =>
    new Date(iso).toLocaleString("id-ID", {
        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: TZ,
    }) + " WIB"

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

// Midtrans payment_type ("bank_transfer", "qris", "credit_card") -> "Bank Transfer"
const methodLabel = (m) => (m ? m.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : null)

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

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function OrderDetailPage() {
    const { orderID } = useParams()
    const router = useRouter()

    const [order, setOrder] = useState(null)
    const [buyer, setBuyer] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState("")

    const [tickets, setTickets] = useState([])
    const [ticketsLoading, setTicketsLoading] = useState(false)
    const [ticketsError, setTicketsError] = useState("")

    const [timeLeft, setTimeLeft] = useState(0)
    const deadlineRef = useRef(0) // timestamp (ms) when a pending order expires

    // GET /orders/:id  ->  { id, status, total_price, payment_method, created_at, expires_at, seconds_left,
    //                        concert: { id, title, date, venue, location },
    //                        details: [{ id, quantity, unit_price, subtotal, tier: { name } }] }
    // (the backend expires the order right here if its time is already over)
    const loadOrder = useCallback(async () => {
        const res = await apiFetch(`/orders/${orderID}`)
        const data = res.data
        deadlineRef.current = Date.now() + (data.seconds_left || 0) * 1000
        setOrder(data)
        setTimeLeft(data.seconds_left || 0)
        return data
    }, [orderID])

    // A paid order has one ticket per bought seat. The tickets endpoint can only be filtered by concert,
    // so we keep the ones that belong to this order's lines, then ask for each ticket's QR image.
    const loadTickets = useCallback(async (o) => {
        setTicketsLoading(true)
        setTicketsError("")
        try {
            const lineIds = new Set((o.details ?? []).map((d) => d.id))
            const list = await apiFetch(`/tickets?concert_id=${o.concert.id}&limit=100`)
            const mine = list.data.items
                .filter((t) => lineIds.has(t.order_detail_id))
                .sort((a, b) => a.id - b.id)

            // GET /tickets/:id  ->  ticket + qr_image (PNG data URL)
            const full = await Promise.all(mine.map((t) => apiFetch(`/tickets/${t.id}`).then((r) => r.data)))
            setTickets(full)
        } catch (err) {
            setTicketsError(err.message)
        } finally {
            setTicketsLoading(false)
        }
    }, [])

    useEffect(() => {
        let cancelled = false

        ;(async () => {
            let token = null
            try {
                token = localStorage.getItem("token")
            } catch {}
            if (!token) {
                router.replace("/login")
                return
            }

            const [orderResult, meResult] = await Promise.allSettled([loadOrder(), apiFetch("/auth/getMe")])
            if (cancelled) return

            if (meResult.status === "fulfilled") setBuyer(meResult.value.data)

            if (orderResult.status === "rejected") {
                const message = orderResult.reason.message
                if (/token|access denied/i.test(message)) {
                    try {
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                    } catch {}
                    router.replace("/login")
                    return
                }
                setLoadError(message)
            } else if (orderResult.value.status === "paid") {
                loadTickets(orderResult.value)
            }
            setLoading(false)
        })()

        return () => {
            cancelled = true
        }
    }, [loadOrder, loadTickets, router])

    // countdown for a pending order, computed from the deadline so it stays correct in a background tab
    useEffect(() => {
        if (order?.status !== "pending") return

        const timer = setInterval(() => {
            const left = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000))
            setTimeLeft(left)

            if (left === 0) {
                clearInterval(timer)
                loadOrder().catch(() => {}) // the backend marks it "expired" and releases the tickets
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [order?.status, order?.id, loadOrder])

    /* -------------------------------------------------------------- */
    /* States                                                          */
    /* -------------------------------------------------------------- */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#131313] text-white flex items-center justify-center">
                <p className="text-sm text-gray-400">Memuat pesanan...</p>
            </div>
        )
    }

    if (loadError || !order) {
        return (
            <div className="min-h-screen bg-[#131313] text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
                <p className="text-sm text-red-400">{loadError || "Pesanan tidak ditemukan."}</p>
                <Link href="/user/orders" className="text-sm text-[#FBADCC] hover:underline">
                    Kembali ke pesanan saya
                </Link>
            </div>
        )
    }

    const status = statusConfig[order.status] ?? statusConfig.cancelled
    const quantity = (order.details ?? []).reduce((sum, d) => sum + d.quantity, 0)
    const method = methodLabel(order.payment_method)

    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
                <BackButton className="mb-6" />

                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Detail Pesanan</h1>
                    <p className="text-sm text-gray-500 mt-1">Informasi lengkap pesanan tiket Anda</p>
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

                {order.status === "pending" && (
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
                        {/* Event */}
                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Informasi Event</h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {order.concert?.banner_url ? (
                                    <img
                                        src={order.concert.banner_url}
                                        alt={order.concert.title}
                                        className="w-full sm:w-32 h-40 sm:h-32 rounded-xl object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-full sm:w-32 h-40 sm:h-32 rounded-xl bg-[#272727] flex items-center justify-center text-4xl font-bold text-[#FBADCC] flex-shrink-0">
                                        {order.concert?.title?.[0] ?? "T"}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold leading-snug">{order.concert?.title}</h3>
                                    {order.concert?.date && (
                                        <p className="text-xs text-gray-500 mt-1">{formatDateTime(order.concert.date)}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {[order.concert?.venue, order.concert?.location].filter(Boolean).join(", ")}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        {order.details?.map((d) => (
                                            <span key={d.id} className="text-xs px-2 py-0.5 bg-[#272727] rounded-md">
                                                {d.quantity}× {d.tier?.name ?? "Tiket"}
                                            </span>
                                        ))}
                                        <span className="text-xs text-[#FBADCC] font-semibold">{quantity} tiket</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tickets (paid orders only) */}
                        {order.status === "paid" && (
                            <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                                <h2 className="text-sm font-semibold mb-4">Tiket Anda</h2>

                                {ticketsLoading && <p className="text-xs text-gray-500">Memuat tiket...</p>}

                                {ticketsError && (
                                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-3 text-xs text-red-400">
                                        <p>{ticketsError}</p>
                                        <button
                                            type="button"
                                            onClick={() => loadTickets(order)}
                                            className="mt-2 underline hover:text-red-300"
                                        >
                                            Coba lagi
                                        </button>
                                    </div>
                                )}

                                {!ticketsLoading && !ticketsError && tickets.length === 0 && (
                                    <p className="text-xs text-gray-500">
                                        Tiket sedang diproses. Muat ulang halaman ini sebentar lagi.
                                    </p>
                                )}

                                <div className="space-y-3">
                                    {tickets.map((ticket, idx) => {
                                        const ts = ticketStatus[ticket.status] ?? ticketStatus.cancelled
                                        return (
                                            <div
                                                key={ticket.id}
                                                className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-[#141414] border border-[#272727] rounded-xl"
                                            >
                                                <img
                                                    src={ticket.qr_image}
                                                    alt={`QR tiket ${idx + 1}`}
                                                    className={`w-28 h-28 rounded-lg bg-white p-1.5 flex-shrink-0 ${ticket.status !== "unused" ? "opacity-40" : ""}`}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <p className="text-xs text-gray-500">Tiket {idx + 1}</p>
                                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${ts.className}`}>
                                                            {ts.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-semibold mt-0.5">{ticket.tier?.name ?? "Tiket"}</p>
                                                    {ticket.check_in_at && (
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            Masuk: {formatOrderDate(ticket.check_in_at)}
                                                        </p>
                                                    )}
                                                    <p className="text-[10px] font-mono text-[#FBADCC] mt-1 truncate">
                                                        {ticket.qr_code}
                                                    </p>
                                                </div>
                                                <a
                                                    href={ticket.qr_image}
                                                    download={`tiket-${order.id}-${idx + 1}.png`}
                                                    className="px-3 py-2 bg-[#FBADCC] text-black rounded-lg text-xs font-semibold hover:bg-[#f8a0c4] transition-colors flex-shrink-0 text-center"
                                                >
                                                    Unduh QR
                                                </a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Buyer */}
                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Data Pemesan</h2>
                            {buyer ? (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[11px] text-gray-500 mb-1">Nama</p>
                                        <p className="text-sm">{buyer.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-500 mb-1">Email</p>
                                        <p className="text-sm truncate">{buyer.email}</p>
                                    </div>
                                    {buyer.phone && (
                                        <div>
                                            <p className="text-[11px] text-gray-500 mb-1">Nomor Telepon</p>
                                            <p className="text-sm">{buyer.phone}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500">Data akun tidak bisa dimuat.</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Payment summary */}
                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Ringkasan Pembayaran</h2>
                            <div className="space-y-2 text-sm">
                                {order.details?.map((d) => (
                                    <div key={d.id} className="flex justify-between gap-3 text-gray-400">
                                        <span className="min-w-0">
                                            {d.quantity}× {d.tier?.name ?? "Tiket"}
                                        </span>
                                        <span className="whitespace-nowrap">IDR {formatRupiah(d.subtotal)}</span>
                                    </div>
                                ))}
                                <div className="border-t border-[#272727] pt-3 mt-3 flex justify-between font-semibold text-white">
                                    <span>Total</span>
                                    <span className="text-[#FBADCC]">IDR {formatRupiah(order.total_price)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order info */}
                        <div className="bg-[#1a1a1a] border border-[#272727] rounded-2xl p-5">
                            <h2 className="text-sm font-semibold mb-4">Info Pesanan</h2>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">ID Pesanan</span>
                                    <span className="font-mono text-[#FBADCC]">#{order.id}</span>
                                </div>
                                {order.created_at && (
                                    <div className="flex justify-between gap-3">
                                        <span className="text-gray-500">Tanggal Pesan</span>
                                        <span className="text-right">{formatOrderDate(order.created_at)}</span>
                                    </div>
                                )}
                                {method && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Metode</span>
                                        <span>{method}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            {order.status === "pending" && (
                                <Link
                                    href={`/user/checkout/${order.id}`}
                                    className="block w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-xl transition-colors text-sm text-center"
                                >
                                    Lanjutkan Pembayaran
                                </Link>
                            )}
                            {(order.status === "expired" || order.status === "cancelled") && order.concert?.id && (
                                <Link
                                    href={`/user/ticket-selection/${order.concert.id}`}
                                    className="block w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-xl transition-colors text-sm text-center"
                                >
                                    Beli Ulang Tiket
                                </Link>
                            )}
                            <Link
                                href="/user/orders"
                                className="block w-full bg-transparent border border-[#333] text-gray-300 hover:text-white hover:border-[#555] font-semibold py-3 rounded-xl transition-colors text-sm text-center"
                            >
                                Semua Pesanan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
