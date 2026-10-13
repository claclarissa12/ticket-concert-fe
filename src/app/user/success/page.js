"use client";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-24 h-24 bg-[#FBADCC]/10 border-2 border-[#FBADCC] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#FBADCC" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold mb-3">Pesanan Berhasil!</h1>

                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        Terima kasih! Pesanan tiket konser Anda telah berhasil kami proses.
                    </p>

                    <div className="bg-[#272727] border border-[#333] rounded-xl p-5 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#FBADCC" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-semibold text-[#FBADCC]">Cek Email Anda</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Tiket konser Anda akan dikirim ke alamat email yang telah didaftarkan.
                            Silakan periksa kotak masuk atau folder spam Anda.
                        </p>
                    </div>

                    <div className="bg-[#272727] border border-[#333] rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">ID Pesanan</span>
                            <span className="text-xs text-[#FBADCC] font-mono">#TIX-20261009-8842</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Email</span>
                            <span className="text-xs text-white">email@gmail.com</span>
                        </div>
                    </div>

                    <button className="w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-lg transition-colors text-sm mb-3">
                        Buka Email
                    </button>
                    <a href="/user/home">
                        <button className="w-full text-gray-400 hover:text-white text-sm py-2 transition-colors">
                            Kembali ke Beranda
                        </button>
                    </a>

                    <p className="text-[11px] text-gray-500 mt-6 leading-relaxed">
                        Tidak menerima email? Periksa folder spam atau hubungi customer service kami.
                    </p>
                </div>
            </div>
        </div>
    );
}