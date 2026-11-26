
"use client"

import { useCallback, useEffect, useState } from "react"
import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { adminApi } from "../../../../lib/api"
import Link from "next/link"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

export default function SuperAdminUsers() {
    const [tab, setTab] = useState("user")
    const [users, setUsers] = useState([])
    const [eos, setEos] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [actionId, setActionId] = useState(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const [userRes, eoRes] = await Promise.all([
                adminApi.getAllUser(),
                adminApi.getAllEO()
            ])
            const getList = res => {
                const data = res?.data?.data ?? res?.data ?? res
                return Array.isArray(data) ? data : data?.items ?? []
            }
            setUsers(getList(userRes).filter(u => u.role === "user"))
            setEos(getList(eoRes))
        } catch (err) {
            setError(err.message || "Gagal memuat data akun")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const toggleStatus = async (id) => {
        try {
            setActionId(id)
            await adminApi.statusUser(id)
            setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: !u.is_active } : u))
        } catch (err) {
            alert(err.message || "Gagal mengubah status")
        } finally {
            setActionId(null)
        }
    }

    const data = tab === "user" ? users : eos
    const filtered = data.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    )

    const active = users.filter(u => u.is_active).length
    const inactive = users.length - active
    const pieData = [
        { name: "Active", value: active },
        { name: "Inactive", value: inactive }
    ]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const lineData = months.map((month, i) => ({
        month,
        users: users.filter(u => u.created_at && new Date(u.created_at).getMonth() === i).length
    }))

    return (
        <AdminGuard>
            <div className="min-h-screen flex bg-[#131313] text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold">Manage Account</h1>
                                <p className="text-sm text-gray-400 mt-1">Manage Account User and Event Organizer</p>
                            </div>
                            <div>
                                <Link href="/admin/users/create" className="px-5 py-3 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90">
                                    + Buat Akun
                                </Link>
                            </div>
                        </div>

                        <div className="flex gap-5 border-b border-[#333] mb-6">
                            {["user", "eo"].map(item => (
                                <button key={item} onClick={() => { setTab(item); setSearch("") }} className={`pb-3 text-sm font-semibold border-b-2 ${tab === item ? "border-[#FBADCC] text-[#FBADCC]" : "border-transparent text-gray-400"}`}>
                                    {item === "user" ? `User (${users.length})` : `Event Organizer (${eos.length})`}
                                </button>
                            ))}
                        </div>

                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={`Cari ${tab === "user" ? "user" : "EO"}...`}
                            className="w-full mb-6 px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-sm outline-none focus:border-[#FBADCC]"
                        />

                        {error && <p className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-400 text-sm">{error}</p>}

                        {tab === "user" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#272727] p-5 rounded-2xl border border-[#333]">
                                    <h2 className="text-sm font-semibold mb-3">User Registration Trend</h2>
                                    <div className="h-52">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={lineData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                                                <YAxis stroke="#888" fontSize={12} allowDecimals={false} />
                                                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                                                <Line dataKey="users" stroke="#FBADCC" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-[#272727] p-5 rounded-2xl border border-[#333]">
                                    <h2 className="text-sm font-semibold mb-3">Status Distribution</h2>
                                    <div className="h-52">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                                                    {pieData.map((_, i) => <Cell key={i} fill={["#4ade80", "#f87171"][i]} />)}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <p className="text-center text-xs text-gray-400">Active: {active} · Inactive: {inactive}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-[#272727] rounded-2xl overflow-x-auto border border-[#333]">
                            <div className={`min-w-[750px] grid ${tab === "user" ? "grid-cols-12" : "grid-cols-12"} gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400`}>
                                <div className="col-span-3">{tab === "user" ? "User" : "Event Organizer"}</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Phone</div>
                                {tab === "user" ? (
                                    <>
                                        <div className="col-span-1">Status</div>
                                        <div className="col-span-3 text-right">Action</div>
                                    </>
                                ) : (
                                    <div className="col-span-4">Tanggal Daftar</div>
                                )}
                            </div>

                            {loading ? (
                                <p className="p-8 text-center text-sm text-gray-400">Memuat data...</p>
                            ) : filtered.length === 0 ? (
                                <p className="p-8 text-center text-sm text-gray-400">Belum ada data akun.</p>
                            ) : filtered.map(item => (
                                <div key={item.id} className="min-w-[750px] grid grid-cols-12 gap-4 p-4 items-center border-t border-[#333] hover:bg-[#2f2f2f]">
                                    <div className="col-span-3 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#FBADCC]/20 flex items-center justify-center text-[#FBADCC] font-bold text-xs">
                                            {item.name?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "-"}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-sm truncate">{item.email}</div>
                                    <div className="col-span-2 text-sm">{item.phone || "-"}</div>

                                    {tab === "user" ? (
                                        <>
                                            <div className="col-span-1">
                                                <span className={`text-xs ${item.is_active ? "text-green-400" : "text-red-400"}`}>
                                                    {item.is_active ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                            <div className="col-span-3 flex justify-end">
                                                <button onClick={() => toggleStatus(item.id)} disabled={actionId === item.id} className={`px-3 py-1.5 rounded-lg text-xs disabled:opacity-50 ${item.is_active ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                                                    {actionId === item.id ? "Loading..." : item.is_active ? "Deactivate" : "Activate"}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-4 text-sm text-gray-400">
                                            {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}
