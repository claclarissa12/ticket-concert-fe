
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { organizerApi, assetUrl } from "../../../../../../lib/api"
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
    const [concert, setConcert] = useState(null)
    const [tiers, setTiers] = useState([])
    const [mapUrl, setMapUrl] = useState("")
    const [layoutImage, setLayoutImage] = useState(null)
    const [layoutPreview, setLayoutPreview] = useState("")
    const [removeLayout, setRemoveLayout] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if (id) fetchConcert()
    }, [id])

    const fetchConcert = async () => {
        try {
            setLoading(true)
            const [result, tierResult] = await Promise.all([
                organizerApi.getMyConcertById(id),
                organizerApi.getTiers(id)
            ])

            const data = result?.data?.concert || result?.data
            const tierData = tierResult?.data?.items || tierResult?.data?.tiers || tierResult?.data || []

            if (!data?.id) throw new Error("Data konser tidak ditemukan")

            setConcert(data)
            setMapUrl(data.map_url || "")
            setLayoutPreview(data.layout_url ? assetUrl(data.layout_url) : "")
            setLayoutImage(null)
            setRemoveLayout(false)

            const date = new Date(data.date)

            setForm({
                title: data.title || "",
                description: data.description || "",
                venue: data.venue || "",
                location: data.location || "",
                date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
                time: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
                banner_url: data.banner_url || ""
            })

            setTiers(Array.isArray(tierData) ? tierData.map(t => ({
                id: t.id,
                name: t.name || "",
                price: String(t.price ?? ""),
                quota: String(t.quota ?? ""),
                sold: Number(t.sold || 0),
                sale_start: formatDateTimeLocal(t.sale_start),
                sale_end: formatDateTimeLocal(t.sale_end),
                deleted: false,
                error: ""
            })) : [])
        } catch (err) {
            console.error(err)
            alert(err.message || "Gagal mengambil data konser")
            setConcert(null)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setFormError("")
    }

    const handleTierChange = (index, e) => {
        setTiers(prev => prev.map((t, i) =>
            i === index ? { ...t, [e.target.name]: e.target.value, error: "" } : t
        ))
    }

    const addTier = () => {
        setTiers(prev => [...prev, {
            id: null,
            name: "",
            price: "",
            quota: "",
            sold: 0,
            sale_start: "",
            sale_end: "",
            deleted: false,
            error: ""
        }])
    }

    const removeTier = index => {
        const tier = tiers[index]

        if (tier.id && tier.sold > 0) {
            setTiers(prev => prev.map((t, i) =>
                i === index ? { ...t, error: `Tiket ini sudah terjual ${tier.sold} buah, jadi tidak bisa dihapus.` } : t
            ))
            return
        }

        if (tier.id) {
            if (!window.confirm(`Hapus tiket "${tier.name}"?`)) return
            setTiers(prev => prev.map((t, i) =>
                i === index ? { ...t, deleted: true, error: "" } : t
            ))
            return
        }

        setTiers(prev => prev.filter((_, i) => i !== index))
    }

    const handleLayoutChange = e => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert("File harus berupa JPG, PNG, atau WEBP.")
            e.target.value = ""
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 5 MB.")
            e.target.value = ""
            return
        }

        setLayoutImage(file)
        setLayoutPreview(URL.createObjectURL(file))
        setRemoveLayout(false)
    }

    const removeLayoutImage = () => {
        setLayoutImage(null)
        setLayoutPreview("")
        setRemoveLayout(true)
    }

    const formatDateTimeLocal = value => {
        if (!value) return ""
        const date = new Date(value)
        const pad = n => String(n).padStart(2, "0")
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
    }

    const getErrorMessage = (err, fallback) =>
        err?.response?.data?.message || err?.response?.data?.error || err?.message || fallback

    const handleSubmit = async e => {
        e.preventDefault()
        setFormError("")

        if (!form.title.trim() || !form.venue.trim() || !form.location.trim() || !form.date || !form.time) {
            setFormError("Mohon lengkapi semua data konser yang wajib diisi.")
            return
        }

        const selectedDate = new Date(`${form.date}T${form.time}:00`)

        if (Number.isNaN(selectedDate.getTime()) || selectedDate <= new Date()) {
            setFormError("Tanggal konser harus berada di masa depan.")
            return
        }

        const activeTiers = tiers.filter(t => !t.deleted)

        if (!activeTiers.length) {
            setFormError("Konser harus memiliki minimal satu kategori tiket.")
            return
        }

        const errors = {}

        tiers.forEach((tier, i) => {
            if (tier.deleted) return

            if (!tier.name.trim() || !tier.price || !tier.quota || !tier.sale_start || !tier.sale_end) {
                errors[i] = "Lengkapi semua data tiket ini."
                return
            }

            const start = new Date(tier.sale_start)
            const end = new Date(tier.sale_end)

            if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
                errors[i] = "Tanggal Sale End harus setelah Sale Start."
            } else if (Number(tier.price) <= 0 || Number(tier.quota) <= 0) {
                errors[i] = "Harga dan kuota harus lebih dari 0."
            } else if (Number(tier.quota) < tier.sold) {
                errors[i] = `Kuota tidak boleh kurang dari ${tier.sold} tiket yang sudah terjual.`
            }
        })

        if (Object.keys(errors).length) {
            setTiers(prev => prev.map((t, i) => ({ ...t, error: errors[i] || "" })))
            setFormError("Beberapa tiket perlu diperbaiki.")
            return
        }

        try {
            setSaving(true)

            const formData = new FormData()
            formData.append("title", form.title.trim())
            formData.append("description", form.description.trim())
            formData.append("venue", form.venue.trim())
            formData.append("location", form.location.trim())
            formData.append("date", selectedDate.toISOString())
            formData.append("banner_url", form.banner_url.trim())
            formData.append("map_url", mapUrl.trim())

            if (layoutImage) formData.append("layout", layoutImage)
            if (removeLayout) formData.append("remove_layout", "true")

            await organizerApi.updateConcertWithLayout(id, formData)

            const tierErrors = {}

            for (let i = 0; i < tiers.length; i++) {
                const tier = tiers[i]

                try {
                    if (tier.deleted) {
                        if (tier.id) await organizerApi.deleteTier(tier.id)
                        continue
                    }

                    const payload = {
                        name: tier.name.trim(),
                        price: Number(tier.price),
                        quota: Number(tier.quota),
                        sale_start: new Date(tier.sale_start).toISOString(),
                        sale_end: new Date(tier.sale_end).toISOString()
                    }

                    if (tier.id) {
                        await organizerApi.updateTier(tier.id, payload)
                    } else {
                        await organizerApi.createTier(id, payload)
                    }
                } catch (err) {
                    tierErrors[i] = getErrorMessage(err, `Gagal menyimpan tiket "${tier.name || "baru"}".`)
                }
            }

            if (Object.keys(tierErrors).length) {
                setTiers(prev => prev.map((t, i) => ({ ...t, error: tierErrors[i] || "" })))
                setFormError("Sebagian tiket gagal disimpan. Lihat pesan pada tiket yang bermasalah.")
                return
            }

            alert("Konser dan kategori tiket berhasil diperbarui!")
            router.push(`/organizer/events/${id}/detail`)
            router.refresh()
        } catch (err) {
            console.error("UPDATE EVENT ERROR:", err)
            setFormError(getErrorMessage(err, "Gagal memperbarui konser."))
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <EoGuard>
                <div className="min-h-screen bg-[#131313] flex text-white">
                    <OrganizerSidebar />
                    <div className="flex-1 flex items-center justify-center text-gray-400">Loading event...</div>
                </div>
            </EoGuard>
        )
    }

    if (!concert) {
        return (
            <EoGuard>
                <div className="min-h-screen bg-[#131313] flex text-white">
                    <OrganizerSidebar />
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <p className="text-gray-400">Data konser tidak ditemukan.</p>
                        <Link href="/organizer/events" className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-black font-semibold">Kembali ke Events</Link>
                    </div>
                </div>
            </EoGuard>
        )
    }

    return (
        <EoGuard>
            <div className="min-h-screen bg-[#131313] flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <Link href="/organizer/events" className="text-gray-400 hover:text-white">←</Link>
                                        <h1 className="text-2xl sm:text-3xl font-bold">Edit Event</h1>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">Update your concert information</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href="/organizer/events" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm border border-[#333]">Cancel</Link>
                                    <button type="submit" disabled={saving} className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black disabled:opacity-50">
                                        {saving ? "Updating..." : "Update Event"}
                                    </button>
                                </div>
                            </div>

                            {formError && <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4 mb-5 text-sm">{formError}</div>}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333] space-y-4">
                                        <h2 className="text-lg font-semibold">Basic Information</h2>
                                        {[
                                            ["Event Name", "title", "text"],
                                            ["Venue", "venue", "text"],
                                            ["Location / Address", "location", "text"]
                                        ].map(([label, name, type]) => (
                                            <div key={name}>
                                                <label className="block text-sm text-gray-400 mb-1.5">{label} *</label>
                                                <input type={type} name={name} value={form[name]} onChange={handleChange} required className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC]" />
                                            </div>
                                        ))}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1.5">Date *</label>
                                                <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1.5">Time *</label>
                                                <input type="time" name="time" value={form.time} onChange={handleChange} required className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] outline-none" />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">Description</h2>
                                        <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] outline-none resize-none" placeholder="Describe your concert..." />
                                    </section>

                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">Event Poster</h2>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="w-32 h-32 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center overflow-hidden">
                                                {form.banner_url ? <img src={form.banner_url} alt="Event poster" className="w-full h-full object-cover" /> : <span className="text-gray-500 text-xs">No Poster</span>}
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm text-gray-400 mb-1.5">Poster URL</label>
                                                <input type="url" name="banner_url" value={form.banner_url} onChange={handleChange} className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] outline-none" placeholder="https://example.com/poster.jpg" />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">Venue Location</h2>
                                        <label className="block text-sm text-gray-400 mb-1.5">Google Maps URL</label>
                                        <input type="url" value={mapUrl} onChange={e => setMapUrl(e.target.value)} className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] outline-none" placeholder="https://www.google.com/maps/embed?..." />
                                        {mapUrl && <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex mt-3 text-sm text-[#FBADCC] hover:underline">Buka Lokasi di Google Maps →</a>}
                                    </section>

                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-2">Stage Layout</h2>
                                        <p className="text-sm text-gray-400 mb-4">Upload atau ubah gambar denah panggung konser.</p>
                                        {layoutPreview ? (
                                            <div className="space-y-3">
                                                <div className="w-full rounded-xl overflow-hidden border border-[#383838] bg-[#1a1a1a]">
                                                    <img src={layoutPreview} alt="Stage Layout" className="w-full max-h-[400px] object-contain" />
                                                </div>
                                                <button type="button" onClick={removeLayoutImage} className="text-sm text-red-400 hover:text-red-300">Hapus gambar</button>
                                            </div>
                                        ) : (
                                            <div className="min-h-[180px] rounded-xl border border-dashed border-[#555] bg-[#1a1a1a] flex items-center justify-center text-gray-500 text-sm">Belum ada gambar Stage Layout</div>
                                        )}
                                        <label className="inline-flex mt-4 px-4 py-2.5 bg-[#FBADCC] text-black rounded-xl text-sm font-semibold cursor-pointer">
                                            {layoutPreview ? "Ganti Gambar" : "Upload Gambar"}
                                            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleLayoutChange} className="hidden" />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">Format JPG, PNG, atau WEBP. Maksimal 5 MB.</p>
                                    </section>

                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <div className="flex items-center justify-between mb-5">
                                            <div>
                                                <h2 className="text-lg font-semibold">Ticket Tiers</h2>
                                                <p className="text-sm text-gray-400 mt-1">Kelola kategori, harga, kuota, dan periode penjualan tiket.</p>
                                            </div>
                                            <button type="button" onClick={addTier} className="px-4 py-2 bg-[#FBADCC] text-black rounded-xl text-sm font-semibold">+ Add Ticket</button>
                                        </div>

                                        <div className="space-y-5">
                                            {tiers.map((tier, index) => {
                                                if (tier.deleted) return null

                                                return (
                                                    <div key={tier.id || `new-${index}`} className={`bg-[#1a1a1a] rounded-xl p-5 border ${tier.error ? "border-red-500/50" : "border-[#383838]"}`}>
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div>
                                                                <h3 className="font-semibold text-[#FBADCC]">Ticket {index + 1}</h3>
                                                                {tier.id && <p className="text-xs text-gray-500 mt-1">Existing Ticket</p>}
                                                            </div>
                                                            <button type="button" onClick={() => removeTier(index)} className="text-red-400 text-sm">Remove</button>
                                                        </div>

                                                        {tier.error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-3 mb-4 text-xs">{tier.error}</div>}

                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm text-gray-400 mb-1.5">Ticket Name</label>
                                                                <input name="name" value={tier.name} onChange={e => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] outline-none" placeholder="VIP, Regular, Festival" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-sm text-gray-400 mb-1.5">Ticket Price (Rp)</label>
                                                                    <input type="number" name="price" min="1" value={tier.price} onChange={e => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] outline-none" />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm text-gray-400 mb-1.5">Quota</label>
                                                                    <input type="number" name="quota" min={tier.sold} value={tier.quota} onChange={e => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] outline-none" />
                                                                    <p className="text-xs text-gray-500 mt-1">Terjual: {tier.sold}</p>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-sm text-gray-400 mb-1.5">Sale Start</label>
                                                                    <input type="datetime-local" name="sale_start" value={tier.sale_start} onChange={e => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] outline-none" />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm text-gray-400 mb-1.5">Sale End</label>
                                                                    <input type="datetime-local" name="sale_end" value={tier.sale_end} onChange={e => handleTierChange(index, e)} className="w-full px-4 py-3 bg-[#272727] rounded-xl border border-[#383838] outline-none" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {!activeTierCount(tiers) && <p className="text-sm text-gray-500 text-center py-6">Belum ada kategori tiket. Klik Add Ticket untuk menambahkan.</p>}
                                    </section>
                                </div>

                                <div className="space-y-6">
                                    <section className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                        <h2 className="text-lg font-semibold mb-4">Event Status</h2>
                                        <div className="px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] flex items-center justify-between">
                                            <div>
                                                <p className="font-medium capitalize">{concert.status}</p>
                                                <p className="text-xs text-gray-400">Current event status</p>
                                            </div>
                                            <div className={`w-3 h-3 rounded-full ${concert.status === "published" ? "bg-green-400" : concert.status === "cancelled" ? "bg-red-400" : "bg-[#FBADCC]"}`} />
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </EoGuard>
    )
}

function activeTierCount(tiers) {
    return tiers.filter(t => !t.deleted).length
}
