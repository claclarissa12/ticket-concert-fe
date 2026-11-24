"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { adminApi, authApi } from "../../../../../lib/api"

const ROLES = [
    { id: "user", label: "User", desc: "Akun pembeli tiket" },
    { id: "event_organizer", label: "Event Organizer", desc: "Langsung aktif, bisa buat konser" },
]

const inputClass =
    "w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm"

export default function CreateAccount() {
    const router = useRouter()
    const [role, setRole] = useState("user")
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" })
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.name.trim() || !form.email.trim() || !form.password) {
            return setError("Nama, email, dan password wajib diisi.")
        }
        if (form.password.length < 6) {
            return setError("Password minimal 6 karakter.")
        }
        if (form.password !== form.confirm) {
            return setError("Password dan konfirmasi tidak cocok.")
        }

        const body = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || undefined,
            password: form.password,
        }

        setLoading(true)
        try {
            // EO -> POST /admin/eo (butuh token superadmin)
            // User -> POST /auth/register (otomatis role "user")
            if (role === "event_organizer") await adminApi.createEO(body)
            else await authApi.register(body)

            router.push("/admin/users")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex items-center gap-3">
                            <Link href="/admin/users" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tambah Akun</h1>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 mb-8 ml-8">
                            Buat akun User atau Event Organizer baru
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Tipe Akun</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {ROLES.map((r) => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            onClick={() => setRole(r.id)}
                                            className={`text-left px-4 py-3 rounded-xl border transition-all ${role === r.id
                                                ? "bg-[#FBADCC]/10 border-[#FBADCC]"
                                                : "bg-[#1a1a1a] border-[#333] hover:border-[#555]"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className={`font-medium ${role === r.id ? "text-[#FBADCC]" : "text-white"}`}>
                                                    {r.label}
                                                </p>
                                                {role === r.id && <div className="w-3 h-3 rounded-full bg-[#FBADCC]" />}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Informasi Akun</h2>

                                {error && (
                                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 mb-4">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">
                                            {role === "event_organizer" ? "Nama Organizer" : "Nama Lengkap"}
                                        </label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder={role === "event_organizer" ? "Nusantara Live" : "Nama lengkap"}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Nomor HP (opsional)</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="08xxxxxxxxxx"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Password</label>
                                            <input
                                                type={showPass ? "text" : "password"}
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Min 6 karakter"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Ulangi Password</label>
                                            <input
                                                type={showPass ? "text" : "password"}
                                                name="confirm"
                                                value={form.confirm}
                                                onChange={handleChange}
                                                placeholder="Ulangi password"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer w-fit">
                                        <input
                                            type="checkbox"
                                            checked={showPass}
                                            onChange={(e) => setShowPass(e.target.checked)}
                                            className="accent-pink-500"
                                        />
                                        Tampilkan password
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href="/admin/users"
                                    className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Menyimpan..." : `Buat Akun ${role === "event_organizer" ? "EO" : "User"}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}