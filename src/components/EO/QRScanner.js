
"use client"

import { useEffect } from "react"
import { Html5Qrcode } from "html5-qrcode"

export default function QRScanner({ onScan, onClose }) {
    useEffect(() => {
        const scanner = new Html5Qrcode("qr-reader")
        let isMounted = true

        const startScanner = async () => {
            try {
                await scanner.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    async (decodedText) => {
                        if (!isMounted) return
                        await scanner.stop()
                        await scanner.clear()
                        onScan(decodedText)
                    },
                    () => {}
                )
            } catch (error) {
                console.error("Kamera tidak dapat dibuka:", error)
            }
        }

        startScanner()

        return () => {
            isMounted = false
            if (scanner.isScanning) {
                scanner.stop().then(() => scanner.clear()).catch(() => {})
            }
        }
    }, [onScan])

    return (
        <div className="bg-[#272727] p-5 rounded-2xl border border-[#444]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Scan QR Ticket</h2>
                <button onClick={onClose} className="text-sm text-gray-400 hover:text-white">
                    Tutup
                </button>
            </div>
            <div id="qr-reader" className="overflow-hidden rounded-xl" />
            <p className="text-xs text-gray-400 mt-3 text-center">
                Arahkan kamera ke QR Code pada tiket pengunjung
            </p>
        </div>
    )
}
