"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import HeroSection from "@/components/home/hero"
import SearchHome from "@/components/home/Search"
import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"

const categories = [
    { id: "all", label: "Semua" },
    { id: "konser", label: "Konser" },
    { id: "festival", label: "Festival" },
    { id: "theater", label: "Theater" },
    { id: "sports", label: "Sports" },
    { id: "comedy", label: "Comedy" },
]

const cities = ["Semua kota", "Jakarta", "Bandung", "Surabaya", "Bali"]

const IMG = [
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
]

const popularEvents = [
    {
        id: 1,
        date: "2026-11-14",
        title: "Nassar Tour 2026",
        image: IMG[0],
        price: 500000,
        venue: "Jakarta International Stadium",
        city: "Jakarta",
        rating: 4.8,
        sold: 12500,
        category: "konser",
        badge: "trending",
    },
    {
        id: 2,
        date: "2026-11-22",
        title: "Langit Senja Music Festival",
        image: IMG[1],
        price: 350000,
        venue: "Lapangan Gasibu",
        city: "Bandung",
        rating: 4.6,
        sold: 8900,
        category: "festival",
        badge: null,
    },
    {
        id: 3,
        date: "2026-12-05",
        title: "Senandung Pantai Live",
        image: IMG[2],
        price: 450000,
        venue: "GWK Cultural Park",
        city: "Bali",
        rating: 4.9,
        sold: 15200,
        category: "konser",
        badge: "limited",
    },
    {
        id: 4,
        date: "2026-12-12",
        title: "Lakon Bayangan: Malam Terakhir",
        image: IMG[0],
        price: 200000,
        venue: "Gedung Kesenian Jakarta",
        city: "Jakarta",
        rating: 4.5,
        sold: 6700,
        category: "theater",
        badge: null,
    },
    {
        id: 5,
        date: "2026-12-19",
        title: "Final Nusantara Basketball Cup",
        image: IMG[1],
        price: 150000,
        venue: "GOR Kertajaya",
        city: "Surabaya",
        rating: 4.7,
        sold: 9800,
        category: "sports",
        badge: null,
    },
    {
        id: 6,
        date: "2027-01-09",
        title: "Stand Up Malam Minggu",
        image: IMG[2],
        price: 175000,
        venue: "Balai Sarbini",
        city: "Jakarta",
        rating: 4.4,
        sold: 4300,
        category: "comedy",
        badge: null,
    },
]

const upcomingEvents = [
    {
        id: 11,
        date: "2027-07-22",
        title: "Nassar Horizon World Tour 2027",
        image: IMG[0],
        venue: "Jakarta International Stadium",
        price: 500000,
        countdown: "2027-07-22T19:00:00",
    },
    {
        id: 12,
        date: "2027-05-08",
        title: "Langit Senja Festival 2027",
        image: IMG[1],
        venue: "Lapangan Gasibu, Bandung",
        price: 400000,
        countdown: "2027-05-08T16:00:00",
    },
    {
        id: 13,
        date: "2027-03-27",
        title: "Senandung Pantai Anniversary",
        image: IMG[2],
        venue: "GWK Cultural Park, Bali",
        price: 475000,
        countdown: "2027-03-27T18:30:00",
    },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]
const MONTHS_SHORT = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
]

// "2026-11-14" -> { y: 2026, m: 11, d: 14 }  (manual parse avoids timezone/hydration drift)
const parseDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number)
    return { y, m, d }
}
const formatDate = (iso) => {
    const { y, m, d } = parseDate(iso)
    return `${d} ${MONTHS[m - 1]} ${y}`
}
const formatIDR = (n) => `IDR ${n.toLocaleString("id-ID")}`

const FOCUS =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBADCC]"

const NO_SCROLLBAR = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function PinIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${className}`}>
            <path fillRule="evenodd" d="M10 18s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10zm0-7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
        </svg>
    )
}

function StarIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${className}`}>
            <path d="M10 1.8l2.4 5 5.4.7-4 3.8 1 5.4L10 14l-4.8 2.7 1-5.4-4-3.8 5.4-.7L10 1.8z" />
        </svg>
    )
}

function ChevronRight({ className = "" }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`h-4 w-4 ${className}`}>
            <path fillRule="evenodd" d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L11.6 10 7.3 5.7a1 1 0 010-1.4z" clipRule="evenodd" />
        </svg>
    )
}

function Chip({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-colors ${FOCUS} ${active
                ? "border-white bg-white text-black"
                : "border-[#272727] bg-transparent text-gray-400 hover:border-[#444] hover:text-white"
                }`}
        >
            {children}
        </button>
    )
}

function Badge({ type }) {
    if (!type) return null
    const isTrending = type === "trending"
    return (
        <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${isTrending ? "bg-white text-black" : "bg-[#FBADCC] text-black"
                }`}
        >
            {isTrending ? "Trending" : "Hampir habis"}
        </span>
    )
}

