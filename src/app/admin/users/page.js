"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

const INITIAL_USERS = [
    { id: 1, name: "Ahmad Fauzi", email: "ahmad@email.com", phone: "+62 812 3456 7890", role: "user", is_active: true, created_at: "2026-01-15T10:00:00" },
    { id: 2, name: "Siti Rahma", email: "siti@email.com", phone: "+62 813 4567 8901", role: "user", is_active: true, created_at: "2026-02-20T10:00:00" },
    { id: 3, name: "Budi Santoso", email: "budi@email.com", phone: "+62 814 5678 9012", role: "event_organizer", is_active: true, created_at: "2026-03-10T10:00:00" },
    { id: 4, name: "Dewi Lestari", email: "dewi@email.com", phone: "+62 815 6789 0123", role: "user", is_active: false, created_at: "2026-04-05T10:00:00" },
    { id: 5, name: "Rina Andini", email: "rina@email.com", phone: "+62 816 7890 1234", role: "event_organizer", is_active: true, created_at: "2026-01-12T10:00:00" },
    { id: 6, name: "Andi Wijaya", email: "andi@email.com", phone: "+62 817 8901 2345", role: "user", is_active: false, created_at: "2026-03-25T10:00:00" },
    { id: 7, name: "Nina Sari", email: "nina@email.com", phone: "+62 818 9012 3456", role: "user", is_active: true, created_at: "2026-04-01T10:00:00" },
    { id: 8, name: "Rizki Pratama", email: "rizki@email.com", phone: "+62 819 0123 4567", role: "event_organizer", is_active: true, created_at: "2026-02-18T10:00:00" },
]

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
    const [users, setUsers] = useState(INITIAL_USERS)

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        if (activeTab === "organizer") return matchesSearch && user.role === "event_organizer"
        if (activeTab === "user") return matchesSearch && user.role === "user"
        return matchesSearch
    })

    const handleDelete = (id, name) => {
        const confirmDelete = window.confirm(`Apakah kamu yakin ingin menghapus user "${name}"?`)
        if (confirmDelete) {
            setUsers((prev) => prev.filter((user) => user.id !== id))
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
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kelola Akun</h1>
                                <p className="text-gray-400 text-sm mt-1">Manage all users and organizers</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Export
                                </button>
                                <Link
                                    href="/admin/users/create"
                                    className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25 inline-block"
                                >
                                    + Add User
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                                <button
                                    onClick={() => setActiveTab("all")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveTab("organizer")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "organizer" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    Organizer
                                </button>
                                <button
                                    onClick={() => setActiveTab("user")}
                                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "user" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}
                                >
                                    User
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]"
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

                            {filteredUsers.length === 0 && (
                                <div className="p-8 text-center text-sm text-gray-400">
                                    Tidak ada user yang cocok.
                                </div>
                            )}

                            {filteredUsers.map((user) => (
                                <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#2f2f2f] transition-colors border-b border-[#333] last:border-0">
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#FBADCC] flex items-center justify-center text-black font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 text-sm truncate">{user.email}</div>
                                    <div className="col-span-2 text-sm">{user.phone}</div>
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
                                        <button className="px-2.5 py-1.5 bg-[#1a1a1a] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            className="px-2.5 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors border border-red-500/20"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-400">Showing {filteredUsers.length} of {users.length} users</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Previous</button>
                                <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">1</button>
                                <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}