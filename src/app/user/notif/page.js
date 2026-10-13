"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"

/* ------------------------------------------------------------------ */
/* Data (ganti dengan data dari API / database)                        */
/* ------------------------------------------------------------------ */

const categories = [
    { id: "all", label: "Semua", icon: "bell" },
    { id: "pesanan", label: "Pesanan", icon: "ticket" },
    { id: "pengingat", label: "Pengingat", icon: "clock" },
    { id: "promo", label: "Promo", icon: "tag" },
]

const GROUPS = [
    { id: "today", label: "Hari ini" },
    { id: "yesterday", label: "Kemarin" },
    { id: "earlier", label: "Sebelumnya" },
]

const initialNotifications = [
    {
        id: 1,
        category: "pesanan",
        group: "today",
        time: "Baru saja",
        read: false,
        title: "Tiket berhasil dibeli",
        message: ["Pesananmu untuk ", { b: "King Nassar Asyeole" }, " di GBK Stadium sudah dikonfirmasi."],
        actions: [
            { label: "Lihat e-tiket", href: "/tickets/1" },
            { label: "Detail pesanan", href: "/orders/1" },
        ],
    },
    {
        id: 2,
        category: "pengingat",
        group: "today",
        time: "1 jam lalu",
        read: false,
        title: "Konser dimulai besok",
        message: [{ b: "Exhorizon Concert" }, " dimulai tepat 24 jam lagi. Cek rute perjalananmu sebelum berangkat."],
        actions: [{ label: "Lihat lokasi", href: "/events/2" }],
    },
    {
        id: 3,
        category: "promo",
        group: "today",
        time: "4 jam lalu",
        read: false,
        title: "Diskon 20% untuk pemesananmu berikutnya",
        message: ["Nikmati potongan ", { b: "20%" }, " untuk konser apa pun bulan ini."],
        actions: [{ label: "Klaim diskon", href: "/promo" }],
    },

  
    {
        id: 6,
        category: "pesanan",
        group: "earlier",
        time: "10 Okt, 19.42",
        read: true,
        title: "Pembayaran diterima",
        message: ["Pembayaran untuk 2 tiket ", { b: "Langit Senja Festival" }, " sudah kami terima."],
        actions: [{ label: "Lihat e-tiket", href: "/tickets/6" }],
    },
   
]

/* ------------------------------------------------------------------ */
/* Helpers & small pieces                                              */
/* ------------------------------------------------------------------ */

const FOCUS =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBADCC]"

const ICONS = {
    bell: (
        <>
            <path d="M5 8a5 5 0 1110 0c0 4 1.5 5 1.5 5h-13S5 12 5 8z" strokeLinejoin="round" />
            <path d="M8.5 16a1.5 1.5 0 003 0" strokeLinecap="round" />
        </>
    ),
    ticket: (
        <path
            d="M3 6.5A1.5 1.5 0 014.5 5h11A1.5 1.5 0 0117 6.5V8a2 2 0 000 4v1.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 13.5V12a2 2 0 000-4V6.5z"
            strokeLinejoin="round"
        />
    ),
    clock: (
        <>
            <circle cx="10" cy="10" r="7" />
            <path d="M10 6v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    tag: (
        <>
            <path d="M3 10.5V4.5A1.5 1.5 0 014.5 3h6l6 6-7.5 7.5-6-6z" strokeLinejoin="round" />
            <circle cx="7" cy="7" r="1" />
        </>
    ),
   
}

function Icon({ name, className = "h-4 w-4" }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
            className={`shrink-0 ${className}`}
        >
            {ICONS[name]}
        </svg>
    )
}

function Message({ parts }) {
    return (
        <p className="mt-1 text-sm leading-relaxed text-gray-400">
            {parts.map((p, i) =>
                typeof p === "string" ? (
                    <span key={i}>{p}</span>
                ) : (
                    <strong key={i} className="font-medium text-white">{p.b}</strong>
                )
            )}
        </p>
    )
}

