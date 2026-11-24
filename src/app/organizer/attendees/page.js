"use client"

import { useEffect, useRef, useState } from "react"
import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import { organizerApi } from "../../../../lib/api"

export default function AttendeesPage() {
    const scannerRef = useRef(null)
    const scanLockRef = useRef(false)

    const [concerts, setConcerts] = useState([])
    const [selectedConcert, setSelectedConcert] = useState("")
    const [scanning, setScanning] = useState(false)
    const [loading, setLoading] = useState(false)
    const [concertLoading, setConcertLoading] = useState(true)
    const [result, setResult] = useState(null)
    const [error, setError] = useState("")

    const loadConcerts = async () => {
        try {
            setConcertLoading(true)
            setError("")

            const response = await organizerApi.getMyConcert()

            const payload = response?.data?.data ?? response?.data ?? response

            const list =
                (Array.isArray(payload) && payload) ||
                (Array.isArray(payload?.items) && payload.items) ||
                (Array.isArray(payload?.rows) && payload.rows) ||
                (Array.isArray(payload?.data) && payload.data) ||
                []

            setConcerts(list)

            if (list.length > 0) {
                setSelectedConcert(String(list[0].id))
            } else {
                setSelectedConcert("")
            }
        } catch (err) {
            console.error("getMyConcert error:", err)
            setConcerts([])
            setSelectedConcert("")
            setError(
                err?.response?.data?.message ||
                err.message ||
                "Gagal mengambil daftar konser"
            )
        } finally {
            setConcertLoading(false)
        }
    }

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
        setError("")
        setResult(null)

        if (!selectedConcert) {
            setError("Pilih konser terlebih dahulu sebelum scan.")
            return
        }

        if (!navigator.mediaDevices?.getUserMedia) {
            setError("Browser tidak mendukung kamera. Gunakan HTTPS atau localhost.")
            return
        }

        try {
            const { Html5Qrcode } = await import("html5-qrcode")

            const scanner = new Html5Qrcode("qr-reader")
            scannerRef.current = scanner

            await scanner.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                async (decodedText) => {
                    if (scanLockRef.current) return

                    scanLockRef.current = true
                    setLoading(true)

                    await stopScanner()

                    const selected = concerts.find(
                        (c) => String(c.id) === String(selectedConcert)
                    )

                    try {
                        const response = await organizerApi.scanTicket({
                            qr_code: decodedText,
                            concert_id: Number(selectedConcert)
                        })

                        const data = response?.data?.data ?? response?.data
                        const beMessage = response?.message || "Valid ticket: entry granted"

                        const concertName = data?.concert ?? null
                        const selectedName = selected?.title ?? null

                        if (
                            selectedName &&
                            concertName &&
                            String(concertName).trim().toLowerCase() !==
                            String(selectedName).trim().toLowerCase()
                        ) {
                            setResult({
                                success: false,
                                message: `Tiket ini milik konser "${concertName}", bukan "${selectedName}". Verifikasi ditolak.`,
                                ticket: data
                            })
                        } else {
                            setResult({
                                success: true,
                                message: beMessage,
                                ticket: data
                            })
                        }
                    } catch (err) {
                        const respData = err?.response?.data
                        const checkInAt = respData?.data?.check_in_at

                        let errMsg =
                            respData?.message ||
                            err.message ||
                            "Gagal memverifikasi tiket"

                        if (checkInAt) {
                            errMsg = `${errMsg} (check-in: ${new Date(checkInAt).toLocaleString("id-ID")})`
                        }

                        setResult({ success: false, message: errMsg })
                    } finally {
                        setLoading(false)
                        scanLockRef.current = false
                    }
                },
                () => { }
            )

            setScanning(true)
        } catch (err) {
            console.error("Scanner error:", err)
            setError(err.message || "Kamera gagal diaktifkan.")

            if (scannerRef.current) {
                try {
                    await scannerRef.current.stop()
                    await scannerRef.current.clear()
                } catch { }
                scannerRef.current = null
            }
            setScanning(false)
        }
    }

    const resetResult = () => {
        setResult(null)
        setError("")
    }

    // ==== INIT ====
    useEffect(() => {
        loadConcerts()
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(() => { })
            }
        }
    }, [])

    useEffect(() => {
        setResult(null)
        setError("")
    }, [selectedConcert])

    const hasConcert = concerts.length > 0
    const canScan = !!selectedConcert && !concertLoading && !loading

    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold">Attendees</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Scan QR ticket untuk memverifikasi kehadiran pengunjung
                            </p>
                        </div>

                        <div className="bg-[#272727] border border-[#333] rounded-2xl p-5 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="font-semibold">Pilih Konser</h2>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Pilih konser terlebih dahulu sebelum scan tiket
                                    </p>
                                </div>

                                <select
                                    value={selectedConcert}
                                    onChange={(e) => setSelectedConcert(e.target.value)}
                                    disabled={concertLoading || !hasConcert}
                                    className="bg-[#181818] border border-[#444] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FBADCC] w-full sm:w-72 disabled:opacity-50"
                                >
                                    {concertLoading ? (
                                        <option value="">Memuat konser...</option>
                                    ) : !hasConcert ? (
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

                            {!hasConcert && !concertLoading && (
                                <p className="text-xs text-yellow-400 mt-3">
                                    Belum ada konser. Buat konser dulu untuk mulai scan.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-[#272727] border border-[#333] rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h2 className="text-lg font-semibold">QR Code Scanner</h2>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Arahkan kamera ke QR Code tiket
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${scanning
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-gray-500/20 text-gray-400"
                                            }`}
                                    >
                                        {scanning ? "Camera Active" : "Camera Off"}
                                    </span>
                                </div>

                                <div className="bg-black rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center">
                                    <div id="qr-reader" className="w-full"></div>

                                    {!scanning && (
                                        <div className="text-center text-gray-500 py-16">
                                            <p className="text-5xl mb-3">▦</p>
                                            <p className="text-sm">
                                                {canScan
                                                    ? "Kamera belum diaktifkan"
                                                    : "Pilih konser terlebih dahulu"}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400 mt-4">{error}</p>
                                )}

                                <div className="flex gap-3 mt-5">
                                    {!scanning ? (
                                        <button
                                            onClick={startScanner}
                                            disabled={!canScan}
                                            className="flex-1 bg-[#FBADCC] text-black font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {canScan ? "Mulai Scan" : "Pilih Konser Dulu"}
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
                                <h2 className="text-lg font-semibold mb-2">Hasil Verifikasi</h2>
                                <p className="text-sm text-gray-400 mb-5">
                                    Informasi tiket yang berhasil dipindai akan muncul di sini.
                                </p>

                                {loading ? (
                                    <div className="text-center py-16">
                                        <p className="text-gray-300">Memverifikasi tiket...</p>
                                    </div>
                                ) : result ? (
                                    <div
                                        className={`rounded-xl p-5 border ${result.success
                                                ? "bg-green-500/10 border-green-500/30"
                                                : "bg-red-500/10 border-red-500/30"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-3xl">
                                                {result.success ? "✓" : "✕"}
                                            </span>
                                            <div>
                                                <h3
                                                    className={`font-semibold ${result.success
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                        }`}
                                                >
                                                    {result.success ? "Tiket Valid" : "Tiket Tidak Valid"}
                                                </h3>
                                                <p className="text-sm text-gray-300">{result.message}</p>
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
                                        <p className="text-sm">Belum ada tiket yang dipindai</p>
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