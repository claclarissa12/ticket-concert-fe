"use client";

import BackButton from "@/components/cards/back";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [selectedBank, setSelectedBank] = useState("mandiri");
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const formatRupiah = (value) =>
        new Intl.NumberFormat("id-ID").format(value);

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-4">
            <div className="w-full max-w-full bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden flex flex-col lg:flex-row">
                <div className="flex-1 p-6 border-r border-[#333]">
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
                        <BackButton />
                    </button>

                    <div className="space-y-6">
                        <div className="bg-[#272727] border border-[#333] rounded-xl p-5">
                            <h2 className="text-lg font-semibold mb-4">Data Diri Pengunjung</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1.5">Nama</label>
                                    <input
                                        type="text"
                                        placeholder="Nama panjang"
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1.5">Alamat Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@gmail.com"
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1.5">Nomor Telepon</label>
                                    <input
                                        type="tel"
                                        placeholder="081234567890"
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1.5">Nomor Identitas (KTP)</label>
                                    <input
                                        type="text"
                                        placeholder="3271234567890001"
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#272727] border border-[#333] rounded-xl p-5">
                            <h2 className="text-lg font-semibold mb-4">Metode Pembayaran</h2>
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={() => setPaymentMethod("credit-card")}
                                    className={`flex-1 py-3 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${paymentMethod === "credit-card"
                                        ? "bg-[#FBADCC]/10 border-[#FBADCC] text-[#FBADCC]"
                                        : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-[#555]"
                                        }`}
                                >
                                    <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 18V6h16v12z"></path><path d="M6 14h5v2H6zm0-6h5v3H6zm7 6h5v2h-5z"></path>
                                    </svg></span>
                                    <span className="text-xs font-semibold">Kartu Kredit</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("transfer")}
                                    className={`flex-1 py-3 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${paymentMethod === "transfer"
                                        ? "bg-[#FBADCC]/10 border-[#FBADCC] text-[#FBADCC]"
                                        : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-[#555]"
                                        }`}
                                >
                                    <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M6 22h2V8h4L7 2 2 8h4zM19 2h-2v14h-4l5 6 5-6h-4z"></path>
                                    </svg></span>
                                    <span className="text-xs font-semibold">Transfer Bank</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("qris")}
                                    className={`flex-1 py-3 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${paymentMethod === "qris"
                                        ? "bg-[#FBADCC]/10 border-[#FBADCC] text-[#FBADCC]"
                                        : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-[#555]"
                                        }`}
                                >
                                    <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M4 4h4V2H4c-1.1 0-2 .9-2 2v4h2zm0 12H2v4c0 1.1.9 2 2 2h4v-2H4zm16 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2zm0-18h-4v2h4v4h2V4c0-1.1-.9-2-2-2"></path><path d="M9.5 5h-3C5.67 5 5 5.67 5 6.5v3c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5M9 9H7V7h2zm.5 4h-3c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5M9 17H7v-2h2zm5.5-6h3c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-3c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5m.5-4h2v2h-2zm-2 6h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm0-4h2v2h-2z"></path>
                                    </svg></span>
                                    <span className="text-xs font-semibold">QRIS</span>
                                </button>
                            </div>

                            {paymentMethod === "credit-card" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1.5">Nama pada Kartu</label>
                                        <input
                                            type="text"
                                            placeholder="Nama di kartu"
                                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1.5">Nomor Kartu</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1.5">Bulan</label>
                                            <select className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white">
                                                <option>01</option>
                                                <option>02</option>
                                                <option>03</option>
                                                <option>04</option>
                                                <option>05</option>
                                                <option>06</option>
                                                <option>07</option>
                                                <option>08</option>
                                                <option>09</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1.5">Tahun</label>
                                            <select className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white">
                                                <option>2024</option>
                                                <option>2025</option>
                                                <option>2026</option>
                                                <option>2027</option>
                                                <option>2028</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1.5">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50 text-white placeholder-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "transfer" && (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setSelectedBank("mandiri")}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${selectedBank === "mandiri"
                                            ? "bg-[#FBADCC]/10 border-[#FBADCC]"
                                            : "bg-[#1a1a1a] border-[#333] hover:border-[#555]"
                                            }`}
                                    >
                                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-[10px] font-bold text-blue-800">
                                            mandiri
                                        </div>
                                        <span className="text-sm flex-1 text-left">Bank Mandiri</span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedBank === "mandiri" ? "border-[#FBADCC]" : "border-gray-500"
                                            }`}>
                                            {selectedBank === "mandiri" && <div className="w-2 h-2 rounded-full bg-[#FBADCC]" />}
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setSelectedBank("bca")}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${selectedBank === "bca"
                                            ? "bg-[#FBADCC]/10 border-[#FBADCC]"
                                            : "bg-[#1a1a1a] border-[#333] hover:border-[#555]"
                                            }`}
                                    >
                                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white">
                                            BCA
                                        </div>
                                        <span className="text-sm flex-1 text-left">Bank BCA</span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedBank === "bca" ? "border-[#FBADCC]" : "border-gray-500"
                                            }`}>
                                            {selectedBank === "bca" && <div className="w-2 h-2 rounded-full bg-[#FBADCC]" />}
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setSelectedBank("bni")}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${selectedBank === "bni"
                                            ? "bg-[#FBADCC]/10 border-[#FBADCC]"
                                            : "bg-[#1a1a1a] border-[#333] hover:border-[#555]"
                                            }`}
                                    >
                                        <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-[10px] font-bold text-white">
                                            BNI
                                        </div>
                                        <span className="text-sm flex-1 text-left">Bank BNI</span>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedBank === "bni" ? "border-[#FBADCC]" : "border-gray-500"
                                            }`}>
                                            {selectedBank === "bni" && <div className="w-2 h-2 rounded-full bg-[#FBADCC]" />}
                                        </div>
                                    </button>
                                </div>
                            )}

                            {paymentMethod === "qris" && (
                                <div className="flex flex-col items-center justify-center py-8 bg-[#1a1a1a] rounded-lg border border-[#333]">
                                    <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-3">
                                        <div className="grid grid-cols-4 gap-1">
                                            {[...Array(16)].map((_, i) => (
                                                <div key={i} className={`w-5 h-5 ${i % 3 === 0 ? "bg-black" : "bg-white"}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400">Scan QRIS untuk membayar</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side - Order Details */}
                <div className="w-full lg:w-[380px] bg-[#1a1a1a] p-6 flex flex-col">
                    <h2 className="text-sm font-semibold mb-4">Detail Pesanan</h2>

                    <div className="bg-[#272727] border border-[#333] rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-14 h-14 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center flex-shrink-0">
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="w-3 h-3 bg-[#FBADCC] rounded-sm" />
                                    <div className="w-3 h-3 bg-[#333] rounded-sm" />
                                    <div className="w-3 h-3 bg-[#333] rounded-sm" />
                                    <div className="w-3 h-3 bg-[#FBADCC] rounded-sm" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold">Section Gold</p>
                                <p className="text-xs text-gray-400">Row G</p>
                                <p className="text-xs text-gray-400">VIP Ticket</p>
                                <p className="text-xs text-gray-400">x2</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>IDR {formatRupiah(6800000)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Biaya Admin</span>
                                <span>IDR {formatRupiah(6000)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Pajak</span>
                                <span>IDR {formatRupiah(66000)}</span>
                            </div>
                            <div className="border-t border-[#333] pt-2 mt-2 flex justify-between font-semibold text-white">
                                <span>Total</span>
                                <span>IDR {formatRupiah(6872000)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#272727] border border-[#FBADCC]/30 rounded-xl p-4 mb-6 text-center">
                        <p className="text-xs text-gray-400 mb-1">Selesaikan pembayaran dalam</p>
                        <p className="text-2xl font-bold text-[#FBADCC] font-mono tracking-wider">
                            {formatTime(timeLeft)}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                            Tiket akan dilepas jika waktu habis
                        </p>
                    </div>
                    <a href="/user/success">
                        <button className="w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-lg transition-colors text-sm">
                            Pesan
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}