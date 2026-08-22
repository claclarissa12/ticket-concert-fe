"use client"

import { useState } from "react"

export default function Pembayaran() {
    const [paymentMethod, setPaymentMethod] = useState("credit-card")

    return (
        <div className="min-h-screen bg-[#111111] px-6 py-5 text-white">
            <div className="mx-auto max-w-6xl">
                <button className="mb-6 text-sm text-gray-300 hover:text-white">
                    ← Kembali
                </button>

                <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-5">
                        <div className="rounded-lg bg-[#242424] p-5">
                            <h2 className="mb-5 text-sm font-semibold">Data diri pengunjung</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-[11px] text-gray-300">
                                        Nama
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nama pengunjung"
                                        className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500 focus:border-pink-400"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[11px] text-gray-300">
                                        Alamat Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="nama@gmail.com"
                                        className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500 focus:border-pink-400"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[11px] text-gray-300">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500 focus:border-pink-400"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[11px] text-gray-300">
                                        Nomor Identitas (KTP)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="327xxxxxxxxxxxx"
                                        className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500 focus:border-pink-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-[#242424] p-5">
                            <h2 className="mb-4 text-sm font-semibold">Metode Pembayaran</h2>

                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => setPaymentMethod("credit-card")}
                                    className={`flex h-16 flex-col items-center gap-2 justify-center rounded border text-[10px] transition ${paymentMethod === "credit-card"
                                        ? "border-pink-400 bg-[#2b2027] text-pink-300"
                                        : "border-[#555] text-gray-300 hover:border-gray-300"
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 18V6h16v12z"></path><path d="M6 14h5v2H6zm0-6h5v3H6zm7 6h5v2h-5z"></path>
                                    </svg>
                                    Kartu Kredit
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("bank-transfer")}
                                    className={`flex h-16 gap-2 flex-col items-center justify-center rounded border text-[10px] transition ${paymentMethod === "bank-transfer"
                                        ? "border-pink-400 bg-[#2b2027] text-pink-300"
                                        : "border-[#555] text-gray-300 hover:border-gray-300"
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M16 16H2v2h14v4l6-5-6-5zM8 1 2 6l6 5V7h14V5H8z"></path>
                                    </svg>
                                    Transfer Bank
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("qris")}
                                    className={`flex h-16 flex-col gap-2 items-center justify-center rounded border text-[10px] transition ${paymentMethod === "qris"
                                        ? "border-pink-400 bg-[#2b2027] text-pink-300"
                                        : "border-[#555] text-gray-300 hover:border-gray-300"
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M9 5V3H3v6h2V5zm12 4V3h-6v2h4v4zm-2 10h-4v2h6v-6h-2zM5 15H3v6h6v-2H5zm-3-4h20v2H2z"></path>
                                    </svg>
                                    QRIS
                                </button>
                            </div>

                            {paymentMethod === "credit-card" && (
                                <div className="mt-5 space-y-4">
                                    <div>
                                        <label className="mb-1.5 block text-[11px] text-gray-300">
                                            Nomor Kartu Kredit
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs outline-none placeholder:text-gray-500 focus:border-pink-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-[11px] text-gray-300">
                                            Nama Pemegang Kartu
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nama lengkap"
                                            className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs outline-none placeholder:text-gray-500 focus:border-pink-400"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-1">
                                            <label className="mb-1.5 block text-[11px] text-gray-300">
                                                Bulan
                                            </label>
                                            <select className="w-full rounded border border-[#454545] bg-[#242424] px-3 py-2 text-xs outline-none">
                                                <option>Bulan</option>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i}>{String(i + 1).padStart(2, "0")}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-[11px] text-gray-300">
                                                Tahun
                                            </label>
                                            <select className="w-full rounded border border-[#454545] bg-[#242424] px-3 py-2 text-xs outline-none">
                                                <option>Tahun</option>
                                                <option>2026</option>
                                                <option>2027</option>
                                                <option>2028</option>
                                                <option>2029</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-[11px] text-gray-300">
                                                CVV
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="CVV"
                                                maxLength={3}
                                                className="w-full rounded border border-[#454545] bg-transparent px-3 py-2 text-xs outline-none placeholder:text-gray-500 focus:border-pink-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "bank-transfer" && (
                                <div className="mt-5 space-y-2">
                                    <p className="mb-3 text-[11px] text-gray-400">
                                        Pilih bank yang ingin digunakan
                                    </p>

                                    {["Bank Mandiri", "Bank BCA", "Bank BRI"].map((bank) => (
                                        <button
                                            key={bank}
                                            className="flex w-full items-center justify-between rounded border border-[#555] bg-[#202020] px-3 py-3 text-left text-xs hover:border-pink-400"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="flex h-7 w-12 items-center justify-center rounded bg-white text-[9px] font-bold text-blue-700">
                                                    {bank.replace("Bank ", "")}
                                                </span>
                                                {bank}
                                            </span>
                                            <span className="text-gray-400">○</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {paymentMethod === "qris" && (
                                <div className="mt-5 flex flex-col items-center rounded border border-[#454545] bg-[#202020] p-5">
                                    <p className="mt-4 text-[10px] text-gray-400">
                                        Selesaikan pembayaran dalam 15 menit
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-fit rounded-lg bg-[#242424] p-5">
                        <h2 className="mb-4 text-sm font-semibold">Detail Pesanan</h2>

                        <div className="flex gap-3 border-b border-[#444] pb-4">
                            <div className="h-20 w-16 overflow-hidden rounded bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700">
                                <div className="flex h-full items-center justify-center text-[8px] font-bold">
                                    EVENT
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xs font-semibold">Section Gold</h3>
                                <p className="text-[10px] text-gray-400">Row G</p>
                                <p className="mt-1 text-[9px] text-gray-500">VIP Ticket × 2</p>
                            </div>

                            <p className="text-[10px]">IDR 3.400.000</p>
                        </div>

                        <div className="space-y-2 border-b border-[#444] py-4 text-[10px]">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Subtotal</span>
                                <span>IDR 6.800.000</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-400">Biaya Admin</span>
                                <span>IDR 6.000</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-400">Pajak</span>
                                <span>IDR 66.000</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <span className="text-sm font-semibold">Total</span>
                            <span className="text-sm font-bold text-pink-300">
                                IDR 6.872.000
                            </span>
                        </div>

                        <button className="w-full rounded-full bg-pink-300 py-2.5 text-xs font-semibold text-[#181818] transition hover:bg-pink-400">
                            Pesan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}