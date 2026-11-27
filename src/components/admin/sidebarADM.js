"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import SidebarAccount from "../shared/shareSidebar"

export default function SidebarAdmin() {
    const pathname = usePathname()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const raw = localStorage.getItem("user")
        if (raw) return setUser(JSON.parse(raw))
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(r => r.json())
            .then(j => setUser(j.data ?? j))
            .catch(() => { })
    }, [])

    const name = user?.name || "SuperAdmin"
    const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()

    const menuItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { href: "/admin/users", label: "User Account", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
        { href: "/admin/events", label: "Event List", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { href: "/admin/transactions", label: "Transactions", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    ]

    return (
        <div className="w-64 h-screen sticky top-0 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col">
            <div className="px-5 py-4 border-b border-[#1a1a1a]">
                <h1 className="text-xl font-semibold text-white">
                    The<span className="text-[#FBADCC]">Concert's</span>
                </h1>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
                {menuItems.map((item) => {
                    const active = pathname === item.href || pathname?.startsWith(item.href + '/')
                    return (
                        <Link key={item.href} href={item.href}
                            className={`flex items-center gap-3 px-3 py-3.5 rounded-md text-sm transition-colors ${active ? 'bg-[#FBADCC]/20 text-[#FBADCC]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]'}`}>
                            <span className={active ? 'text-pink-400' : 'text-gray-600'}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="px-3 py-4 border-t border-[#1a1a1a]">
                <SidebarAccount roleLabel="Administrator" />
            </div>
        </div>
    )
}