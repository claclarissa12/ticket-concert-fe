
"use client"

import { useCallback, useEffect, useState } from "react"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { organizerApi } from "../../../../lib/api"

export default function OrganizerProfile() {
    const [profile, setProfile] = useState({ name: "", email: "", phone: "" })
    const [form, setForm] = useState({ name: "", phone: "" })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            setError("")
            const response = await organizerApi.getProfile()
            const data = response.data
            setProfile(data)
            setForm({
                name: data.name || "",
                phone: data.phone || ""
            })
        } catch (err) {
            console.error("GET PROFILE ERROR:", err)
            setError(err.message || "Gagal mengambil profil")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSaving(true)
            setError("")
            setMessage("")

            const response = await organizerApi.updateProfile(form)
            const data = response.data

            setProfile(data)
            setForm({
                name: data.name || "",
                phone: data.phone || ""
            })
            setMessage("Profil berhasil diperbarui!")
        } catch (err) {
            console.error("UPDATE PROFILE ERROR:", err)
            setError(err.message || "Gagal memperbarui profil")
        } finally {
            setSaving(false)
        }
    }

    const initials = profile.name
        ? profile.name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase()
        : "EO"

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">Profil Organizer</h1>
                            <p className="text-gray-400 text-sm mt-1">Kelola informasi akun penyelenggara acara Anda</p>
                        </div>

                        {error && (
                            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="mb-5 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm">
                                {message}
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-20 text-gray-400">Loading profile...</div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] h-fit text-center">
                                    <div className="w-28 h-28 rounded-full bg-[#FBADCC] flex items-center justify-center text-4xl font-bold text-black mx-auto">
                                        {initials}
                                    </div>
                                    <h2 className="text-xl font-semibold mt-4">{profile.name || "Organizer"}</h2>
                                    <p className="text-sm text-gray-400 mt-1 break-all">{profile.email || "-"}</p>
                                    <div className="mt-4 inline-flex px-3 py-1 rounded-full bg-pink-500/10 text-[#FBADCC] text-xs">
                                        Event Organizer
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-6">Informasi Akun</h2>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Nama Organizer</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                placeholder="Masukkan nama organizer"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={profile.email || ""}
                                                disabled
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] text-gray-500 cursor-not-allowed outline-none"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Email tidak dapat diubah.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Nomor Telepon</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                                placeholder="Masukkan nomor telepon"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-8 pt-5 border-t border-[#333]">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="px-6 py-3 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50 transition-all"
                                        >
                                            {saving ? "Menyimpan..." : "Simpan Perubahan"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </EoGuard>
    )
}
