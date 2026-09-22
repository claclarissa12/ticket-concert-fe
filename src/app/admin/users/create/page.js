"use client";

import { useState } from "react";

export default function AddUserPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "user",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setSuccess("");
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
        if (!form.email.trim()) {
            newErrors.email = "Email wajib diisi";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Format email tidak valid";
        }
        if (!form.phone.trim()) {
            newErrors.phone = "Nomor telepon wajib diisi";
        } else if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) {
            newErrors.phone = "Format telepon tidak valid";
        }
        if (!form.password) {
            newErrors.password = "Password wajib diisi";
        } else if (form.password.length < 8) {
            newErrors.password = "Password minimal 8 karakter";
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Password tidak sama";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSuccess(`User "${form.name}" berhasil ditambahkan.`);
        setForm({
            name: "",
            email: "",
            phone: "",
            role: "user",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Tambah User</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Isi data di bawah untuk menambahkan user baru.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#272727] border border-[#333] rounded-2xl p-6 space-y-5"
                >
                    {success && (
                        <div className="bg-[#1a1a1a] border border-[#FBADCC]/40 text-[#FBADCC] text-sm px-4 py-3 rounded-xl">
                            {success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap"
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="user@example.com"
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Nomor Telepon
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="08123456789"
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50"
                            />
                            {errors.phone && (
                                <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Role</label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50"
                            >
                                <option value="user">User</option>
                                <option value="eo">Event Organizer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Minimal 8 karakter"
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50"
                            />
                            {errors.password && (
                                <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Ulangi password"
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FBADCC]/50"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-400 mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#333]">
                        <button
                            type="button"
                            onClick={() =>
                                setForm({
                                    name: "",
                                    email: "",
                                    phone: "",
                                    role: "user",
                                    password: "",
                                    confirmPassword: "",
                                })
                            }
                            className="px-6 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#333] transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#FBADCC] text-black font-semibold rounded-xl text-sm hover:bg-[#ff94bf] transition-colors"
                        >
                            Tambah User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}