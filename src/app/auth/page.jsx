
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        password
                    })
                }
            );

            const data = await res.json();

            if (res.ok) {
                setSuccess('Registrasi berhasil! Silakan login.');

                setName('');
                setEmail('');
                setPhone('');
                setPassword('');

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(data.message || 'Registrasi gagal');
            }
        } catch (err) {
            setError('Terjadi kesalahan: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold text-white">
                        KON<span className="text-[#E21D8F]">SER.</span>
                    </Link>
                    <p className="text-gray-400 text-sm mt-3">
                        Buat akun dan nikmati pengalaman konser favoritmu.
                    </p>
                </div>

                <div className="bg-[#1a1a1d] border border-white/10 rounded-2xl p-7 shadow-xl">

                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-white">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">
                            Lengkapi data berikut untuk membuat akun.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="contoh@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Nomor Telepon
                            </label>
                            <input
                                type="tel"
                                placeholder="08xxxxxxxxxx"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#252529] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#E21D8F] transition"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#E21D8F] hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                        >
                            {isLoading ? 'Memproses...' : 'Create Account'}
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Sudah punya akun?{' '}
                        <Link
                            href="/login"
                            className="text-[#E21D8F] hover:underline font-medium"
                        >
                            Login sekarang
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} KONSER. All rights reserved.
                </p>

            </div>
        </div>
    );
}
