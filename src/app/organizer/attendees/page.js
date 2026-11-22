
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { organizerApi } from "../../../../lib/api"

export default function AttendeesPage() {
    const scannerRef = useRef(null)
    const scanLockRef = useRef(false)

    const [concerts, setConcerts] = useState([])
    const [selectedConcert, setSelectedConcert] = useState("")
    const [stats, setStats] = useState(null)

    const [scanning, setScanning] = useState(false)
    const [loading, setLoading] = useState(false)
    const [statsLoading, setStatsLoading] = useState(false)
    const [concertLoading, setConcertLoading] = useState(true)

    const [result, setResult] = useState(null)
    const [error, setError] = useState("")

    const loadConcerts = async () => {
        try {
            setConcertLoading(true)

            const response = await organizerApi.getMyConcert()
            const data = response?.data?.data ?? response?.data ?? []

            const list = Array.isArray(data) ? data : []

            setConcerts(list)

            if (list.length > 0) {
                setSelectedConcert(String(list[0].id))
            }
        } catch (err) {
            setError(err.message || "Gagal mengambil daftar konser")
        } finally {
            setConcertLoading(false)
        }
    }

    const loadStats = useCallback(async () => {
        if (!selectedConcert) {
            setStats(null)
            return
        }

        try {
            setStatsLoading(true)

            const response = await organizerApi.getCheckinCount(selectedConcert)
            const data = response?.data?.data ?? response?.data

            setStats(data)
        } catch (err) {
            console.error("Stats error:", err)
            setStats(null)
        } finally {
            setStatsLoading(false)
        }
    }, [selectedConcert])

    const stopScanner = async () => {
        if (scannerRef.current) {
            const scanner = scannerRef.current
            scannerRef.current = null

            try {
                await scanner.stop()
                await scanner.clear()
            } catch (err) {
                console.log("Scanner stop:", err)
            }
        }

        setScanning(false)
    }

    const startScanner = async () => {
        try {
            setError("")
            setResult(null)

            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error("Browser tidak mendukung kamera. Gunakan HTTPS atau localhost.")
            }

            const { Html5Qrcode } = await import("html5-qrcode")

            const scanner = new Html5Qrcode("qr-reader")
            scannerRef.current = scanner

            await scanner.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                async (decodedText) => {
                    if (scanLockRef.current) return

                    scanLockRef.current = true
                    setLoading(true)

                    await stopScanner()

                    try {
                        const response = await organizerApi.scanTicket({
                            qr_code: decodedText
                        })

                        const data = response?.data?.data ?? response?.data

                        setResult({
                            success: true,
                            message: response?.message || "Valid ticket: entry granted",
                            ticket: data
                        })

                        await loadStats()

                    } catch (err) {
                        setResult({
                            success: false,
                            message: err.message || "Gagal memverifikasi tiket"
                        })

                        await loadStats()
                    } finally {
                        setLoading(false)
                        scanLockRef.current = false
                    }
                },
                () => {}
            )

            setScanning(true)

        } catch (err) {
            console.error("Scanner error:", err)

            setError(err.message || "Kamera gagal diaktifkan.")

            if (scannerRef.current) {
                try {
                    await scannerRef.current.stop()
                    await scannerRef.current.clear()
                } catch {}

                scannerRef.current = null
            }

            setScanning(false)
        }
    }

    const resetResult = () => {
        setResult(null)
        setError("")
    }

    useEffect(() => {
        loadConcerts()

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(() => {})
            }
        }
    }, [])

    useEffect(() => {
        loadStats()
    }, [loadStats])

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Attendees
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Scan QR ticket untuk memverifikasi kehadiran pengunjung
                            </p>
                        </div>

                        <div className="bg-[#272727] border border-[#333] rounded-2xl p-5 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="font-semibold">Pilih Konser</h2>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Pilih konser untuk melihat statistik kehadiran
                                    </p>
                                </div>

                                <select
                                    value={selectedConcert}
                                    onChange={(e) => setSelectedConcert(e.target.value)}
                                    disabled={concertLoading || concerts.length === 0}
                                    className="bg-[#181818] border border-[#444] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FBADCC] w-full sm:w-72"
                                >
                                    {concertLoading ? (
                                        <option value="">Memuat konser...</option>
                                    ) : concerts.length === 0 ? (
                                        <option value="">Belum ada konser</option>
                                    ) : (
                                        concerts.map((concert) => (
                                            <option key={concert.id} value={concert.id}>
                                                {concert.title}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

                            <div className="bg-[#272727] border border-[#333] rounded-2xl p-5">
                                <p className="text-sm text-gray-400">Total Valid Tickets</p>
                                <h2 className="text-3xl font-bold mt-3">
                                    {statsLoading ? "..." : stats?.total_valid_ticket ?? 0}
                                </h2>
                                <p className="text-xs text-gray-500 mt-2">
                                    Total tiket yang valid
                                </p>
                            </div>

                            <div className="bg-[#272727] border border-green-500/20 rounded-2xl p-5">
                                <p className="text-sm text-green-400">Checked In</p>
                                <h2 className="text-3xl font-bold text-green-400 mt-3">
                                    {statsLoading ? "..." : stats?.checked_in ?? 0}
                                </h2>
                                <p className="text-xs text-gray-500 mt-2">
                                    Tiket sudah digunakan
                                </p>
                            </div>

                            <div className="bg-[#272727] border border-yellow-500/20 rounded-2xl p-5">
                                <p className="text-sm text-yellow-400">Not Checked In</p>
                                <h2 className="text-3xl font-bold text-yellow-400 mt-3">
                                    {statsLoading ? "..." : stats?.not_arriving_yet ?? 0}
                                </h2>
                                <p className="text-xs text-gray-500 mt-2">
                                    Tiket belum digunakan
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            <div className="bg-[#272727] border border-[#333] rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            QR Code Scanner
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Arahkan kamera ke QR Code tiket
                                        </p>
                                    </div>

                                    <span className={`text-xs px-3 py-1 rounded-full ${
                                        scanning
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-gray-500/20 text-gray-400"
                                    }`}>
                                        {scanning ? "Camera Active" : "Camera Off"}
                                    </span>
                                </div>

                                <div className="bg-black rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center">
                                    <div id="qr-reader" className="w-full"></div>

                                    {!scanning && (
                                        <div className="text-center text-gray-500 py-16">
                                            <p className="text-5xl mb-3">▦</p>
                                            <p className="text-sm">
                                                Kamera belum diaktifkan
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400 mt-4">
                                        {error}
                                    </p>
                                )}

                                <div className="flex gap-3 mt-5">
                                    {!scanning ? (
                                        <button
                                            onClick={startScanner}
                                            disabled={loading || concertLoading}
                                            className="flex-1 bg-[#FBADCC] text-black font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
                                        >
                                            Mulai Scan
                                        </button>
                                    ) : (
                                        <button
                                            onClick={stopScanner}
                                            className="flex-1 bg-red-500/20 text-red-400 font-semibold py-3 rounded-xl hover:bg-red-500/30"
                                        >
                                            Hentikan Kamera
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-[#272727] border border-[#333] rounded-2xl p-5">
                                <h2 className="text-lg font-semibold mb-2">
                                    Hasil Verifikasi
                                </h2>

                                <p className="text-sm text-gray-400 mb-5">
                                    Informasi tiket yang berhasil dipindai akan muncul di sini.
                                </p>

                                {loading ? (
                                    <div className="text-center py-16">
                                        <p className="text-gray-300">
                                            Memverifikasi tiket...
                                        </p>
                                    </div>
                                ) : result ? (
                                    <div className={`rounded-xl p-5 border ${
                                        result.success
                                            ? "bg-green-500/10 border-green-500/30"
                                            : "bg-red-500/10 border-red-500/30"
                                    }`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-3xl">
                                                {result.success ? "✓" : "✕"}
                                            </span>

                                            <div>
                                                <h3 className={`font-semibold ${
                                                    result.success
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }`}>
                                                    {result.success
                                                        ? "Tiket Valid"
                                                        : "Tiket Tidak Valid"}
                                                </h3>

                                                <p className="text-sm text-gray-300">
                                                    {result.message}
                                                </p>
                                            </div>
                                        </div>

                                        {result.ticket && (
                                            <div className="border-t border-white/10 pt-4 mt-4 space-y-3 text-sm">
                                                {[
                                                    ["Ticket ID", result.ticket.ticket_id],
                                                    ["Holder", result.ticket.holder],
                                                    ["Ticket Tier", result.ticket.tier],
                                                    ["Concert", result.ticket.concert],
                                                    [
                                                        "Check-in Time",
                                                        result.ticket.check_in_at
                                                            ? new Date(result.ticket.check_in_at).toLocaleString("id-ID")
                                                            : "-"
                                                    ]
                                                ].map(([label, value]) => (
                                                    <div key={label} className="flex justify-between gap-4">
                                                        <span className="text-gray-400">{label}</span>
                                                        <span className="text-right break-all">{value ?? "-"}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <button
                                            onClick={resetResult}
                                            className="w-full mt-5 py-2.5 rounded-lg bg-[#333] hover:bg-[#444] text-sm"
                                        >
                                            Scan Tiket Berikutnya
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-16 text-gray-500">
                                        <p className="text-4xl mb-3">▦</p>
                                        <p className="text-sm">
                                            Belum ada tiket yang dipindai
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </EoGuard>
    )
}
