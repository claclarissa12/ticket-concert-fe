
"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Wallet, Ticket, Users, CalendarDays } from "lucide-react"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import BackButton from "@/components/cards/back"
import { organizerApi } from "../../../../lib/api"
import * as XLSX from "xlsx"
import { Download } from "lucide-react"

export default function ReportsPage() {
    const [concerts, setConcerts] = useState([])
    const [selectedConcertId, setSelectedConcertId] = useState("")
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(true)
    const [concertLoading, setConcertLoading] = useState(true)
    const [error, setError] = useState("")

    const getResponseData = (res) => res?.data?.data ?? res?.data ?? res

    const formatRupiah = (value) => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value || 0))

    const exportExcel = () => {
        if (!report) return

        const wb = XLSX.utils.book_new()

        const summary = [
            ["LAPORAN KONSER"],
            [],
            ["Nama Konser", report.concert?.title || "-"],
            ["Tanggal", report.concert?.date ? new Date(report.concert.date).toLocaleDateString("id-ID") : "-"],
            [],
            ["RINGKASAN PENJUALAN"],
            ["Total Pendapatan", Number(report.revenue || 0)],
            ["Pesanan Lunas", Number(report.paid_orders || 0)],
            ["Tiket Terbit", ticketsIssued],
            ["Tiket Check-in", checkedIn],
            ["Belum Check-in", notCheckedIn],
            ["Tingkat Kehadiran", `${attendance}%`],
        ]

        const details = [
            ["Kategori", "Harga", "Kuota", "Tiket Terbit", "Check-in", "Tersedia", "Dibatalkan", "Pendapatan"],
            ...(report.tiers || []).map(tier => [
                tier.name,
                Number(tier.price || 0),
                Number(tier.quota || 0),
                Number(tier.tickets_issued || 0),
                Number(tier.checked_in || 0),
                Number(tier.available || 0),
                Number(tier.cancelled || 0),
                Number(tier.revenue || 0),
            ])
        ]

        const ws1 = XLSX.utils.aoa_to_sheet(summary)
        const ws2 = XLSX.utils.aoa_to_sheet(details)

        ws1["!cols"] = [{ wch: 25 }, { wch: 25 }]
        ws2["!cols"] = [
            { wch: 20 }, { wch: 18 }, { wch: 12 }, { wch: 15 },
            { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 20 }
        ]

        XLSX.utils.book_append_sheet(wb, ws1, "Ringkasan")
        XLSX.utils.book_append_sheet(wb, ws2, "Detail Kategori")

        const fileName = `Laporan_${(report.concert?.title || "Konser").replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`

        XLSX.writeFile(wb, fileName)
    }

    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const res = await organizerApi.getMyConcert()
                const data = getResponseData(res)
                const items = Array.isArray(data) ? data : data?.items || data?.rows || data?.data || []

                setConcerts(items)
                if (items.length) setSelectedConcertId(String(items[0].id))
            } catch (err) {
                setError(err.message || "Gagal mengambil daftar konser")
            } finally {
                setConcertLoading(false)
            }
        }

        fetchConcerts()
    }, [])

    useEffect(() => {
        if (!selectedConcertId) {
            setReport(null)
            setLoading(false)
            return
        }

        const fetchReport = async () => {
            try {
                setLoading(true)
                setError("")
                const res = await organizerApi.getConcertReport(selectedConcertId)
                setReport(getResponseData(res))
            } catch (err) {
                setReport(null)
                setError(err.message || "Gagal mengambil laporan")
            } finally {
                setLoading(false)
            }
        }

        fetchReport()
    }, [selectedConcertId])

    const ticketsIssued = Number(report?.tickets_issued || 0)
    const checkedIn = Number(report?.checked_in || 0)
    const availableTickets = (report?.tiers || []).reduce(
        (total, tier) => total + Number(tier.available || 0), 0
    )
    const notCheckedIn = Math.max(0, ticketsIssued - checkedIn)
    const attendance = ticketsIssued ? ((checkedIn / ticketsIssued) * 100).toFixed(1) : "0.0"

    const stats = [
        { title: "Total Revenue", value: formatRupiah(report?.revenue), icon: Wallet },
        { title: "Tickets Issued", value: ticketsIssued.toLocaleString("id-ID"), icon: Ticket },
        { title: "Attendance Rate", value: `${attendance}%`, icon: Users },
        { title: "Paid Orders", value: Number(report?.paid_orders || 0).toLocaleString("id-ID"), icon: CalendarDays }
    ]

    const ticketData = [
        { name: "Terbit", value: ticketsIssued },
        { name: "Tersedia", value: availableTickets }
    ]

    const attendanceData = [
        { name: "Hadir", value: checkedIn },
        { name: "Belum Hadir", value: notCheckedIn }
    ]

    const tierSales = (report?.tiers || []).map(tier => ({
        name: tier.name,
        sold: Number(tier.tickets_issued || 0)
    }))

    const tooltipStyle = {
        backgroundColor: "#1a1a1d",
        border: "1px solid #FBADCC",
        borderRadius: 10,
        color: "#fff"
    }

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <BackButton className="mb-5" />

                        <div className=" flex justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reports</h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    Overview of your concert sales and attendance
                                </p>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Select Concert</label>
                                <select
                                    value={selectedConcertId}
                                    onChange={(e) => setSelectedConcertId(e.target.value)}
                                    disabled={concertLoading || !concerts.length}
                                    className="w-full sm:w-96 px-4 py-3 bg-[#272727] rounded-xl border border-[#333] outline-none focus:border-[#FBADCC] text-sm disabled:opacity-50"
                                >
                                    {concertLoading ? (
                                        <option value="">Loading concerts...</option>
                                    ) : !concerts.length ? (
                                        <option value="">No concerts found</option>
                                    ) : (
                                        concerts.map(concert => (
                                            <option key={concert.id} value={String(concert.id)}>
                                                {concert.title}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>



                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {loading || concertLoading ? (
                            <div className="bg-[#272727] rounded-2xl border border-[#333] p-12 text-center text-gray-400">
                                Loading report...
                            </div>
                        ) : !concerts.length ? (
                            <div className="bg-[#272727] rounded-2xl border border-[#333] p-12 text-center text-gray-400">
                                No concerts found
                            </div>
                        ) : report ? (
                            <>
                                <div className="bg-[#272727] rounded-xl p-5 border border-[#333] mb-6">

                                    <div className="bg-[#272727] rounded-xl p-5 border border-[#333] mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div>
                                            <p className="text-sm text-gray-400">Concert Report</p>
                                            <h2 className="text-lg font-semibold mt-1">
                                                {report.concert?.title || "-"}
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {report.concert?.date
                                                    ? new Date(report.concert.date).toLocaleDateString("id-ID", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    })
                                                    : "-"}
                                            </p>
                                        </div>

                                        <button
                                            onClick={exportExcel}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FBADCC] text-[#131313] rounded-xl text-sm font-semibold hover:bg-[#f895bd] transition"
                                        >
                                            <Download size={17} />
                                            Download Excel
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400">Concert Report</p>
                                    <h2 className="text-lg font-semibold mt-1">
                                        {report.concert?.title || "-"}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {report.concert?.date
                                            ? new Date(report.concert.date).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            })
                                            : "-"}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                                    {stats.map(({ title, value, icon: Icon }) => (
                                        <div key={title} className="bg-[#272727] rounded-xl p-4 border border-[#333]">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm text-gray-400">{title}</p>
                                                <Icon size={20} className="text-[#FBADCC]" />
                                            </div>
                                            <p className="text-xl sm:text-2xl font-bold break-words">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
                                    <div className="bg-[#272727] rounded-2xl border border-[#333] p-5">
                                        <h2 className="font-semibold text-lg">Ticket Comparison</h2>
                                        <p className="text-gray-400 text-sm mt-1 mb-5">
                                            Issued tickets and remaining tickets
                                        </p>

                                        <div className="h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={ticketData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={65}
                                                        outerRadius={90}
                                                        paddingAngle={4}
                                                        stroke="none"
                                                    >
                                                        <Cell fill="#FBADCC" />
                                                        <Cell fill="#51404a" />
                                                    </Pie>
                                                    <Tooltip contentStyle={tooltipStyle} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="flex justify-center gap-8 text-sm">
                                            <p className="text-gray-400">
                                                Terbit: <span className="text-white font-semibold">{ticketsIssued}</span>
                                            </p>
                                            <p className="text-gray-400">
                                                Tersedia: <span className="text-white font-semibold">{availableTickets}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-[#272727] rounded-2xl border border-[#333] p-5">
                                        <h2 className="font-semibold text-lg">Attendance Rate</h2>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Checked-in and not checked-in tickets
                                        </p>

                                        <div className="relative h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={attendanceData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={65}
                                                        outerRadius={90}
                                                        stroke="none"
                                                    >
                                                        <Cell fill="#FBADCC" />
                                                        <Cell fill="#51404a" />
                                                    </Pie>
                                                    <Tooltip contentStyle={tooltipStyle} />
                                                </PieChart>
                                            </ResponsiveContainer>

                                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                <span className="text-3xl font-bold text-[#FBADCC]">{attendance}%</span>
                                                <span className="text-xs text-gray-400">Attendance</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center gap-8 text-sm">
                                            <p className="text-gray-400">
                                                Hadir: <span className="text-white font-semibold">{checkedIn}</span>
                                            </p>
                                            <p className="text-gray-400">
                                                Belum Hadir: <span className="text-white font-semibold">{notCheckedIn}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            

                                <div className="bg-[#272727] rounded-2xl border border-[#333] p-5">
                                    <h2 className="font-semibold text-lg">Ticket Category Details</h2>
                                    <p className="text-gray-400 text-sm mt-1 mb-5">
                                        Sales and revenue details for each ticket category
                                    </p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[700px] text-sm text-left">
                                            <thead className="bg-[#1a1a1a] text-xs uppercase tracking-wider text-gray-400">
                                                <tr>
                                                    <th className="px-4 py-4">Category</th>
                                                    <th className="px-4 py-4">Price</th>
                                                    <th className="px-4 py-4">Quota</th>
                                                    <th className="px-4 py-4">Issued</th>
                                                    <th className="px-4 py-4">Check-in</th>
                                                    <th className="px-4 py-4">Available</th>
                                                    <th className="px-4 py-4">Revenue</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(report.tiers || []).map(tier => (
                                                    <tr key={tier.tier_id} className="border-t border-[#333] hover:bg-[#303030]">
                                                        <td className="px-4 py-4 font-medium">{tier.name}</td>
                                                        <td className="px-4 py-4">{formatRupiah(tier.price)}</td>
                                                        <td className="px-4 py-4">{tier.quota}</td>
                                                        <td className="px-4 py-4">{tier.tickets_issued}</td>
                                                        <td className="px-4 py-4">{tier.checked_in}</td>
                                                        <td className="px-4 py-4">{tier.available}</td>
                                                        <td className="px-4 py-4 text-[#FBADCC] font-semibold">
                                                            {formatRupiah(tier.revenue)}
                                                        </td>
                                                    </tr>
                                                ))}

                                                {!report.tiers?.length && (
                                                    <tr>
                                                        <td colSpan="7" className="p-10 text-center text-gray-400">
                                                            No ticket category data
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </EoGuard>
    )
}
