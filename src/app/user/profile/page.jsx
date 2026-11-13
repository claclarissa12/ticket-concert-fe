"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"

/* ------------------------------------------------------------------ */
/* Data (ganti dengan data dari API / database)                        */
/* ------------------------------------------------------------------ */

const initialProfile = {
    name: "Aulia Rahmawati",
    username: "aulia.rahma",
    email: "aulia@email.com",
    phone: "081234567890",
    city: "Jakarta",
    joined: "Maret 2024",
}

const initialFollowing = [
    { id: 1, name: "Nassar", type: "artis", followers: 1250000, upcoming: 2, followed: true },
    { id: 2, name: "Langit Senja Project", type: "penyelenggara", followers: 84200, upcoming: 3, followed: true },
    { id: 3, name: "Rara Anindya", type: "artis", followers: 312000, upcoming: 1, followed: true },
    { id: 4, name: "Kopi Tawa Collective", type: "penyelenggara", followers: 45800, upcoming: 4, followed: true },
    { id: 5, name: "Dimas Prakoso", type: "artis", followers: 98700, upcoming: 0, followed: true },
    { id: 6, name: "Nusantara Live", type: "penyelenggara", followers: 203500, upcoming: 6, followed: true },
]

const IMG = [
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
]

const initialFavorites = [
    { id: 1, title: "Nassar Tour 2026", date: "2026-11-14", venue: "Jakarta International Stadium", city: "Jakarta", price: 500000, image: IMG[0] },
    { id: 2, title: "Langit Senja Music Festival", date: "2026-11-22", venue: "Lapangan Gasibu", city: "Bandung", price: 350000, image: IMG[1] },
    { id: 3, title: "Senandung Pantai Live", date: "2026-12-05", venue: "GWK Cultural Park", city: "Bali", price: 450000, image: IMG[2] },
    { id: 6, title: "Stand Up Malam Minggu", date: "2027-01-09", venue: "Balai Sarbini", city: "Jakarta", price: 175000, image: IMG[0] },
]

const cityOptions = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali", "Medan", "Makassar"]

const tabs = [
    { id: "following", label: "Mengikuti" },
    { id: "favorites", label: "Tiket favorit" },
    { id: "settings", label: "Pengaturan" },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

const formatDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number)
    return `${d} ${MONTHS[m - 1]} ${y}`
}
const formatIDR = (n) => `IDR ${n.toLocaleString("id-ID")}`
const formatCompact = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(".", ",")} jt`
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",").replace(",0", "")} rb`
    return String(n)
}
const initials = (name) =>
    name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("")

const FOCUS =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBADCC]"

const BTN_PRIMARY = `rounded-lg bg-[#FBADCC] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#f8a0c4] disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`
const BTN_OUTLINE = `rounded-lg border border-[#333] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#555] disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`

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

