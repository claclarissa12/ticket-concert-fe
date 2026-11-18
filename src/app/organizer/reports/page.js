
"use client";

import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Wallet, Ticket, Users, CalendarDays, Loader2, AlertCircle } from "lucide-react";
import OrganizerSidebar from "@/components/EO/sidebarEO";
import EoGuard from "@/components/EO/guardEO";
import { organizerApi } from "../../../../lib/api";

const tooltipStyle = {
    backgroundColor: "#1a1a1d",
    border: "1px solid #FBADCC",
    borderRadius: 10,
    color: "#fff"
};

const formatRupiah = (value) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
}).format(Number(value || 0));

const getResponseData = (response) => response?.data?.data ?? response?.data ?? response;

export default function ReportsPage() {
    const [concerts, setConcerts] = useState([]);
    const [selectedConcertId, setSelectedConcertId] = useState("");
    const [report, setReport] = useState(null);
    const [loadingConcerts, setLoadingConcerts] = useState(true);
    const [loadingReport, setLoadingReport] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const response = await organizerApi.getMyConcert();
                const result = getResponseData(response);
                const items = Array.isArray(result) ? result : result?.rows || result?.items || result?.data || [];

                setConcerts(items);
                if (items.length > 0) setSelectedConcertId(String(items[0].id));
            } catch (error) {
                setErrorMessage(error.message || "Gagal mengambil daftar konser");
            } finally {
                setLoadingConcerts(false);
            }
        };

        fetchConcerts();
    }, []);

    useEffect(() => {
        if (!selectedConcertId) {
            setReport(null);
            return;
        }

        const fetchReport = async () => {
            try {
                setLoadingReport(true);
                setErrorMessage("");

                const response = await organizerApi.getConcertReport(selectedConcertId);
                setReport(getResponseData(response));
            } catch (error) {
                setReport(null);
                setErrorMessage(error.message || "Gagal mengambil laporan konser");
            } finally {
                setLoadingReport(false);
            }
        };

        fetchReport();
    }, [selectedConcertId]);

    const ticketsIssued = Number(report?.tickets_issued || 0);
    const checkedIn = Number(report?.checked_in || 0);
    const notCheckedIn = Math.max(0, ticketsIssued - checkedIn);
    const attendancePercentage = ticketsIssued ? ((checkedIn / ticketsIssued) * 100).toFixed(1) : "0.0";
    const availableTickets = (report?.tiers || []).reduce((total, tier) => total + Number(tier.available || 0), 0);

    const ticketData = [
        { name: "Terbit", value: ticketsIssued },
        { name: "Tersedia", value: availableTickets }
    ];

    const attendanceData = [
        { name: "Hadir", value: checkedIn },
        { name: "Belum Hadir", value: notCheckedIn }
    ];

    const tierSales = (report?.tiers || []).map((tier) => ({
        name: tier.name,
        sold: Number(tier.tickets_issued || 0)
    }));

    const stats = [
        { title: "Total Pendapatan", value: formatRupiah(report?.revenue), desc: "Dari transaksi berhasil", icon: Wallet },
        { title: "Tiket Terbit", value: ticketsIssued.toLocaleString("id-ID"), desc: "Tiket dari pesanan berhasil dibayar", icon: Ticket },
        { title: "Tingkat Kehadiran", value: `${attendancePercentage}%`, desc: `${checkedIn} dari ${ticketsIssued} tiket`, icon: Users },
        { title: "Pesanan Dibayar", value: Number(report?.paid_orders || 0).toLocaleString("id-ID"), desc: "Total transaksi berhasil", icon: CalendarDays }
    ];

    return (
        <EoGuard>
            <div className="min-h-screen flex bg-[#131313] text-white">
                <OrganizerSidebar />
                <div className="flex-1 min-w-0 overflow-x-hidden">
                    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Reports</h1>
                                <p className="text-gray-400 text-sm mt-1">Ringkasan performa penjualan dan acara kamu.</p>
                            </div>
                            <select
                                value={selectedConcertId}
                                onChange={(e) => setSelectedConcertId(e.target.value)}
                                disabled={loadingConcerts || concerts.length === 0}
                                className="bg-[#1a1a1d] border border-[#FBADCC]/30 rounded-lg px-4 py-3 text-sm outline-none disabled:opacity-50"
                            >
                                {loadingConcerts ? (
                                    <option value="">Memuat konser...</option>
                                ) : concerts.length === 0 ? (
                                    <option value="">Belum ada konser</option>
                                ) : (
                                    concerts.map((concert) => (
                                        <option key={concert.id} value={String(concert.id)}>{concert.title}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        {errorMessage && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4 mb-6 text-sm">
                                <AlertCircle size={19} />
                                {errorMessage}
                            </div>
                        )}

                        {loadingReport || loadingConcerts ? (
                            <div className="flex flex-col items-center justify-center min-h-[350px] text-gray-400 gap-3">
                                <Loader2 size={30} className="animate-spin text-[#FBADCC]" />
                                <p className="text-sm">Memuat laporan konser...</p>
                            </div>
                        ) : !concerts.length ? (
                            <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-10 text-center">
                                <Ticket size={35} className="mx-auto text-gray-500 mb-3" />
                                <h2 className="font-semibold">Belum Ada Konser</h2>
                                <p className="text-gray-500 text-sm mt-2">Buat konser terlebih dahulu untuk melihat laporan.</p>
                            </div>
                        ) : report ? (
                            <>
                                <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5 mb-6">
                                    <p className="text-gray-500 text-xs mb-1">Laporan Konser</p>
                                    <h2 className="text-lg font-semibold">{report.concert?.title}</h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {report.concert?.date ? new Date(report.concert.date).toLocaleDateString("id-ID", {
                                            day: "numeric", month: "long", year: "numeric"
                                        }) : "-"}
                                    </p>
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
                                            <h2 className="text-xl xl:text-2xl font-bold mb-2 break-words">{value}</h2>
                                            <p className="text-xs text-gray-500">{desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
                                    <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5">
                                        <h2 className="font-semibold text-lg">Perbandingan Tiket</h2>
                                        <p className="text-gray-500 text-sm mt-1 mb-4">Jumlah tiket terbit dan tersisa</p>
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
                                                    <p className="text-gray-400 text-sm mb-1">Tiket Terbit</p>
                                                    <h3 className="text-2xl font-bold">{ticketsIssued.toLocaleString("id-ID")}</h3>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">Tiket Tersedia</p>
                                                    <h3 className="text-2xl font-bold">{availableTickets.toLocaleString("id-ID")}</h3>
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
                                                    <span className="text-3xl font-bold text-[#FBADCC]">{attendancePercentage}%</span>
                                                    <span className="text-xs text-gray-500">Kehadiran</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-10 mt-2">
                                                <div className="text-center">
                                                    <p className="text-sm text-gray-400">Hadir</p>
                                                    <p className="font-bold">{checkedIn}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm text-gray-400">Belum Hadir</p>
                                                    <p className="font-bold">{notCheckedIn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5 mb-5">
                                    <h2 className="font-semibold text-lg">Penjualan Tiket per Kategori</h2>
                                    <p className="text-gray-500 text-sm mt-1 mb-5">Jumlah tiket terbit pada setiap kategori</p>
                                    <div className="w-full h-[280px]">
                                        {tierSales.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={tierSales} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#33333a" vertical={false} />
                                                    <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} axisLine={false} tickLine={false} />
                                                    <YAxis tick={{ fill: "#aaa", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#FBADCC", opacity: 0.06 }} />
                                                    <Bar dataKey="sold" name="Tiket Terbit" fill="#FBADCC" radius={[7, 7, 0, 0]} barSize={42} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">Belum ada data penjualan tiket.</div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-[#1a1a1d] border border-white/5 rounded-2xl p-5">
                                    <h2 className="font-semibold text-lg">Rincian Kategori Tiket</h2>
                                    <p className="text-gray-500 text-sm mt-1 mb-5">Rincian penjualan dan pendapatan setiap kategori</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[700px] text-sm text-left">
                                            <thead className="text-gray-400 border-b border-white/10">
                                                <tr>
                                                    <th className="py-3 pr-4">Kategori</th>
                                                    <th className="py-3 pr-4">Harga</th>
                                                    <th className="py-3 pr-4">Kuota</th>
                                                    <th className="py-3 pr-4">Terbit</th>
                                                    <th className="py-3 pr-4">Check-in</th>
                                                    <th className="py-3 pr-4">Tersedia</th>
                                                    <th className="py-3">Pendapatan</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {(report.tiers || []).map((tier) => (
                                                    <tr key={tier.tier_id} className="text-gray-300">
                                                        <td className="py-4 pr-4 font-medium text-white">{tier.name}</td>
                                                        <td className="py-4 pr-4">{formatRupiah(tier.price)}</td>
                                                        <td className="py-4 pr-4">{tier.quota}</td>
                                                        <td className="py-4 pr-4">{tier.tickets_issued}</td>
                                                        <td className="py-4 pr-4">{tier.checked_in}</td>
                                                        <td className="py-4 pr-4">{tier.available}</td>
                                                        <td className="py-4 text-[#FBADCC] font-medium">{formatRupiah(tier.revenue)}</td>
                                                    </tr>
                                                ))}
                                                {(!report.tiers || report.tiers.length === 0) && (
                                                    <tr>
                                                        <td colSpan={7} className="py-8 text-center text-gray-500">Belum ada data kategori tiket.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </main>
                </div>
            </div>
        </EoGuard>
    );
}
