// Place at: src/app/user/orders/page.js   (replaces the current file)
"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import UserNavbar from "@/components/layout/UserNavbar"
import Footer from "@/components/layout/footer"
import { apiFetch } from "../../../../lib/api.js"

/* ------------------------------------------------------------------ */
/* Backend -> card data                                                */
/* ------------------------------------------------------------------ */

// GET /orders?limit=100  ->  res.data = { items: [order], pagination: { total, page, limit, total_pages } }
// order = { id, status, total_price, expires_at, seconds_left, created_at,
//           concert: { id, title, date, venue, location },
//           details: [{ id, quantity, unit_price, subtotal, tier: { name } }] }
// The backend only expires old orders once a minute, so "pending with 0 seconds left" is shown as expired.
const toOrder = (o) => {
    const details = o.details ?? []
    return {
        id: o.id,
        status: o.status === "pending" && o.seconds_left === 0 ? "expired" : o.status,
        total: o.total_price,
        quantity: details.reduce((sum, d) => sum + d.quantity, 0),
        tiers: details.map((d) => ({ name: d.tier?.name ?? "Tiket", quantity: d.quantity })),
        createdAt: o.created_at,
        expiresAt: o.expires_at,
        concertId: o.concert?.id,
        eventTitle: o.concert?.title ?? "Konser",
        eventDate: o.concert?.date,
        venue: [o.concert?.venue, o.concert?.location].filter(Boolean).join(", "),
        image: o.concert?.banner_url ?? null, // not sent by the backend yet, see the note about orderInclude
    }
}

const tabs = [
    { id: "all", label: "Semua" },
    { id: "pending", label: "Menunggu" },
    { id: "paid", label: "Berhasil" },
    { id: "expired", label: "Kedaluwarsa" },
    { id: "cancelled", label: "Dibatalkan" },
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

const TZ = "Asia/Jakarta"

const formatEventDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ,
    })
const formatEventTime = (iso) =>
    new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: TZ })
const formatShortDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", timeZone: TZ })
const formatDeadline = (iso) =>
    new Date(iso).toLocaleString("id-ID", {
        day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: TZ,
    }) + " WIB"
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
    const s = statusConfig[status] ?? statusConfig.cancelled
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

function OrderSkeleton() {
    return (
        <ul className="space-y-4" aria-hidden="true">
            {[0, 1, 2].map((i) => (
                <li key={i} className="h-44 animate-pulse rounded-2xl border border-[#272727] bg-[#1a1a1a]" />
            ))}
        </ul>
    )
}

/* ------------------------------------------------------------------ */
/* Order card (ticket-style)                                           */
/* ------------------------------------------------------------------ */

