'use client'

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import { adminApi } from "../../../../lib/api"

function getRoleColor(role) {
    switch (role) {
        case "superadmin": return "bg-purple-500/20 text-purple-400"
        case "event_organizer": return "bg-orange-500/20 text-orange-400"
        case "user": return "bg-blue-500/20 text-blue-400"
        default: return "bg-gray-500/20 text-gray-400"
    }
}

function getRoleLabel(role) {
    switch (role) {
        case "superadmin": return "Super Admin"
        case "event_organizer": return "Organizer"
        case "user": return "User"
        default: return role
    }
}

export default function SuperAdminUsers() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const res = await adminApi.getAllUser()


            const listData = res.data?.items || [];
            setUsers(listData);

        } catch (err) {
            console.error("ERROR:", err)
            setError(err.message || "Gagal memuat data")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())

        if (activeTab === "all") return matchesSearch
        if (activeTab === "organizer") return matchesSearch && user.role === "event_organizer"
        if (activeTab === "user") return matchesSearch && user.role === "user"
        return matchesSearch
    })

    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <SidebarAdmin />
                <div className="flex-1 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kelola Akun</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage all users and organizers</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/admin/users/create"
                                    className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all inline-block"
                                >
                                    + Add User
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                                {["all", "organizer", "user"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 rounded-lg text-sm transition-colors capitalize ${activeTab === tab ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none text-sm flex-1 min-w-[200px]"
                            />
                        </div>

                        <div className="bg-[#272727] rounded-2xl overflow-hidden border border-[#333]">
                            <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1a1a] text-sm font-semibold text-gray-400 border-b border-[#333]">
                                <div className="col-span-3">User</div>
                                <div className="col-span-3">Email</div>
                                <div className="col-span-2">Phone</div>
                                <div className="col-span-1">Role</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-1 text-right">Actions</div>
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
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${getRoleColor(user.role)}`}>
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${user.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                            {user.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <div className="col-span-1 flex justify-end gap-1.5">
                                        <button className="px-2.5 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">Edit</button>
                                        <button className="px-2.5 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors border border-red-500/20">Hapus</button>
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