const BTN_TEXT = `rounded text-xs font-medium transition-colors ${FOCUS}`

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Notif() {
    const [items, setItems] = useState(initialNotifications)
    const [category, setCategory] = useState("all")
    const [unreadOnly, setUnreadOnly] = useState(false)

    const unreadCounts = useMemo(() => {
        const counts = { all: 0 }
        items.forEach((n) => {
            if (!n.read) {
                counts.all += 1
                counts[n.category] = (counts[n.category] || 0) + 1
            }
        })
        return counts
    }, [items])

    const visible = useMemo(
        () =>
            items.filter(
                (n) => (category === "all" || n.category === category) && (!unreadOnly || !n.read)
            ),
        [items, category, unreadOnly]
    )

    const activeCategory = categories.find((c) => c.id === category)
    const unreadInView = visible.filter((n) => !n.read).length

    const markRead = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
    const remove = (id) => setItems((list) => list.filter((n) => n.id !== id))
    const markAllRead = () => {
        const ids = new Set(visible.map((n) => n.id))
        setItems((list) => list.map((n) => (ids.has(n.id) ? { ...n, read: true } : n)))
    }

    const catLabel = (id) => categories.find((c) => c.id === id)?.label

    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <UserNavbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    {/* Kategori */}
                    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72 lg:rounded-2xl lg:border lg:border-[#272727] lg:bg-[#1a1a1a] lg:p-3 xl:w-80">
                        <p className="hidden px-3 pb-2 pt-2 text-xs font-medium text-gray-500 lg:block">Kategori</p>
                        <nav
                            aria-label="Kategori notifikasi"
                            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
                        >
                            {categories.map((c) => {
                                const active = category === c.id
                                const count = unreadCounts[c.id] || 0
                                return (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => setCategory(c.id)}
                                        aria-current={active ? "true" : undefined}
                                        className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-medium transition-colors lg:w-full lg:rounded-xl lg:px-3 lg:py-2.5 lg:text-sm ${FOCUS} ${active
                                            ? "border-[#FBADCC]/40 bg-[#FBADCC]/10 text-white"
                                            : "border-[#272727] text-gray-400 hover:text-white lg:border-transparent lg:hover:bg-[#272727]/60"
                                            }`}
                                    >
                                        <Icon name={c.icon} className={`h-4 w-4 ${active ? "text-[#FBADCC]" : ""}`} />
                                        <span>{c.label}</span>
                                        {count > 0 && (
                                            <span
                                                className="ml-auto min-w-[1.25rem] rounded-full bg-[#FBADCC] px-1.5 py-0.5 text-center text-[10px] font-semibold text-black"
                                                aria-label={`${count} belum dibaca`}
                                            >
                                                {count}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </nav>

                        <div className="mt-3 hidden border-t border-[#272727] px-3 pb-2 pt-4 lg:block">
                            <p className="text-xs text-gray-500">Ingin mengubah jenis notifikasi yang kamu terima?</p>
                            <Link
                                href="/profile"
                                className={`mt-2 inline-block text-xs font-medium text-[#FBADCC] hover:underline ${FOCUS}`}
                            >
                                Buka pengaturan notifikasi
                            </Link>
                        </div>
                    </aside>

                    {/* Daftar notifikasi */}
                    <section className="min-w-0 flex-1 rounded-2xl border border-[#272727] bg-[#1a1a1a]">
                        <div className="flex flex-col gap-4 border-b border-[#272727] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div>
                                <h1 className="text-lg font-semibold sm:text-xl">
                                    {category === "all" ? "Notifikasi" : `Notifikasi ${activeCategory.label.toLowerCase()}`}
                                </h1>
                                <p className="mt-0.5 text-xs text-gray-500" role="status" aria-live="polite">
                                    {unreadInView > 0 ? `${unreadInView} belum dibaca` : "Semua sudah dibaca"}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={unreadOnly}
                                    onClick={() => setUnreadOnly((v) => !v)}
                                    className={`flex items-center gap-2 rounded-full border border-[#272727] py-1.5 pl-3 pr-2 text-xs text-gray-300 transition-colors hover:border-[#444] ${FOCUS}`}
                                >
                                    Belum dibaca saja
                                    <span className={`relative h-5 w-9 rounded-full transition-colors ${unreadOnly ? "bg-[#FBADCC]" : "bg-[#333]"}`}>
                                        <span
                                            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full transition-transform motion-reduce:transition-none ${unreadOnly ? "translate-x-4 bg-black" : "translate-x-0 bg-white"}`}
                                        />
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={markAllRead}
                                    disabled={unreadInView === 0}
                                    className={`rounded-lg border border-[#333] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:border-[#555] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#333] ${FOCUS}`}
                                >
                                    Tandai semua dibaca
                                </button>
                            </div>
                        </div>

                        {visible.length === 0 ? (
                            <div className="px-6 py-20 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#272727] text-gray-400">
                                    <Icon name="bell" className="h-5 w-5" />
                                </div>
                                <p className="mt-4 text-sm font-medium">
                                    {unreadOnly ? "Tidak ada notifikasi yang belum dibaca" : "Belum ada notifikasi"}
                                </p>
                                <p className="mx-auto mt-1 max-w-sm text-xs text-gray-500">
                                    {unreadOnly
                                        ? "Semua notifikasi di kategori ini sudah kamu baca."
                                        : "Kabar tentang pesanan, pengingat, dan promo akan muncul di sini."}
                                </p>
                                {unreadOnly && (
                                    <button
                                        type="button"
                                        onClick={() => setUnreadOnly(false)}
                                        className={`mt-5 rounded-lg border border-[#333] px-4 py-2 text-xs font-medium transition-colors hover:border-[#FBADCC] hover:text-[#FBADCC] ${FOCUS}`}
                                    >
                                        Tampilkan semua
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div>
                                {GROUPS.map((g) => {
                                    const rows = visible.filter((n) => n.group === g.id)
                                    if (rows.length === 0) return null
                                    return (
                                        <div key={g.id}>
                                            <h2 className="border-b border-[#272727] bg-[#161616] px-5 py-2.5 text-xs font-medium text-gray-500 sm:px-6">
                                                {g.label}
                                            </h2>
                                            <ul className="divide-y divide-[#272727]">
                                                {rows.map((n) => (
                                                    <li
                                                        key={n.id}
                                                        className={`relative flex gap-4 px-5 py-5 transition-colors sm:px-6 ${n.read ? "hover:bg-[#1e1e1e]" : "bg-[#FBADCC]/[0.04] hover:bg-[#FBADCC]/[0.07]"}`}
                                                    >
                                                        {!n.read && (
                                                            <span
                                                                className="absolute inset-y-0 left-0 w-0.5 bg-[#FBADCC]"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        <div
                                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${n.read ? "bg-[#272727] text-gray-400" : "bg-[#FBADCC]/15 text-[#FBADCC]"}`}
                                                        >
                                                            <Icon
                                                                name={categories.find((c) => c.id === n.category).icon}
                                                                className="h-[18px] w-[18px]"
                                                            />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-start justify-between gap-3">
                                                                <h3 className="text-sm font-semibold leading-snug sm:text-base">
                                                                    {n.title}
                                                                    {!n.read && <span className="sr-only"> (belum dibaca)</span>}
                                                                </h3>
                                                                <time className="shrink-0 pt-0.5 text-xs text-gray-500">{n.time}</time>
                                                            </div>

                                                            <Message parts={n.message} />

                                                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                                                {n.actions.map((a) => (
                                                                    <Link
                                                                        key={a.label}
                                                                        href={a.href}
                                                                        onClick={() => markRead(n.id)}
                                                                        className={`${BTN_TEXT} text-[#FBADCC] hover:underline`}
                                                                    >
                                                                        {a.label}
                                                                    </Link>
                                                                ))}
                                                                {!n.read && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => markRead(n.id)}
                                                                        className={`${BTN_TEXT} text-gray-400 hover:text-white`}
                                                                    >
                                                                        Tandai dibaca
                                                                    </button>
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(n.id)}
                                                                    aria-label={`Hapus notifikasi ${n.title}`}
                                                                    className={`${BTN_TEXT} text-gray-500 hover:text-red-400`}
                                                                >
                                                                    Hapus
                                                                </button>
                                                                {category === "all" && (
                                                                    <span className="ml-auto rounded-full border border-[#272727] px-2.5 py-0.5 text-[11px] text-gray-500">
                                                                        {catLabel(n.category)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}