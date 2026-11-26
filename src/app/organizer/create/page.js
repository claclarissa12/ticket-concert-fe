
"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { organizerApi } from "../../../../lib/api"

const emptyTier = {
    name: "",
    price: "",
    quota: "",
    sale_start: "",
    sale_end: ""
}

export default function CreateEvent() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [layoutFile, setLayoutFile] = useState(null)

    const [form, setForm] = useState({
        title: "",
        description: "",
        venue: "",
        location: "",
        date: "",
        time: "",
        banner_url: "",
        map_url: ""
    })

    const [tiers, setTiers] = useState([{ ...emptyTier }])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleTierChange = (index, e) => {
        const updatedTiers = [...tiers]
        updatedTiers[index][e.target.name] = e.target.value
        setTiers(updatedTiers)
    }

    const addTier = () => {
        setTiers([...tiers, { ...emptyTier }])
    }

    const removeTier = (index) => {
        setTiers(tiers.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            if (!form.title.trim() || !form.venue.trim() || !form.location.trim() || !form.date || !form.time) {
                throw new Error("Title, venue, location, date, dan time wajib diisi")
            }

            const dateTime = new Date(`${form.date}T${form.time}:00`)

            if (isNaN(dateTime.getTime())) {
                throw new Error("Format tanggal dan jam tidak valid")
            }

            if (dateTime <= new Date()) {
                throw new Error("Tanggal konser harus di masa depan")
            }

            if (tiers.length === 0) {
                throw new Error("Tambahkan minimal satu kategori tiket")
            }

            if (form.map_url && !form.map_url.includes("/maps/embed")) {
                throw new Error("Gunakan Embed URL Google Maps")
            }

            const tierPayloads = tiers.map((tier, index) => {
                if (!tier.name.trim() || !tier.price || !tier.quota || !tier.sale_start || !tier.sale_end) {
                    throw new Error(`Lengkapi semua data tiket nomor ${index + 1}`)
                }

                const start = new Date(tier.sale_start)
                const end = new Date(tier.sale_end)

                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    throw new Error(`Tanggal penjualan tiket nomor ${index + 1} tidak valid`)
                }

                if (end <= start) {
                    throw new Error(`Tanggal akhir penjualan tiket nomor ${index + 1} harus setelah tanggal mulai`)
                }

                if (Number(tier.price) <= 0 || Number(tier.quota) <= 0) {
                    throw new Error(`Harga dan kuota tiket nomor ${index + 1} harus lebih dari 0`)
                }

                return {
                    name: tier.name.trim(),
                    price: Number(tier.price),
                    quota: Number(tier.quota),
                    sold: 0,
                    sale_start: start.toISOString(),
                    sale_end: end.toISOString()
                }
            })

            const formData = new FormData()

            Object.entries({
                title: form.title.trim(),
                description: form.description.trim(),
                venue: form.venue.trim(),
                location: form.location.trim(),
                date: dateTime.toISOString(),
                banner_url: form.banner_url.trim(),
                map_url: form.map_url.trim()
            }).forEach(([key, value]) => formData.append(key, value))

            if (layoutFile) {
                formData.append("layout", layoutFile)
            }

            const response = await organizerApi.createConcertWithLayout(formData)

            const concert = response?.data?.concert ||
                response?.data?.item ||
                response?.data ||
                response?.concert ||
                response

            if (!concert?.id) {
                throw new Error("ID konser tidak ditemukan pada response backend")
            }

            for (const tier of tierPayloads) {
                await organizerApi.createTier(concert.id, tier)
            }

            router.push("/organizer/events")
        } catch (err) {
            console.error("CREATE EVENT ERROR:", err)
            setError(err.message || "Gagal membuat konser")
        } finally {
            setLoading(false)
        }
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create Event</h1>
                                <p className="text-gray-400 text-sm mt-1">Create a new event for your audience</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link href="/organizer/events" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Cancel
                                </Link>
                                <button onClick={handleSubmit} disabled={loading} className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all disabled:opacity-50">
                                    {loading ? "Saving..." : "Save Event"}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Event Name</label>
                                            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter event name" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">Venue</label>
                                                <input type="text" name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. Hall A" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">Location</label>
                                                <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Jakarta" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">Date</label>
                                                <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1.5">Time</label>
                                                <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Description</h2>
                                    <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe your event..." className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none resize-none" />
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Event Banner URL</h2>
                                    <input type="url" name="banner_url" value={form.banner_url} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                    <p className="text-xs text-gray-500 mt-2">Masukkan link gambar poster dari internet (maks 500 karakter)</p>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <label className="text-sm text-gray-400 block mb-1.5">Upload Gambar Layout Panggung</label>
                                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setLayoutFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#FBADCC] file:text-black file:text-sm" />
                                    <p className="text-xs text-gray-500 mt-2">JPG / PNG / WEBP, maks 5 MB.</p>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <label className="text-sm text-gray-400 block mb-1.5">Link Google Maps Venue</label>
                                    <input type="url" name="map_url" value={form.map_url} onChange={handleChange} placeholder="https://www.google.com/maps/embed?pb=..." className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none" />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Buka Google Maps → cari venue → <b>Share</b> → tab <b>Embed a map</b> → <b>Copy HTML</b> → ambil URL di dalam <code>src="..."</code>.
                                    </p>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <div className="flex items-center justify-between mb-5">
                                        <div>
                                            <h2 className="text-lg font-semibold">Ticket Tiers</h2>
                                            <p className="text-sm text-gray-400 mt-1">Tambahkan kategori dan harga tiket konser</p>
                                        </div>
                                        <button type="button" onClick={addTier} className="px-4 py-2 bg-[#FBADCC] text-black rounded-xl text-sm font-semibold hover:opacity-90">
                                            + Add Ticket
                                        </button>
                                    </div>

                                    <div className="space-y-5">
                                        {tiers.map((tier, index) => (
                                            <div key={index} className="bg-[#1a1a1a] border border-[#383838] rounded-xl p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-[#FBADCC]">Ticket {index + 1}</h3>
                                                    {tiers.length > 1 && (
                                                        <button type="button" onClick={() => removeTier(index)} className="text-red-400 text-sm hover:text-red-300">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-sm text-gray-400 block mb-1.5">Ticket Name</label>
                                                        <input type="text" name="name" value={tier.name} onChange={(e) => handleTierChange(index, e)} placeholder="Contoh: VIP, Regular, Festival" className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-sm text-gray-400 block mb-1.5">Ticket Price (Rp)</label>
                                                            <input type="number" name="price" min="1" value={tier.price} onChange={(e) => handleTierChange(index, e)} placeholder="1500000" className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm text-gray-400 block mb-1.5">Quota</label>
                                                            <input type="number" name="quota" min="1" value={tier.quota} onChange={(e) => handleTierChange(index, e)} placeholder="100" className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-sm text-gray-400 block mb-1.5">Sale Start</label>
                                                            <input type="datetime-local" name="sale_start" value={tier.sale_start} onChange={(e) => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none text-white" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm text-gray-400 block mb-1.5">Sale End</label>
                                                            <input type="datetime-local" name="sale_end" value={tier.sale_end} onChange={(e) => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] focus:border-[#FBADCC] outline-none text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-2">Event Status</h2>
                                    <div className="px-4 py-3 rounded-xl border border-[#FBADCC] bg-[#FBADCC]/10">
                                        <p className="font-medium text-[#FBADCC]">Draft</p>
                                        <p className="text-xs text-gray-400 mt-1">Event will be saved as draft</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EoGuard>
    )
}
