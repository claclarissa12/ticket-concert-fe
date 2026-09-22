"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarAdmin() {
    const pathname = usePathname()

    const menuItems = [
        {
            href: "/admin/dashboard",
            label: "Dashboard",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            href: "/admin/users",
            label: "Kelola Akun",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            href: "/admin/approve",
            label: "Terima Ajuan Event",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            href: "/admin/events",
            label: "Memantau Event",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            href: "/admin/transactions",
            label: "Memantau Transaksi",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            href: "/admin/eoApprove",
            label: "Approve Form Register EO",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4-4 1.72-4 4m6 0c0 1.18-.82 2-2 2s-2-.82-2-2 .82-2 2-2 2 .82 2 2M3 20h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1m4-5h2c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3m5.29-3.29 3 3c.2.2.45.29.71.29s.51-.1.71-.29l5-5L20.3 8.3l-4.29 4.29-2.29-2.29-1.41 1.41Z"></path>
                </svg>
            )
        },
        {
            href: "/admin/venue",
            label: "Design Venue",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        }
    ]
    return (
        <div className="w-64 h-screen sticky top-0 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col">
            <div className="px-5 py-4 border-b border-[#1a1a1a]">
                <div className="flex items-center gap-2.5">

                    <h1 className="text-xl font-semibold text-white">
                        Ticket<span className="text-[#FBADCC]">.COM</span>
                    </h1>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-3 py-3.5 rounded-md text-sm transition-colors
                                ${isActive
                                    ? 'bg-[#FBADCC]/20 text-[#FBADCC]'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]'
                                }
                            `}
                        >
                            <span className={`${isActive ? 'text-pink-400' : 'text-gray-600'}`}>
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="px-3 py-3 border-t border-[#1a1a1a]">
                <div className="flex items-center gap-3 px-2 py-2 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-[#FBADCC] flex items-center justify-center text-white font-semibold text-xs">
                        EO
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">SuperAdmin</p>
                        <p className="text-xs text-gray-500 truncate">admin@superadmin.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}