function OrderCard({ order, confirming, cancelling, onAskCancel, onConfirmCancel, onDismissCancel }) {
    const inactive = order.status === "expired" || order.status === "cancelled"

    return (
        <article className="overflow-hidden rounded-2xl border border-[#272727] bg-[#1a1a1a] transition-colors hover:border-[#3a3a3a] md:flex">
            {/* Gambar */}
            <div className="relative h-44 shrink-0 md:h-auto md:w-44 lg:w-52">
                {order.image ? (
                    <img
                        src={order.image}
                        alt={order.eventTitle}
                        loading="lazy"
                        className={`h-full w-full object-cover ${inactive ? "grayscale" : ""}`}
                    />
                ) : (
                    <div className={`flex h-full w-full items-center justify-center bg-[#272727] text-4xl font-bold text-[#FBADCC] ${inactive ? "opacity-50" : ""}`}>
                        {order.eventTitle?.[0] ?? "T"}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1 p-5">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <p className="truncate font-mono text-[11px] text-[#FBADCC]">Pesanan #{order.id}</p>
                    <p className="text-[11px] text-gray-500">Dipesan {formatShortDate(order.createdAt)}</p>
                </div>

                <h3 className="mt-2 text-base font-semibold leading-snug sm:text-lg">{order.eventTitle}</h3>

                <div className="mt-2 space-y-1.5 text-xs text-gray-400">
                    {order.eventDate && (
                        <p className="flex items-center gap-1.5">
                            <CalendarIcon />
                            <span>{formatEventDate(order.eventDate)}, {formatEventTime(order.eventDate)} WIB</span>
                        </p>
                    )}
                    {order.venue && (
                        <p className="flex items-center gap-1.5">
                            <PinIcon />
                            <span className="truncate">{order.venue}</span>
                        </p>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    {order.tiers.map((t) => (
                        <span key={t.name} className="rounded-md bg-[#272727] px-2.5 py-1 text-gray-300">
                            {t.quantity}× {t.name}
                        </span>
                    ))}
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

                {order.status === "pending" && order.expiresAt && (
                    <p className="rounded-lg bg-yellow-500/10 px-3 py-2 text-[11px] leading-relaxed text-yellow-300">
                        Selesaikan pembayaran sebelum {formatDeadline(order.expiresAt)}.
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
                            <p className="mt-0.5 text-[11px] text-gray-400">Tiket yang kamu tahan akan dilepas.</p>
                            <div className="mt-3 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => onConfirmCancel(order.id)}
                                    disabled={cancelling}
                                    className={`flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50 ${FOCUS}`}
                                >
                                    {cancelling ? "Membatalkan..." : "Ya, batalkan"}
                                </button>
                                <button
                                    type="button"
                                    onClick={onDismissCancel}
                                    disabled={cancelling}
                                    className={`${BTN_OUTLINE} flex-1 !py-2 disabled:opacity-50`}
                                >
                                    Tidak
                                </button>
                            </div>
                        </div>
                    )}

                    {order.status === "paid" && (
                        <Link href={`/user/orders/${order.id}`} className={`${BTN_PRIMARY} sm:flex-1`}>
                            Lihat tiket
                        </Link>
                    )}

                    {inactive && (
                        <>
                            {order.concertId && (
                                <Link href={`/user/ticket-selection/${order.concertId}`} className={`${BTN_PRIMARY} sm:flex-1`}>
                                    Beli ulang
                                </Link>
                            )}
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



export default function OrdersPage() {
    const router = useRouter()

    const [orders, setOrders] = useState([])
    const [totalOnServer, setTotalOnServer] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState("")
    const [actionError, setActionError] = useState("")

    const [activeTab, setActiveTab] = useState("all")
    const [query, setQuery] = useState("")
    const [confirmingId, setConfirmingId] = useState(null)
    const [cancellingId, setCancellingId] = useState(null)

    const goLogin = () => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        } catch {}
        router.replace("/login")
    }

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

            try {
                const res = await apiFetch("/orders?limit=100")
                if (cancelled) return
                const orderData = res.data
                setOrders(orderData.items.map(toOrder))
                setTotalOnServer(orderData.pagination.total)
            } catch (err) {
                if (cancelled) return
                if (/token|access denied/i.test(err.message)) {
                    goLogin()
                    return
                }
                setLoadError(err.message)
            } finally {
                if (!cancelled) setLoading(false)
            }
        })()

        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    const counts = useMemo(() => {
        const c = { all: orders.length, pending: 0, paid: 0, expired: 0, cancelled: 0 }
        orders.forEach((o) => {
            if (c[o.status] !== undefined) c[o.status] += 1
        })
        return c
    }, [orders])

    const ticketsBought = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.quantity, 0)
    const totalSpent = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + Number(o.total), 0)

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase().replace(/^#/, "")
        return orders.filter(
            (o) =>
                (activeTab === "all" || o.status === activeTab) &&
                (!q || o.eventTitle.toLowerCase().includes(q) || String(o.id).includes(q))
        )
    }, [orders, activeTab, query])

    // POST /orders/:id/cancel  ->  returns the updated order; the backend releases the held tickets
    const cancelOrder = async (id) => {
        setCancellingId(id)
        setActionError("")
        try {
            const res = await apiFetch(`/orders/${id}/cancel`, { method: "POST" })
            setOrders((list) => list.map((o) => (o.id === id ? toOrder(res.data) : o)))
            setConfirmingId(null)
        } catch (err) {
            if (/token|access denied/i.test(err.message)) {
                goLogin()
                return
            }
            setActionError(err.message)
        } finally {
            setCancellingId(null)
        }
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
                        href="/user/home"
                        className={`self-start rounded-lg border border-[#333] px-4 py-2 text-xs font-medium transition-colors hover:border-[#FBADCC] hover:text-[#FBADCC] sm:self-auto ${FOCUS}`}
                    >
                        Cari event
                    </Link>
                </div>

                {loadError ? (
                    <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center">
                        <p className="text-sm text-red-400">{loadError}</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className={`mt-4 rounded-lg border border-[#333] px-4 py-2 text-xs font-medium transition-colors hover:border-[#555] ${FOCUS}`}
                        >
                            Coba lagi
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Ringkasan */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                            <Stat label="Total pesanan" value={loading ? "–" : totalOnServer} />
                            <Stat
                                label="Menunggu pembayaran"
                                value={loading ? "–" : counts.pending}
                                hint={!loading && counts.pending > 0 ? "Segera selesaikan" : "Tidak ada tagihan"}
                            />
                            <div className="col-span-2 lg:col-span-1">
                                <Stat
                                    label="Tiket dibeli"
                                    value={loading ? "–" : ticketsBought}
                                    hint={`Total belanja IDR ${formatRupiah(totalSpent)}`}
                                />
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

                        {actionError && (
                            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
                                {actionError}
                            </p>
                        )}

                        {/* Daftar */}
                        <div className="mt-6">
                            {loading ? (
                                <OrderSkeleton />
                            ) : filtered.length === 0 ? (
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
                                            href="/user/home"
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
                                                cancelling={cancellingId === order.id}
                                                onAskCancel={setConfirmingId}
                                                onConfirmCancel={cancelOrder}
                                                onDismissCancel={() => setConfirmingId(null)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {!loading && totalOnServer > orders.length && (
                                <p className="mt-4 text-center text-xs text-gray-500">
                                    Menampilkan {orders.length} pesanan terbaru dari {totalOnServer}.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    )
}