function HeartIcon({ filled }) {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
            <path d="M10 17s-6.5-4.1-6.5-8.6A3.6 3.6 0 0110 6.3a3.6 3.6 0 016.5 2.1C16.5 12.9 10 17 10 17z" strokeLinejoin="round" />
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

function Avatar({ name, src, size = "h-12 w-12 text-sm" }) {
    if (src) {
        return <img src={src} alt={name} className={`${size} shrink-0 rounded-full object-cover`} />
    }
    return (
        <div
            className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#FBADCC]/15 font-semibold text-[#FBADCC]`}
            aria-hidden="true"
        >
            {initials(name)}
        </div>
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
                : "border-[#272727] text-gray-400 hover:border-[#444] hover:text-white"
                }`}
        >
            {children}
        </button>
    )
}

function EmptyState({ title, message, action }) {
    return (
        <div className="rounded-2xl border border-dashed border-[#272727] px-6 py-16 text-center">
            <p className="text-sm font-medium">{title}</p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-gray-500">{message}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    )
}

function Switch({ checked, onChange, label, description, id }) {
    return (
        <div className="flex items-start justify-between gap-4 py-4">
            <div className="min-w-0">
                <label htmlFor={id} className="text-sm font-medium">{label}</label>
                <p className="mt-0.5 text-xs text-gray-500">{description}</p>
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${FOCUS} ${checked ? "bg-[#FBADCC]" : "bg-[#333]"}`}
            >
                <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full transition-transform motion-reduce:transition-none ${checked ? "translate-x-5 bg-black" : "translate-x-0 bg-white"}`}
                />
            </button>
        </div>
    )
}

function Field({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-gray-300">{label}</label>
            {children}
            {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>
    )
}

const inputClass = (invalid) =>
    `w-full rounded-lg border bg-[#131313] px-3.5 py-2.5 text-sm text-white placeholder:text-gray-600 transition-colors focus:outline-none focus:ring-1 ${invalid
        ? "border-red-400/70 focus:border-red-400 focus:ring-red-400"
        : "border-[#272727] focus:border-[#FBADCC] focus:ring-[#FBADCC]"
    }`

function SettingsCard({ title, description, children }) {
    return (
        <section className="rounded-2xl border border-[#272727] bg-[#131313]">
            <div className="border-b border-[#272727] px-5 py-4 sm:px-6">
                <h2 className="text-sm font-semibold">{title}</h2>
                {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
            </div>
            <div className="px-5 py-5 sm:px-6">{children}</div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/* Tab: Mengikuti                                                      */
/* ------------------------------------------------------------------ */

function FollowingTab({ items, onToggle }) {
    const [query, setQuery] = useState("")
    const [type, setType] = useState("all")

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return items.filter(
            (i) => (type === "all" || i.type === type) && (!q || i.name.toLowerCase().includes(q))
        )
    }, [items, query, type])

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative sm:w-72">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                        <SearchIcon />
                    </span>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari artis atau penyelenggara"
                        aria-label="Cari yang diikuti"
                        className={`${inputClass(false)} pl-10`}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <Chip active={type === "all"} onClick={() => setType("all")}>Semua</Chip>
                    <Chip active={type === "artis"} onClick={() => setType("artis")}>Artis</Chip>
                    <Chip active={type === "penyelenggara"} onClick={() => setType("penyelenggara")}>Penyelenggara</Chip>
                </div>
            </div>

            {filtered.length === 0 ? (
                <EmptyState
                    title={items.length === 0 ? "Kamu belum mengikuti siapa pun" : "Tidak ada hasil"}
                    message={
                        items.length === 0
                            ? "Ikuti artis dan penyelenggara favoritmu untuk dapat kabar saat tiket baru dibuka."
                            : "Coba kata kunci atau filter yang lain."
                    }
                    action={
                        items.length === 0 && (
                            <Link href="/events" className={`inline-block ${BTN_PRIMARY}`}>Jelajahi event</Link>
                        )
                    }
                />
            ) : (
                <ul className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                    {filtered.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center gap-4 rounded-2xl border border-[#272727] bg-[#131313] p-4 transition-colors hover:border-[#3a3a3a]"
                        >
                            <Avatar name={item.name} />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">{item.name}</p>
                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                    {item.type === "artis" ? "Artis" : "Penyelenggara"} · {formatCompact(item.followers)} pengikut
                                </p>
                                <p className="mt-0.5 text-xs text-gray-400">
                                    {item.upcoming > 0 ? `${item.upcoming} event mendatang` : "Belum ada event mendatang"}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => onToggle(item.id)}
                                aria-pressed={item.followed}
                                aria-label={`${item.followed ? "Berhenti mengikuti" : "Ikuti"} ${item.name}`}
                                className={
                                    item.followed
                                        ? BTN_OUTLINE
                                        : BTN_PRIMARY
                                }
                            >
                                {item.followed ? "Mengikuti" : "Ikuti"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Tab: Tiket favorit                                                  */
/* ------------------------------------------------------------------ */

function FavoritesTab({ items, onRemove }) {
    const [sort, setSort] = useState("date")

    const sorted = useMemo(() => {
        const copy = [...items]
        if (sort === "date") copy.sort((a, b) => a.date.localeCompare(b.date))
        if (sort === "price") copy.sort((a, b) => a.price - b.price)
        return copy
    }, [items, sort])

    if (items.length === 0) {
        return (
            <EmptyState
                title="Belum ada tiket favorit"
                message="Tekan ikon hati pada sebuah event untuk menyimpannya di sini."
                action={<Link href="/events" className={`inline-block ${BTN_PRIMARY}`}>Jelajahi event</Link>}
            />
        )
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500">{items.length} tiket tersimpan</p>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort-fav" className="text-xs text-gray-500">Urutkan</label>
                    <select
                        id="sort-fav"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-lg border border-[#272727] bg-[#131313] px-3 py-2 text-xs text-white focus:border-[#FBADCC] focus:outline-none focus:ring-1 focus:ring-[#FBADCC]"
                    >
                        <option value="date">Tanggal terdekat</option>
                        <option value="price">Harga terendah</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {sorted.map((event) => (
                    <article
                        key={event.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-[#272727] bg-[#131313] transition-colors hover:border-[#3a3a3a]"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            />
                            <button
                                type="button"
                                onClick={() => onRemove(event.id)}
                                aria-label={`Hapus ${event.title} dari favorit`}
                                className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#FBADCC] backdrop-blur transition-colors hover:bg-black/80 ${FOCUS}`}
                            >
                                <HeartIcon filled />
                            </button>
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
                        </div>

                        <div className="relative h-0 border-t border-dashed border-[#333]" aria-hidden="true">
                            <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-[#272727] bg-[#1a1a1a]" />
                            <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full border border-[#272727] bg-[#1a1a1a]" />
                        </div>

                        <div className="flex items-center justify-between gap-3 px-5 py-4">
                            <div>
                                <p className="text-[11px] text-gray-500">Mulai dari</p>
                                <p className="text-sm font-semibold">{formatIDR(event.price)}</p>
                            </div>
                            <Link href={`/events/${event.id}`} className={BTN_PRIMARY}>Beli tiket</Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Tab: Pengaturan                                                     */
/* ------------------------------------------------------------------ */

function SettingsTab({ profile, avatar, onSaveProfile, onAvatarChange }) {
    const [draft, setDraft] = useState(profile)
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [notif, setNotif] = useState({
        reminder: true,
        followed: true,
        promo: false,
        email: true,
    })
    const [twoFactor, setTwoFactor] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const fileRef = useRef(null)

    const dirty = ["name", "email", "phone", "city"].some((k) => draft[k] !== profile[k])

    const set = (key) => (e) => setDraft((d) => ({ ...d, [key]: e.target.value }))

    const validate = () => {
        const next = {}
        if (!draft.name.trim()) next.name = "Nama wajib diisi."
        if (!/^\S+@\S+\.\S+$/.test(draft.email)) next.email = "Format email belum benar."
        if (!/^(\+62|62|0)8\d{7,12}$/.test(draft.phone.replace(/[\s-]/g, "")))
            next.phone = "Gunakan nomor Indonesia, contoh 081234567890."
        setErrors(next)
        return Object.keys(next).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        setSaving(true)
        // TODO: ganti dengan request ke API kamu
        setTimeout(() => {
            onSaveProfile(draft)
            setSaving(false)
            setSaved(true)
        }, 600)
    }

    useEffect(() => {
        if (!saved) return
        const id = setTimeout(() => setSaved(false), 3000)
        return () => clearTimeout(id)
    }, [saved])

    const handleFile = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
            setErrors((er) => ({ ...er, avatar: "Pilih gambar JPG atau PNG dengan ukuran maksimal 2 MB." }))
            return
        }
        setErrors((er) => ({ ...er, avatar: undefined }))
        onAvatarChange(URL.createObjectURL(file))
    }

    return (
        <div className="space-y-6">
            {/* Akun */}
            <SettingsCard title="Informasi akun" description="Data ini dipakai untuk pemesanan dan pengiriman e-tiket.">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="flex items-center gap-4">
                        <Avatar name={draft.name || profile.name} src={avatar} size="h-16 w-16 text-lg" />
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={() => fileRef.current?.click()} className={BTN_OUTLINE}>
                                    Ganti foto
                                </button>
                                {avatar && (
                                    <button type="button" onClick={() => onAvatarChange(null)} className={`${BTN_OUTLINE} text-gray-400`}>
                                        Hapus
                                    </button>
                                )}
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">JPG atau PNG, maksimal 2 MB.</p>
                            {errors.avatar && <p className="mt-1 text-xs text-red-400">{errors.avatar}</p>}
                        </div>
                        <input ref={fileRef} type="file" accept="image/png,image/jpeg" onChange={handleFile} className="hidden" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field id="name" label="Nama lengkap" error={errors.name}>
                            <input
                                id="name"
                                value={draft.name}
                                onChange={set("name")}
                                autoComplete="name"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                className={inputClass(!!errors.name)}
                            />
                        </Field>
                        <Field id="email" label="Email" error={errors.email}>
                            <input
                                id="email"
                                type="email"
                                value={draft.email}
                                onChange={set("email")}
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                className={inputClass(!!errors.email)}
                            />
                        </Field>
                        <Field id="phone" label="Nomor telepon" error={errors.phone}>
                            <input
                                id="phone"
                                type="tel"
                                value={draft.phone}
                                onChange={set("phone")}
                                autoComplete="tel"
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
                                className={inputClass(!!errors.phone)}
                            />
                        </Field>
                        <Field id="city" label="Kota">
                            <select id="city" value={draft.city} onChange={set("city")} className={inputClass(false)}>
                                {cityOptions.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button type="submit" disabled={!dirty || saving} className={BTN_PRIMARY}>
                            {saving ? "Menyimpan…" : "Simpan perubahan"}
                        </button>
                        {dirty && !saving && (
                            <button
                                type="button"
                                onClick={() => {
                                    setDraft(profile)
                                    setErrors({})
                                }}
                                className={BTN_OUTLINE}
                            >
                                Batalkan
                            </button>
                        )}
                        <span role="status" aria-live="polite" className="text-xs text-[#FBADCC]">
                            {saved ? "Perubahan disimpan." : ""}
                        </span>
                    </div>
                </form>
            </SettingsCard>

            {/* Notifikasi */}
            <SettingsCard title="Notifikasi" description="Atur kabar apa yang ingin kamu terima.">
                <div className="-my-4 divide-y divide-[#272727]">
                    <Switch
                        id="n-reminder"
                        label="Pengingat acara"
                        description="Kami kirim pengingat H-3 dan H-1 untuk tiket yang sudah kamu beli."
                        checked={notif.reminder}
                        onChange={(v) => setNotif((n) => ({ ...n, reminder: v }))}
                    />
                    <Switch
                        id="n-followed"
                        label="Event dari yang kamu ikuti"
                        description="Dapat kabar saat artis atau penyelenggara yang kamu ikuti membuka penjualan tiket."
                        checked={notif.followed}
                        onChange={(v) => setNotif((n) => ({ ...n, followed: v }))}
                    />
                    <Switch
                        id="n-promo"
                        label="Promo dan penawaran"
                        description="Diskon dan voucher yang relevan dengan event favoritmu."
                        checked={notif.promo}
                        onChange={(v) => setNotif((n) => ({ ...n, promo: v }))}
                    />
                    <Switch
                        id="n-email"
                        label="Notifikasi lewat email"
                        description="Kirim juga semua notifikasi di atas ke alamat emailmu."
                        checked={notif.email}
                        onChange={(v) => setNotif((n) => ({ ...n, email: v }))}
                    />
                </div>
            </SettingsCard>

            {/* Keamanan */}
            <SettingsCard title="Keamanan" description="Lindungi akun dan tiketmu.">
                <div className="-my-4 divide-y divide-[#272727]">
                    <div className="flex items-center justify-between gap-4 py-4">
                        <div>
                            <p className="text-sm font-medium">Kata sandi</p>
                            <p className="mt-0.5 text-xs text-gray-500">Gunakan kata sandi yang unik dan sulit ditebak.</p>
                        </div>
                        <Link href="/profile/password" className={`shrink-0 ${BTN_OUTLINE}`}>Ubah</Link>
                    </div>
                    <Switch
                        id="two-factor"
                        label="Verifikasi dua langkah"
                        description="Minta kode tambahan setiap kali masuk dari perangkat baru."
                        checked={twoFactor}
                        onChange={setTwoFactor}
                    />
                </div>
            </SettingsCard>

            {/* Zona akun */}
            <SettingsCard title="Keluar dan hapus akun">
                <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-gray-500">Keluar dari akun ini di perangkat yang sedang kamu pakai.</p>
                        <button type="button" className={BTN_OUTLINE}>Keluar</button>
                    </div>
                    <div className="border-t border-[#272727] pt-5">
                        {!confirmDelete ? (
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="max-w-md text-xs text-gray-500">
                                    Menghapus akun akan menghapus riwayat pesanan dan tiket favoritmu secara permanen.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setConfirmDelete(true)}
                                    className={`rounded-lg border border-red-400/40 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/10 ${FOCUS}`}
                                >
                                    Hapus akun
                                </button>
                            </div>
                        ) : (
                            <div role="alertdialog" aria-label="Konfirmasi hapus akun" className="rounded-xl border border-red-400/30 bg-red-400/5 p-4">
                                <p className="text-sm font-medium">Hapus akun secara permanen?</p>
                                <p className="mt-1 text-xs text-gray-400">Tindakan ini tidak bisa dibatalkan. Tiket yang sudah dibeli tetap berlaku sampai acara selesai.</p>
                                <div className="mt-4 flex gap-2">
                                    <button type="button" className={`rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600 ${FOCUS}`}>
                                        Ya, hapus akun
                                    </button>
                                    <button type="button" onClick={() => setConfirmDelete(false)} className={BTN_OUTLINE}>
                                        Batal
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SettingsCard>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("following")
    const [profile, setProfile] = useState(initialProfile)
    const [avatar, setAvatar] = useState(null)
    const [following, setFollowing] = useState(initialFollowing)
    const [favorites, setFavorites] = useState(initialFavorites)

    const followingCount = following.filter((f) => f.followed).length

    const toggleFollow = (id) =>
        setFollowing((list) => list.map((f) => (f.id === id ? { ...f, followed: !f.followed } : f)))
    const removeFavorite = (id) => setFavorites((list) => list.filter((f) => f.id !== id))

    const onTabKeyDown = (e) => {
        const i = tabs.findIndex((t) => t.id === activeTab)
        let next = i
        if (e.key === "ArrowRight") next = (i + 1) % tabs.length
        else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length
        else return
        e.preventDefault()
        setActiveTab(tabs[next].id)
        document.getElementById(`tab-${tabs[next].id}`)?.focus()
    }

    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <UserNavbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    {/* Kartu utama (profil) */}
                    <aside className="w-full shrink-0 rounded-2xl border border-[#272727] bg-[#1a1a1a] lg:sticky lg:top-24 lg:w-72 xl:w-80">
                        <div className="flex items-center gap-4 p-5 lg:flex-col lg:p-6 lg:text-center">
                            <Avatar name={profile.name} src={avatar} size="h-16 w-16 text-xl lg:h-24 lg:w-24 lg:text-3xl" />
                            <div className="min-w-0 flex-1 lg:w-full lg:flex-none">
                                <h1 className="truncate text-lg font-semibold">{profile.name}</h1>
                                <p className="mt-0.5 truncate text-xs text-gray-500">@{profile.username}</p>
                                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400 lg:justify-center">
                                    <PinIcon />
                                    {profile.city}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveTab("settings")}
                                className={`shrink-0 lg:mt-1 lg:w-full ${BTN_OUTLINE}`}
                            >
                                Edit profil
                            </button>
                        </div>

                        <dl className="divide-y divide-[#272727] border-t border-[#272727] text-sm">
                            <div className="flex items-center justify-between px-5 py-3.5 lg:px-6">
                                <dt className="text-xs text-gray-500">Mengikuti</dt>
                                <dd className="font-semibold">{followingCount}</dd>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3.5 lg:px-6">
                                <dt className="text-xs text-gray-500">Tiket favorit</dt>
                                <dd className="font-semibold">{favorites.length}</dd>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3.5 lg:px-6">
                                <dt className="text-xs text-gray-500">Bergabung</dt>
                                <dd className="font-semibold">{profile.joined}</dd>
                            </div>
                        </dl>
                    </aside>

                    {/* Kartu konten: Mengikuti, Tiket favorit, Pengaturan */}
                    <section className="min-w-0 flex-1 rounded-2xl border border-[#272727] bg-[#1a1a1a]">
                        <div
                            role="tablist"
                            aria-label="Bagian profil"
                            onKeyDown={onTabKeyDown}
                            className="flex gap-1 overflow-x-auto border-b border-[#272727] px-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden"
                        >
                            {tabs.map((tab) => {
                                const active = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        id={`tab-${tab.id}`}
                                        role="tab"
                                        type="button"
                                        aria-selected={active}
                                        aria-controls={`panel-${tab.id}`}
                                        tabIndex={active ? 0 : -1}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`-mb-px whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-colors ${FOCUS} ${active
                                            ? "border-[#FBADCC] text-white"
                                            : "border-transparent text-gray-500 hover:text-gray-300"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </div>

                        <div
                            id={`panel-${activeTab}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${activeTab}`}
                            className="p-4 sm:p-6"
                        >
                            {activeTab === "following" && <FollowingTab items={following} onToggle={toggleFollow} />}
                            {activeTab === "favorites" && <FavoritesTab items={favorites} onRemove={removeFavorite} />}
                            {activeTab === "settings" && (
                                <SettingsTab
                                    profile={profile}
                                    avatar={avatar}
                                    onSaveProfile={setProfile}
                                    onAvatarChange={setAvatar}
                                />
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}