function SectionHeader({ title, subtitle, href = "/events" }) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="h-9 w-1 rounded-full bg-[#FBADCC]" />
                <div>
                    <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
                    <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
                </div>
            </div>
            <Link
                href={href}
                className={`flex items-center gap-0.5 whitespace-nowrap rounded text-xs text-gray-400 transition-colors hover:text-white ${FOCUS}`}
            >
                Lihat semua
                <ChevronRight />
            </Link>
        </div>
    )
}

function EmptyState({ message, actionLabel, onAction }) {
    return (
        <div className="rounded-2xl border border-dashed border-[#272727] px-6 py-16 text-center">
            <p className="text-sm text-gray-400">{message}</p>
            {onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className={`mt-4 rounded-lg border border-[#333] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#FBADCC] hover:text-[#FBADCC] ${FOCUS}`}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Countdown                                                           */
/* ------------------------------------------------------------------ */

function CountdownTimer({ targetDate }) {
    // null until mounted -> server and client render the same markup first
    const [t, setT] = useState(null)

    useEffect(() => {
        const tick = () => {
            const distance = new Date(targetDate).getTime() - Date.now()
            if (distance <= 0) {
                setT({ done: true })
                return
            }
            setT({
                days: Math.floor(distance / 86400000),
                hours: Math.floor((distance % 86400000) / 3600000),
                minutes: Math.floor((distance % 3600000) / 60000),
                seconds: Math.floor((distance % 60000) / 1000),
            })
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [targetDate])

    if (t?.done) {
        return <p className="text-xs font-medium text-[#FBADCC]">Acara sudah dimulai</p>
    }

    const cells = [
        { label: "hari", value: t?.days },
        { label: "jam", value: t?.hours },
        { label: "menit", value: t?.minutes },
        { label: "detik", value: t?.seconds },
    ]

    return (
        <div className="grid grid-cols-4 gap-1.5" role="timer" aria-label="Hitung mundur acara">
            {cells.map((c) => (
                <div key={c.label} className="rounded-lg bg-[#131313] py-1.5 text-center">
                    <div className="text-sm font-semibold tabular-nums text-[#FBADCC]">
                        {c.value === undefined ? "--" : String(c.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] text-gray-500">{c.label}</div>
                </div>
            ))}
        </div>
    )
}

function TicketCard({ event }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#272727] bg-[#1a1a1a] transition-colors hover:border-[#3a3a3a]">
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute left-3 top-3">
                    <Badge type={event.badge} />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium text-[#FBADCC]">{formatDate(event.date)}</p>
                <h3 className="mt-1.5 min-h-[2.75rem] text-base font-semibold leading-snug line-clamp-2">
                    <Link href={`/events/${event.id}`} className={`rounded hover:underline ${FOCUS}`}>
                        {event.title}
                    </Link>
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <PinIcon />
                    <span className="truncate">{event.venue}, {event.city}</span>
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <StarIcon className="text-[#FBADCC]" />
                    <span className="text-gray-300">{event.rating}</span>
                    <span aria-hidden="true">·</span>
                    <span>{event.sold.toLocaleString("id-ID")} terjual</span>
                </p>
            </div>

            {/* perforation */}
            <div className="relative h-0 border-t border-dashed border-[#333]" aria-hidden="true">
                <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-[#272727] bg-[#131313]" />
                <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full border border-[#272727] bg-[#131313]" />
            </div>

            <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                    <p className="text-[11px] text-gray-500">Mulai dari</p>
                    <p className="text-sm font-semibold">{formatIDR(event.price)}</p>
                </div>
                <Link
                    href={`/events/${event.id}`}
                    className={`rounded-lg bg-[#FBADCC] px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f8a0c4] ${FOCUS}`}
                >
                    Beli tiket
                </Link>
            </div>
        </article>
    )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomeUser() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [activeCity, setActiveCity] = useState("Semua kota")

    const filteredPopular =
        activeCategory === "all"
            ? popularEvents
            : popularEvents.filter((e) => e.category === activeCategory)

    const filteredList = (
        activeCity === "Semua kota"
            ? popularEvents
            : popularEvents.filter((e) => e.city === activeCity)
    ).slice(0, 4)

    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <UserNavbar />
            <HeroSection />
            <SearchHome />

            <main className="space-y-14 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-12 lg:px-12 xl:px-20">
                {/* Category filter */}
                <div
                    className={`-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 ${NO_SCROLLBAR}`}
                    role="group"
                    aria-label="Filter kategori"
                >
                    {categories.map((cat) => (
                        <Chip
                            key={cat.id}
                            active={activeCategory === cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </Chip>
                    ))}
                </div>

                {/* Terpopuler */}
                <section className="space-y-6" aria-labelledby="populer">
                    <div id="populer">
                        <SectionHeader title="Terpopuler minggu ini" subtitle="Event paling banyak dicari" />
                    </div>

                    {filteredPopular.length === 0 ? (
                        <EmptyState
                            message="Belum ada event di kategori ini."
                            actionLabel="Tampilkan semua kategori"
                            onAction={() => setActiveCategory("all")}
                        />
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPopular.map((event) => (
                                <TicketCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Konser mendatang */}
                <section className="space-y-6" aria-labelledby="mendatang">
                    <div id="mendatang">
                        <SectionHeader title="Konser mendatang" subtitle="Amankan tiketmu sebelum kehabisan" />
                    </div>

                    <div
                        className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible ${NO_SCROLLBAR}`}
                    >
                        {upcomingEvents.map((event) => (
                            <article
                                key={event.id}
                                className="w-[85%] shrink-0 snap-start rounded-2xl border border-[#272727] bg-[#1a1a1a] p-5 transition-colors hover:border-[#3a3a3a] sm:w-[380px] lg:w-auto"
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        loading="lazy"
                                        className="h-24 w-24 shrink-0 rounded-xl object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium text-[#FBADCC]">{formatDate(event.date)}</p>
                                        <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                                            <PinIcon />
                                            <span className="truncate">{event.venue}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <CountdownTimer targetDate={event.countdown} />
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#272727] pt-4">
                                    <div>
                                        <p className="text-[11px] text-gray-500">Mulai dari</p>
                                        <p className="text-sm font-semibold">{formatIDR(event.price)}</p>
                                    </div>
                                    <Link
                                        href={`/events/${event.id}`}
                                        className={`rounded-lg bg-[#FBADCC] px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f8a0c4] ${FOCUS}`}
                                    >
                                        Pesan
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Daftar konser */}
                <section className="space-y-6" aria-labelledby="daftar">
                    <div id="daftar">
                        <SectionHeader title="Daftar konser" subtitle="Pilih berdasarkan kota" />
                    </div>

                    <div
                        className={`-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 ${NO_SCROLLBAR}`}
                        role="group"
                        aria-label="Filter kota"
                    >
                        {cities.map((city) => (
                            <Chip key={city} active={activeCity === city} onClick={() => setActiveCity(city)}>
                                {city}
                            </Chip>
                        ))}
                    </div>

                    {filteredList.length === 0 ? (
                        <EmptyState
                            message={`Belum ada event di ${activeCity}.`}
                            actionLabel="Tampilkan semua kota"
                            onAction={() => setActiveCity("Semua kota")}
                        />
                    ) : (
                        <ul className="divide-y divide-[#272727] overflow-hidden rounded-2xl border border-[#272727]">
                            {filteredList.map((event) => {
                                const { d, m } = parseDate(event.date)
                                return (
                                    <li
                                        key={event.id}
                                        className="flex flex-col gap-4 p-4 transition-colors hover:bg-[#1a1a1a] sm:p-5 md:flex-row md:items-center md:gap-6"
                                    >
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            loading="lazy"
                                            className="h-44 w-full shrink-0 rounded-xl object-cover md:h-28 md:w-44"
                                        />

                                        <div className="flex min-w-0 flex-1 items-center gap-4">
                                            <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-[#272727] py-2">
                                                <span className="text-lg font-semibold leading-none">{d}</span>
                                                <span className="mt-1 text-[11px] text-[#FBADCC]">{MONTHS_SHORT[m - 1]}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-base font-semibold">
                                                        <Link
                                                            href={`/events/${event.id}`}
                                                            className={`rounded hover:underline ${FOCUS}`}
                                                        >
                                                            {event.title}
                                                        </Link>
                                                    </h3>
                                                    <Badge type={event.badge} />
                                                </div>
                                                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                                                    <PinIcon />
                                                    <span className="truncate">{event.venue}, {event.city}</span>
                                                </p>
                                                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                                                    <StarIcon className="text-[#FBADCC]" />
                                                    <span className="text-gray-300">{event.rating}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center md:gap-2">
                                            <div className="md:text-right">
                                                <p className="text-[11px] text-gray-500">Mulai dari</p>
                                                <p className="text-sm font-semibold">{formatIDR(event.price)}</p>
                                            </div>
                                            <Link
                                                href={`/events/${event.id}`}
                                                className={`rounded-lg bg-[#FBADCC] px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f8a0c4] ${FOCUS}`}
                                            >
                                                Dapatkan tiket
                                            </Link>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}