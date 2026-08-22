export default function Regis() {
    return (
        <div className="flex items-center justify-center p-10">
            <div className="w-full flex max-w-5xl rounded-2xl border border-[#2d2d2d] bg-[#1E1E1E] p-8 shadow shadow-pink-200">
              
                <div>
                    <img
                        src="/image 9.png"
                        alt="Concert"
                        className="h-full w-full px-8 py-8"
                    />
                </div>
                <div className="max-w-md my-auto mx-0">

                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Buat Akun Baru
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Sudah punya akun?
                        <a href="/login" className="ml-1 font-medium text-pink-400 hover:text-pink-300">
                            Masuk
                        </a>
                    </p>

                    <div className="mt-8 space-y-4">

                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            className="w-full rounded-xl border border-[#343434] bg-[#2B2B2B] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-xl border border-[#343434] bg-[#2B2B2B] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-xl border border-[#343434] bg-[#2B2B2B] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                        />

                    </div>

                    <label className="mt-5 flex items-start gap-2">
                        <input type="checkbox" className="mt-1 accent-pink-500" />
                        <p className="text-xs leading-5 text-gray-400">
                            Saya telah membaca dan menyetujui
                            <span className="text-pink-400"> Syarat & Ketentuan </span>
                            serta
                            <span className="text-pink-400"> Kebijakan Privasi</span>.
                        </p>
                    </label>

                    <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#E21D8F] to-[#F551B5] py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/30">
                        Daftar
                    </button>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#3A3A3A]"></div>
                        <p className="text-xs text-gray-500">atau</p>
                        <div className="h-px flex-1 bg-[#3A3A3A]"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <button className="flex items-center justify-center gap-2 rounded-xl border border-[#3A3A3A] bg-[#252525] py-3 text-white transition-all duration-300 hover:border-pink-500 hover:bg-[#2F2F2F]">
                            <img src="/goggle.png" alt="Google" className="h-5 " />
                            <span>Google</span>
                        </button>

                        <button className="flex items-center justify-center gap-2 rounded-xl border border-[#3A3A3A] bg-[#252525] py-3 text-white transition-all duration-300 hover:border-pink-500 hover:bg-[#2F2F2F]">
                            <img src="/apple.png" alt="Apple" className="h-5 " />
                            <span>Apple</span>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}