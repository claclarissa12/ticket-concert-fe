
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { organizerApi } from "../../../../../../lib/api"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"

export default function EditEvent() {
    const { id } = useParams()
    const router = useRouter()

    const [form, setForm] = useState({
        title: "",
        description: "",
        venue: "",
        location: "",
        date: "",
        time: "",
        banner_url: ""
    })
    console.log("ID KONSER:", id);
    console.log("URL DETAIL:", `/eo/concerts/${id}`);
    const [concert, setConcert] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [tiers, setTiers] = useState([])

    useEffect(() => {
        if (id) {
            fetchConcert()
        }
    }, [id])

    const fetchConcert = async () => {
        try {
            setLoading(true)

            const [result, tierResult] = await Promise.all([
                organizerApi.getMyConcertById(id),
                organizerApi.getTiers(id)
            ])

            console.log("DETAIL CONCERT:", result)
            console.log("DETAIL TIERS:", tierResult)

            const data = result?.data?.concert || result?.data
            const tierData =
                tierResult?.data?.items ||
                tierResult?.data?.tiers ||
                tierResult?.data ||
                []

            if (!data || !data.id) {
                throw new Error("Data konser tidak ditemukan")
            }

            setConcert(data)

            const date = new Date(data.date)

            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const day = String(date.getDate()).padStart(2, "0")
            const hours = String(date.getHours()).padStart(2, "0")
            const minutes = String(date.getMinutes()).padStart(2, "0")

            setForm({
                title: data.title || "",
                description: data.description || "",
                venue: data.venue || "",
                location: data.location || "",
                date: `${year}-${month}-${day}`,
                time: `${hours}:${minutes}`,
                banner_url: data.banner_url || ""
            })

            setTiers(
                Array.isArray(tierData)
                    ? tierData.map(tier => ({
                        id: tier.id,
                        name: tier.name || "",
                        price: String(tier.price ?? ""),
                        quota: String(tier.quota ?? ""),
                        sold: Number(tier.sold || 0),
                        sale_start: formatDateTimeLocal(tier.sale_start),
                        sale_end: formatDateTimeLocal(tier.sale_end),
                        deleted: false
                    }))
                    : []
            )

        } catch (err) {
            console.error("GET CONCERT ERROR:", err)
            alert(err.message || "Gagal mengambil data konser")
            setConcert(null)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleTierChange = (index, e) => {
        const { name, value } = e.target

        setTiers(prev => prev.map((tier, i) =>
            i === index ? { ...tier, [name]: value } : tier
        ))
    }

    const addTier = () => {
        setTiers(prev => [
            ...prev,
            {
                id: null,
                name: "",
                price: "",
                quota: "",
                sold: 0,
                sale_start: "",
                sale_end: "",
                deleted: false
            }
        ])
    }

    const removeTier = (index) => {
        setTiers(prev => {
            const selected = prev[index]

            if (selected.id) {
                return prev.map((tier, i) =>
                    i === index ? { ...tier, deleted: true } : tier
                )
            }

            return prev.filter((_, i) => i !== index)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !form.title.trim() ||
            !form.venue.trim() ||
            !form.location.trim() ||
            !form.date ||
            !form.time
        ) {
            alert("Mohon lengkapi semua data yang wajib diisi")
            return
        }

        const selectedDate = new Date(`${form.date}T${form.time}:00`)

        if (
            Number.isNaN(selectedDate.getTime()) ||
            selectedDate <= new Date()
        ) {
            alert("Tanggal konser harus berada di masa depan")
            return
        }

        const activeTiers = tiers.filter(tier => !tier.deleted)

        if (activeTiers.length === 0) {
            alert("Konser harus memiliki minimal satu kategori tiket")
            return
        }

        try {
            setSaving(true)

            const concertPayload = {
                title: form.title.trim(),
                description: form.description.trim() || null,
                venue: form.venue.trim(),
                location: form.location.trim(),
                date: selectedDate.toISOString(),
                banner_url: form.banner_url.trim() || null
            }

            console.log("UPDATE CONCERT:", concertPayload)

            await organizerApi.updateConcert(id, concertPayload)

            for (const tier of tiers) {
                if (tier.deleted) {
                    if (tier.id) {
                        await organizerApi.deleteTier(tier.id)
                    }
                    continue
                }

                if (
                    !tier.name.trim() ||
                    !tier.price ||
                    !tier.quota ||
                    !tier.sale_start ||
                    !tier.sale_end
                ) {
                    throw new Error(`Lengkapi semua data tiket ${tier.name || "baru"}`)
                }

                const start = new Date(tier.sale_start)
                const end = new Date(tier.sale_end)

                if (
                    Number.isNaN(start.getTime()) ||
                    Number.isNaN(end.getTime()) ||
                    end <= start
                ) {
                    throw new Error(`Periksa tanggal penjualan tiket ${tier.name}`)
                }

                if (
                    Number(tier.price) <= 0 ||
                    Number(tier.quota) <= 0
                ) {
                    throw new Error(`Harga dan kuota tiket ${tier.name} harus lebih dari 0`)
                }

                const tierPayload = {
                    name: tier.name.trim(),
                    price: Number(tier.price),
                    quota: Number(tier.quota),
                    sale_start: start.toISOString(),
                    sale_end: end.toISOString()
                }

                if (tier.id) {
                    await organizerApi.updateTier(tier.id, tierPayload)
                } else {
                    await organizerApi.createTier(id, tierPayload)
                }
            }

            alert("Konser dan kategori tiket berhasil diperbarui!")

            router.push("/organizer/events")
            router.refresh()

        } catch (err) {
            console.error("UPDATE EVENT ERROR:", err)
            alert(err.message || "Gagal memperbarui konser")
        } finally {
            setSaving(false)
        }
    }
    function formatDateTimeLocal(value) {
        if (!value) return ""

        const date = new Date(value)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")

        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    if (loading) {
        return (
            <EoGuard>
                <div className="bg-[#131313] min-h-screen flex text-white">
                    <OrganizerSidebar />
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-400">Loading event...</p>
                    </div>
                </div>
            </EoGuard>
        )
    }

    if (!concert) {
        return (
            <EoGuard>
                <div className="bg-[#131313] min-h-screen flex text-white">
                    <OrganizerSidebar />
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <p className="text-gray-400">Data konser tidak ditemukan.</p>
                        <Link
                            href="/organizer/events"
                            className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-black font-semibold"
                        >
                            Kembali ke Events
                        </Link>
                    </div>
                </div>
            </EoGuard>
        )
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="/organizer/events"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </Link>

                                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                            Edit Event
                                        </h1>
                                    </div>

                                    <p className="text-gray-400 text-sm mt-1">
                                        Update your concert information
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/organizer/events"
                                        className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all disabled:opacity-50"
                                    >
                                        {saving ? "Updating..." : "Update Event"}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                <div className="lg:col-span-2 space-y-6">

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Basic Information
                                        </h2>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">
                                                    Event Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={form.title}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                    placeholder="Enter event name"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm text-gray-400 block mb-1.5">
                                                        Date *
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        value={form.date}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm text-gray-400 block mb-1.5">
                                                        Time *
                                                    </label>
                                                    <input
                                                        type="time"
                                                        name="time"
                                                        value={form.time}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">
                                                    Venue *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="venue"
                                                    value={form.venue}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                    placeholder="Enter venue name"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">
                                                    Location / Address *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={form.location}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                    placeholder="Enter event location"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Description
                                        </h2>

                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none resize-none"
                                            placeholder="Describe your concert..."
                                        />
                                    </div>

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Event Poster
                                        </h2>

                                        <div className="flex flex-col sm:flex-row items-start gap-4">
                                            <div className="w-32 h-32 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center overflow-hidden">
                                                {form.banner_url ? (
                                                    <img
                                                        src={form.banner_url}
                                                        alt="Event poster"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-500 text-xs">
                                                        No Poster
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex-1 w-full">
                                                <label className="text-sm text-gray-400 block mb-1.5">
                                                    Poster URL
                                                </label>

                                                <input
                                                    type="url"
                                                    name="banner_url"
                                                    value={form.banner_url}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                    placeholder="https://example.com/poster.jpg"
                                                />

                                                <p className="text-xs text-gray-500 mt-2">
                                                    Masukkan URL gambar poster konser.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <div className="flex items-center justify-between mb-5">
                                            <div>
                                                <h2 className="text-lg font-semibold">Ticket Tiers</h2>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    Edit kategori, harga, kuota, dan periode penjualan tiket
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={addTier}
                                                className="px-4 py-2 bg-[#FBADCC] text-black rounded-xl text-sm font-semibold hover:opacity-90"
                                            >
                                                + Add Ticket
                                            </button>
                                        </div>

                                        <div className="space-y-5">
                                            {tiers.map((tier, index) => {
                                                if (tier.deleted) return null

                                                return (
                                                    <div
                                                        key={tier.id || `new-${index}`}
                                                        className="bg-[#1a1a1a] border border-[#383838] rounded-xl p-5"
                                                    >
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div>
                                                                <h3 className="font-semibold text-[#FBADCC]">
                                                                    Ticket {index + 1}
                                                                </h3>
                                                                {tier.id && (
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        Existing Ticket
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => removeTier(index)}
                                                                className="text-red-400 text-sm hover:text-red-300"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="text-sm text-gray-400 block mb-1.5">
                                                                    Ticket Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={tier.name}
                                                                    onChange={(e) => handleTierChange(index, e)}
                                                                    className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none"
                                                                    placeholder="Contoh: VIP, Regular, Festival"
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-sm text-gray-400 block mb-1.5">
                                                                        Ticket Price (Rp)
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="price"
                                                                        min="1"
                                                                        value={tier.price}
                                                                        onChange={(e) => handleTierChange(index, e)}
                                                                        className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none"
                                                                        placeholder="1500000"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="text-sm text-gray-400 block mb-1.5">
                                                                        Quota
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="quota"
                                                                        min={tier.sold}
                                                                        value={tier.quota}
                                                                        onChange={(e) => handleTierChange(index, e)}
                                                                        className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none"
                                                                        placeholder="100"
                                                                    />
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        Terjual: {tier.sold}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-sm text-gray-400 block mb-1.5">
                                                                        Sale Start
                                                                    </label>
                                                                    <input
                                                                        type="datetime-local"
                                                                        name="sale_start"
                                                                        value={tier.sale_start}
                                                                        onChange={(e) => handleTierChange(index, e)}
                                                                        className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none text-white"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="text-sm text-gray-400 block mb-1.5">
                                                                        Sale End
                                                                    </label>
                                                                    <input
                                                                        type="datetime-local"
                                                                        name="sale_end"
                                                                        value={tier.sale_end}
                                                                        onChange={(e) => handleTierChange(index, e)}
                                                                        className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none text-white"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {tiers.filter(tier => !tier.deleted).length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-6">
                                                Belum ada kategori tiket. Klik Add Ticket untuk menambahkan.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Event Status
                                        </h2>

                                        <div className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333]">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium capitalize">
                                                        {concert.status}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Current event status
                                                    </p>
                                                </div>

                                                <div className={`w-3 h-3 rounded-full ${concert.status === "published"
                                                    ? "bg-green-400"
                                                    : concert.status === "cancelled"
                                                        ? "bg-red-400"
                                                        : "bg-[#FBADCC]"
                                                    }`} />
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-500 mt-3">
                                            Status konser dikelola melalui fitur publikasi konser.
                                        </p>
                                    </div>

                                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Pricing & Capacity
                                        </h2>

                                        <p className="text-sm text-gray-400 mb-4">
                                            Kelola harga tiket dan kapasitas melalui Ticket Tiers.
                                        </p>

                                        <Link
                                            href={`/organizer/events/${id}/tickets`}
                                            className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Manage Ticket Tiers
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </EoGuard>
    )
}
