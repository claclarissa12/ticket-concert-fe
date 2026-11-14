"use client"

import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function OrganizerProfile() {
    return (
        <EoGuard>

            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Profil Organizer</h1>
                                <p className="text-gray-400 text-sm mt-1">Kelola informasi profil penyelenggara acara Anda</p>
                            </div>
                            <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                Simpan Perubahan
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Informasi Perusahaan</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Nama Legal Perusahaan (PT/CV)</label>
                                            <input
                                                type="text"
                                                defaultValue="PT Event Kreatif Nusantara"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Nama Brand / Promotor</label>
                                            <input
                                                type="text"
                                                defaultValue="Nusantara Live"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Email Resmi</label>
                                            <input
                                                type="email"
                                                defaultValue="hello@nusantaralive.com"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Nomor Telepon Kantor</label>
                                            <input
                                                type="tel"
                                                defaultValue="+62 21 555 1234"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">NPWP Perusahaan</label>
                                            <input
                                                type="text"
                                                defaultValue="01.234.567.8-901.000"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Alamat Kantor</label>
                                            <input
                                                type="text"
                                                defaultValue="Gedung Creative Space Lt. 5, Jl. Sudirman Kav. 52-53, Jakarta Selatan"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Tentang Penyelenggara</h2>
                                    <textarea
                                        rows={5}
                                        placeholder="Jelaskan visi, misi, dan pengalaman perusahaan Anda..."
                                        className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors resize-none text-sm"
                                        defaultValue="Nusantara Live adalah promotor musik terkemuka di Indonesia yang berfokus pada penyelenggaraan konser skala besar, festival musik, dan tur artis internasional. Berdiri sejak tahun 2018, kami telah sukses menggelar lebih dari 45 acara dengan total penonton melampaui 500.000 orang di berbagai kota besar di Indonesia."
                                    />
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Media Sosial Resmi</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Instagram</label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-sm pl-2">instagram.com/</span>
                                                <input
                                                    type="text"
                                                    defaultValue="nusantaralive.id"
                                                    className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Twitter / X</label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-sm pl-2">x.com/</span>
                                                <input
                                                    type="text"
                                                    defaultValue="nusantaralive"
                                                    className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Website Resmi</label>
                                            <input
                                                type="url"
                                                defaultValue="https://nusantaralive.com"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] text-center">
                                    <div className="relative inline-block">
                                        <div className="w-32 h-32 rounded-full bg-[#FBADCC] flex items-center justify-center text-5xl font-bold text-black mx-auto">
                                            NL
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#E21D8F] flex items-center justify-center hover:bg-[#FBADCC] transition-colors border-2 border-[#131313] text-white hover:text-black">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-semibold mt-4">Nusantara Live</h3>
                                    <p className="text-sm text-gray-400">hello@nusantaralive.com</p>
                                    <div className="mt-3 flex justify-center gap-2">
                                        <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Terverifikasi</span>
                                        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">Partner</span>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Statistik Akun</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Total Event Digelar</span>
                                            <span className="font-bold">45</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Total Pendapatan</span>
                                            <span className="font-bold text-[#FBADCC]">Rp 12.5M</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Total Penonton</span>
                                            <span className="font-bold">500K+</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                            <span className="text-sm text-gray-400">Bergabung Sejak</span>
                                            <span className="font-bold">2018</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                    <h2 className="text-lg font-semibold mb-4">Pengaturan Akun</h2>
                                    <div className="space-y-3">
                                        <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                            Ubah Kata Sandi
                                        </button>
                                        <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Keamanan & Verifikasi (2FA)
                                        </button>
                                        <button className="w-full px-4 py-2.5 bg-red-500/10 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Hapus Akun
                                        </button>
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