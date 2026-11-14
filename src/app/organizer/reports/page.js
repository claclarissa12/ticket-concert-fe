
"use client";

import { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Wallet, Ticket, Users, CalendarDays } from "lucide-react";
import OrganizerSidebar from "@/components/EO/sidebarEO";

const eventSales = [
    { name: "Music Fest", sold: 120 },
    { name: "Summer Vibes", sold: 85 },
    { name: "Indie Night", sold: 65 }
];

const ticketData = [
    { name: "Terjual", value: 270 },
    { name: "Tersisa", value: 130 }
];

const attendanceData = [
    { name: "Hadir", value: 180 },
    { name: "Belum Hadir", value: 90 }
];

const stats = [
    { title: "Total Pendapatan", value: "Rp35.000.000", desc: "Dari transaksi berhasil", icon: Wallet },
    { title: "Tiket Terjual", value: "270", desc: "Dari 400 total kuota", icon: Ticket },
    { title: "Tingkat Kehadiran", value: "66,7%", desc: "180 dari 270 tiket", icon: Users },
    { title: "Total Acara", value: "3", desc: "Acara diselenggarakan", icon: CalendarDays }
];

const tooltipStyle = {
    backgroundColor: "#1a1a1d",
    border: "1px solid #FBADCC",
    borderRadius: 10,
    color: "#fff"
};

export default function ReportsPage() {
    const [period, setPeriod] = useState("Semua");

    return (
        <div className="min-h-screen bg-[#131313] flex text-white">
            <OrganizerSidebar />
            <div className="flex-1 overflow-x-hidden">

                <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Reports</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Ringkasan performa penjualan dan acara kamu.
                            </p>
                        </div>

                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="bg-[#1a1a1d] border border-[#FBADCC]/30 rounded-lg px-4 py-3 text-sm outline-none"
                        >
                            <option value="Semua">Semua Periode</option>
                            <option value="7 Hari Terakhir">7 Hari Terakhir</option>
                            <option value="30 Hari Terakhir">30 Hari Terakhir</option>
                            <option value="Tahun Ini">Tahun Ini</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        {stats.map(({ title, value, desc, icon: Icon }) => (
                            <div key={title} className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-400 text-sm">{title}</p>
                                    <div className="bg-[#FBADCC]/15 p-3 rounded-xl">
                                        <Icon size={21} className="text-[#FBADCC]" />
                                    </div>
                                </div>
                                <h2 className="text-xl xl:text-2xl font-bold mb-2">{value}</h2>
                                <p className="text-xs text-gray-500">{desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
                        <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5">
                            <h2 className="font-semibold text-lg">Perbandingan Tiket</h2>
                            <p className="text-gray-500 text-sm mt-1 mb-4">Jumlah tiket terjual dan tersisa</p>

                            <div className="flex flex-col sm:flex-row items-center gap-5">
                                <div className="w-full sm:w-1/2 h-[210px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={ticketData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={85} paddingAngle={4} stroke="none">
                                                <Cell fill="#FBADCC" />
                                                <Cell fill="#51404a" />
                                            </Pie>
                                            <Tooltip contentStyle={tooltipStyle} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex-1 w-full space-y-5">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Tiket Terjual</p>
                                        <h3 className="text-2xl font-bold">270</h3>
                                        <p className="text-xs text-[#FBADCC]">67,5% dari kuota</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Tiket Tersisa</p>
                                        <h3 className="text-2xl font-bold">130</h3>
                                        <p className="text-xs text-gray-500">32,5% dari kuota</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5">
                            <h2 className="font-semibold text-lg">Tingkat Kehadiran</h2>
                            <p className="text-gray-500 text-sm mt-1">Tiket yang sudah dan belum discan</p>

                            <div className="flex flex-col items-center justify-center">
                                <div className="relative w-48 h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={attendanceData} dataKey="value" innerRadius={65} outerRadius={85} startAngle={90} endAngle={-270} stroke="none">
                                                <Cell fill="#FBADCC" />
                                                <Cell fill="#51404a" />
                                            </Pie>
                                            <Tooltip contentStyle={tooltipStyle} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-bold text-[#FBADCC]">66,7%</span>
                                        <span className="text-xs text-gray-500">Kehadiran</span>
                                    </div>
                                </div>

                                <div className="flex gap-10 mt-2">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400">Hadir</p>
                                        <p className="font-bold">180</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400">Belum Hadir</p>
                                        <p className="font-bold">90</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5">
                        <h2 className="font-semibold text-lg">Penjualan Tiket per Acara</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-5">Jumlah tiket terjual pada setiap acara</p>

                        <div className="w-full h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={eventSales} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#33333a" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: "#aaa", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#FBADCC", opacity: 0.06 }} />
                                    <Bar dataKey="sold" name="Tiket Terjual" fill="#FBADCC" radius={[7, 7, 0, 0]} barSize={42} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    );
}
