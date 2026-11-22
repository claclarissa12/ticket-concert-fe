'use client'
import { useEffect, useState, useCallback } from "react"
import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { adminApi } from "../../../../lib/api"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

const COLORS = ["#4ade80", "#f87171"]

export default function SuperAdminUsers() {
    const [searchTerm, setSearchTerm] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [togglingId, setTogglingId] = useState(null)

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await adminApi.getAllUser()
            const listData = res.data?.items || []
            setUsers(listData.filter(u => u.role === "user"))
        } catch (err) {
            setError(err.message || "Gagal memuat data")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const handleToggleStatus = async (id) => {
        try {
            setTogglingId(id)
            await adminApi.statusUser(id)
            setUsers(prev => prev.map(u => u.id === id ? { ...u, is_active: !u.is_active } : u))
        } catch (err) {
            alert(err.message || "Gagal mengubah status")
        } finally {
            setTogglingId(null)
        }
    }

    const filteredUsers = users.filter((user) => {
        return user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const activeCount = users.filter(u => u.is_active).length
    const inactiveCount = users.length - activeCount

    const pieData = [
        { name: "Active", value: activeCount },
        { name: "Inactive", value: inactiveCount }
    ]

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const lineData = monthNames.map((month, index) => ({
        month,
        users: users.filter(u => u.created_at && new Date(u.created_at).getMonth() === index).length
    }))

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kelola Akun</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage all users</p>
                        </div>
                        <div className="relative mb-6">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="7" />
                                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none text-sm transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#272727] rounded-2xl p-5 border border-[#333]">
                                <h2 className="text-sm font-semibold mb-2">User Registration Trend</h2>
                                <div className="h-56">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={lineData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                            <XAxis dataKey="month" stroke="#888" fontSize={12} />
                                            <YAxis stroke="#888" fontSize={12} allowDecimals={false} />
                                            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }} />
                                            <Line type="monotone" dataKey="users" stroke="#FBADCC" strokeWidth={2} dot={{ r: 3, fill: "#FBADCC" }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="bg-[#272727] rounded-2xl p-5 border border-[#333]">
                                <h2 className="text-sm font-semibold mb-2">Status Distribution</h2>
                                <div className="h-56">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={45}>
                                                {pieData.map((_, i) => (
                                                    <Cell key={i} fill={COLORS[i]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-400" />Active ({activeCount})</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" />Inactive ({inactiveCount})</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                            <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                                <div className="col-span-3">User</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Phone</div>
                                <div className="col-span-1">Role</div>
                                <div className="col-span-1">Status</div>
                                <div className="col-span-2 text-right">Action</div>
                            </div>
                            {loading && <div className="p-8 text-center text-sm text-gray-400">Memuat data...</div>}
                            {!loading && error && <div className="p-8 text-center text-sm text-red-400">{error}</div>}
                            {!loading && !error && filteredUsers.length === 0 && (
                                <div className="p-8 text-center text-sm text-gray-400">Tidak ada user yang cocok.</div>
                            )}
                            {!loading && !error && filteredUsers.map((user) => (
                                <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333] last:border-0">
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#FBADCC] flex items-center justify-center text-black font-bold text-xs">
                                                {user.name ? user.name.charAt(0) : "?"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID") : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-sm truncate">{user.email}</div>
                                    <div className="col-span-2 text-sm">{user.phone || "-"}</div>
                                    <div className="col-span-1">
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400">User</span>
                                    </div>
                                    <div className="col-span-1">
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${user.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                            {user.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <button
                                            onClick={() => handleToggleStatus(user.id)}
                                            disabled={togglingId === user.id}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${user.is_active ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20"}`}
                                        >
                                            {togglingId === user.id ? "..." : user.is_active ? "Deactivate" : "Activate"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}