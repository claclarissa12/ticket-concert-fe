"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { useCallback, useEffect, useState } from "react"
import { adminApi } from "../../../../lib/api"
import Link from "next/link"

export default function SuperAdminEO() {
    const [eos, setEos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [actionLoading, setActionLoading] = useState(null) // id EO yang sedang diproses

    const fetchEO = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await adminApi.getAllEO()
            const payload = res?.data?.data ?? res?.data ?? res
            const list = Array.isArray(payload) ? payload : (payload?.items ?? [])
            setEos(list)
        } catch (err) {
            setError(err.message || "Gagal memuat data Event Organizer")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchEO() }, [fetchEO])

    const handleApprove = async (id, name) => {
        if (!confirm(`Approve Event Organizer "${name}"?`)) return
        setActionLoading(id)
        setError("")
        try {
            await adminApi.approveEO(id)
            await fetchEO()
        } catch (err) {
            setError(err.message)
        } finally {
            setActionLoading(null)
        }
    }

    const handleReject = async (id, name) => {
        if (!confirm(`Reject Event Organizer "${name}"?`)) return
        setActionLoading(id)
        setError("")
        try {
            await adminApi.rejectEO(id)
            await fetchEO()
        } catch (err) {
            setError(err.message)
        } finally {
            setActionLoading(null)
        }
    }

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                    Event Organizer
                                </h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    Kelola pendaftaran dan status Event Organizer
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={fetchEO}
                                    disabled={loading}
                                    className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] disabled:opacity-50"
                                >
                                    {loading ? "Loading..." : "Refresh"}
                                </button>
                                <Link
                                    href="/admin/users/create"
                                    className="px-6 py-3 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25"
                                >
                                    Buat Akun EO
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm border border-red-500/30">
                                {error}
                            </div>
                        )}

                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                            <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                                <div className="col-span-3">Organizer</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Phone</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {loading && eos.length === 0 && (
                                <div className="p-8 text-center text-sm text-gray-400">
                                    Memuat data...
                                </div>
                            )}

                            {!loading && eos.length === 0 && (
                                <div className="p-8 text-center text-sm text-gray-400">
                                    Belum ada Event Organizer.
                                </div>
                            )}

                            {eos.map((eo) => (
                                <div
                                    key={eo.id}
                                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333] last:border-0"
                                >
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center text-orange-300 font-bold text-xs">
                                                {eo.name?.charAt(0) || "?"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{eo.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {eo.created_at
                                                        ? new Date(eo.created_at).toLocaleDateString("id-ID", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-sm truncate">{eo.email}</div>
                                    <div className="col-span-2 text-sm">{eo.phone || "-"}</div>
                                    <div className="col-span-2">
                                        <span
                                            className={`text-xs px-2.5 py-1 rounded-full ${eo.is_active
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                                }`}
                                        >
                                            {eo.is_active ? "Approved" : "Pending"}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-1.5">
                                        {!eo.is_active ? (
                                            <button
                                                onClick={() => handleApprove(eo.id, eo.name)}
                                                disabled={actionLoading === eo.id}
                                                className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs hover:bg-green-500/20 transition-colors border border-green-500/20 disabled:opacity-50"
                                            >
                                                {actionLoading === eo.id ? "..." : "Approve"}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleReject(eo.id, eo.name)}
                                                disabled={actionLoading === eo.id}
                                                className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors border border-red-500/20 disabled:opacity-50"
                                            >
                                                {actionLoading === eo.id ? "..." : "Reject"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">
                                Showing {eos.length} of {eos.length} organizer
                            </p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">
                                    1
                                </button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}