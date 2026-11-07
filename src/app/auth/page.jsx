"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 font-sans selection:bg-pink-500 selection:text-white"
            style={{
                backgroundColor: '#0f0f11',
                backgroundImage: `
                    radial-gradient(circle at 0% 0%, rgba(225, 29, 143, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.12) 0%, transparent 40%)
                `,
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="w-full max-w-md bg-[#1a1a1d] border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10">

                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white inline-block mb-2">
                        Ticket<span className="text-[#E21D8F]">.COM</span>
                    </Link>
                    <h1 className="text-xl font-semibold text-white mt-4">
                        {isLogin ? "Selamat Datang Kembali" : "Buat Akun Baru"}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        {isLogin ? "Masuk untuk melanjutkan pembelian tiket." : "Daftar untuk mendapatkan akses presale."}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                        <div>
                            <label className="text-sm text-gray-400 block mb-1.5">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    className="w-full pl-11 pr-4 py-3 bg-[#222225] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm text-white placeholder-gray-500"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-sm text-gray-400 block mb-1.5">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                placeholder="nama@email.com"
                                className="w-full pl-11 pr-4 py-3 bg-[#222225] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm text-white placeholder-gray-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-1.5">Kata Sandi</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-11 py-3 bg-[#222225] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm text-white placeholder-gray-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex justify-end">
                            <a href="#" className="text-xs text-[#FBADCC] hover:underline">
                                Lupa Kata Sandi?
                            </a>
                        </div>
                    )}

                    <a href="/user/home">
                        <button className="w-full py-3.5 bg-[#FBADCC] hover:bg-[#f472b6] text-black font-bold rounded-xl transition-colors mt-2">
                            Masuk
                        </button>
                    </a>

                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <span className="text-xs text-gray-500 font-medium">Atau</span>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <button className="w-full py-3 bg-[#222225] hover:bg-[#2a2a2d] border border-[#333] rounded-xl flex items-center justify-center gap-3 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-sm text-white font-medium">Lanjutkan dengan Google</span>
                </button>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-400">
                        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}

                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[#FBADCC] font-semibold hover:underline"
                        >
                            {isLogin ? "Daftar di sini" : "Masuk di sini"}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}