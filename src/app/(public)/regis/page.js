'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { authApi } from "../../../../lib/api.js"
import { IconAlertCircle, IconArrowRight, IconCheck, IconEye, IconEyeOff, IconLoader2, IconUserPlus } from "@tabler/icons-react"



export default function Regis() {

    const router = useRouter()
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        if (!showSuccess) return

        if (countdown === 0) {
            router.push('/login?registered=1')
            return
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [showSuccess, countdown, router])


    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirm) {
            setError('Semua kolom wajib diisi.');
            return;
        }

        if (form.password !== form.confirm) {
            setError('Password dan konfirmasi password tidak cocok.');
            return;
        }
        setLoading(true);
        try {
            await authApi.register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
            setShowSuccess(true)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-4 py-10 overflow-y-auto">
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="w-full max-w-sm rounded-2xl border border-[#343434] bg-[#1E1E1E] p-7 text-center shadow-2xl shadow-pink-500/15">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-pink-500/30 bg-gradient-to-tr from-[#E21D8F]/20 to-[#F551B5]/20 shadow-lg shadow-pink-500/20">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#E21D8F] to-[#F551B5] text-white">
                                <IconCheck size={24} stroke={2.5} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            Pendaftaran Berhasil!
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
                            Akun Anda telah berhasil dibuat. Anda akan dialihkan ke halaman login dalam{' '}
                            <span className="font-semibold text-pink-400">{countdown} detik</span>...
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push('/login?registered=1')}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E21D8F] to-[#F551B5] py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/30"
                        >
                            <span>Masuk Sekarang</span>
                            <IconArrowRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md rounded-2xl border border-[#2d2d2d] bg-[#1E1E1E] p-6 sm:p-8 shadow-lg shadow-pink-500/5">

                <div className="w-full mx-auto">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Buat Akun Baru
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Sudah punya akun?
                        <a href="/login" className="ml-1 font-medium text-pink-400 hover:text-pink-300 transition-colors">
                            Masuk
                        </a>
                    </p>

                    {error && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 mt-4 mb-4">
                            <IconAlertCircle size={18} className="shrink-0 text-red-400" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1.5">Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                placeholder="Nama Lengkap"
                                onChange={handleChange}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#ffffff] mb-1.5">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="youremail@example.com"
                                onChange={handleChange}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#ffffff] mb-1.5">Nomor HP (Opsional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                placeholder="08xxxxxxx"
                                onChange={handleChange}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#ffffff] mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    placeholder="Min 8 karakter"
                                    onChange={handleChange}
                                    className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ABABAB] hover:text-white transition-colors"
                                >
                                    {showPass ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#ffffff] mb-1.5">Ulangi Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="confirm"
                                    value={form.confirm}
                                    placeholder="Min 8 karakter"
                                    onChange={handleChange}
                                    className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                    required
                                />
                            </div>
                        </div>

                        <label className="mt-5 flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="mt-1 accent-pink-500 cursor-pointer" required />
                            <p className="text-xs leading-5 text-gray-400">
                                Saya telah membaca dan menyetujui
                                <a className="text-pink-400 cursor-pointer hover:underline"> Syarat & Ketentuan </a>
                                serta
                                <a className="text-pink-400 cursor-pointer hover:underline"> Kebijakan Privasi</a>.
                            </p>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E21D8F] to-[#F551B5] py-3 font-semibold text-white transition duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? <><IconLoader2 size={18} className="animate-spin" /> Memproses...</>
                                : <><IconUserPlus size={18} /> Daftar Sekarang</>}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#3A3A3A]"></div>
                        <p className="text-xs text-gray-500">atau</p>
                        <div className="h-px flex-1 bg-[#3A3A3A]"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 rounded-xl border border-[#3A3A3A] bg-[#252525] py-2.5 text-white text-sm transition-all duration-300 hover:border-pink-500 hover:bg-[#2F2F2F]">
                            <img src="/goggle.png" alt="Google" className="h-4 sm:h-5" />
                            <span>Google</span>
                        </button>

                        <button className="flex items-center justify-center gap-2 rounded-xl border border-[#3A3A3A] bg-[#252525] py-2.5 text-white text-sm transition-all duration-300 hover:border-pink-500 hover:bg-[#2F2F2F]">
                            <img src="/apple.png" alt="Apple" className="h-4 sm:h-5" />
                            <span>Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}