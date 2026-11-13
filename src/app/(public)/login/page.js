'use client'

import { IconAlertCircle, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "../../../../lib/api.js";

export default function Login() {
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);


    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const redirectByRole = (role) => {
        if (role === 'superadmin') router.push('/admin');
        else if (role === 'event_organizer') router.push('/organizer');
        else router.push('/user');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await authApi.login(form);
            const {token, role, name} = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({role, name}))
            redirectByRole(role);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center p-10">
            <div className="w-full flex max-w-5xl rounded-2xl border border-[#2d2d2d] bg-[#1E1E1E] p-8 shadow shadow-pink-200">
              
                <div>
                    <img
                        src="/image 9.png"
                        alt="Concert"
                        className="h-15 0 w-full px-8 py-8"
                    />
                </div>
                <div className="max-w-xl my-auto mx-0">

                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Masuk Akun
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Belum punya akun?
                        <a href="/regis" className="ml-1 font-medium text-pink-400 hover:text-pink-300">
                            Daftar
                        </a>
                    </p>

                    {error && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 mt-4 mb-4">
                            <IconAlertCircle size={18} className="shrink-0 text-red-400" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#ffffff] mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            placeholder="youremail@example.com"
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#343434] bg-[#2B2B2B] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                            required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#ffffff] mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    placeholder="Password anda"
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#343434] bg-[#2B2B2B] px-4 py-3 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-[#ABABAB] hover:text-white transition-colors"
                                >
                                    {showPass ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button 
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#E21D8F] to-[#F551B5] py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/30">
                            {loading ? (
                                <><i className="ti ti-loader-2 animate-spin text-base" /> Memproses...</>
                            ) : (
                                <><i className="ti ti-login text-base" /> Masuk</>
                            )}
                        </button>
                    </form>
                    
                    <label className="mt-5 flex items-start gap-2">
                        <input type="checkbox" className="mt-1 accent-pink-500 cursor-pointer" required />
                        <p className="text-xs leading-5 text-gray-400">
                            Saya telah membaca dan menyetujui
                            <a className="text-pink-400 cursor-pointer"> Syarat & Ketentuan </a>
                            serta
                            <a className="text-pink-400 cursor-pointer"> Kebijakan Privasi</a>.
                        </p>
                    </label>


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