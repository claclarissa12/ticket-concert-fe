"use client"

import { useState } from "react"

export default function UserNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-[#131313]/95 backdrop-blur-sm border-b border-[#272727]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <a href="/user/home" className="flex-shrink-0">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Ticket<span className="text-[#E21D8F]">.COM</span>
                        </h1>
                    </a>

                    <div className="hidden md:flex items-center gap-6 lg:gap-10">
                        <a href="/user/notif" className="hover:text-[#FBADCC] transition-colors p-2 rounded-lg hover:bg-[#272727]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 12.59V10c0-3.22-2.18-5.93-5.14-6.74C13.57 2.52 12.85 2 12 2s-1.56.52-1.86 1.26C7.18 4.08 5 6.79 5 10v2.59L3.29 14.3a1 1 0 0 0-.29.71v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.27-.11-.52-.29-.71zM19 16H5v-.59l1.71-1.71a1 1 0 0 0 .29-.71v-3c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .27.11.52.29.71L19 15.41zM5.64 3.3 4.23 1.89A10.9 10.9 0 0 0 1 9.67h2c0-2.4.94-4.66 2.64-6.36Zm12.72 0C20.06 5 21 7.26 21 9.66h2c0-2.94-1.14-5.7-3.22-7.78l-1.41 1.41ZM12 22c1.31 0 2.41-.83 2.82-2H9.18c.41 1.17 1.51 2 2.82 2"></path>
                            </svg>
                        </a>
                        <a href="/user/notif" className="hover:text-[#FBADCC] transition-colors p-2 rounded-lg hover:bg-[#272727]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 5H3c-.55 0-1 .45-1 1v3.55c0 .48.33.89.8.98a1.499 1.499 0 0 1 0 2.94c-.47.09-.8.5-.8.98V18c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-3.55c0-.48-.33-.89-.8-.98a1.499 1.499 0 0 1 0-2.94c.47-.09.8-.5.8-.98V6c0-.55-.45-1-1-1m-1 3.84c-1.2.57-2 1.79-2 3.16s.8 2.59 2 3.16V17h-4v-2h-1v2H4v-1.84c1.2-.57 2-1.79 2-3.16s-.8-2.59-2-3.16V7h11v1h1V7h4z"></path>
                                <path d="M15 9h1v2h-1zm0 3h1v2h-1z"></path>
                            </svg>
                        </a>
                        <a href="/user/profile/diikuti" className="hover:text-[#FBADCC] transition-colors p-2 rounded-lg hover:bg-[#272727]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
                            </svg>
                        </a>
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-[#272727] transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            ) : (
                                <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#1a1a1a] border-t border-[#272727] px-4 py-4 space-y-3">
                    <a href="/user/notif" className="flex items-center gap-3 text-gray-300 hover:text-[#FBADCC] transition-colors p-3 rounded-xl hover:bg-[#272727]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 12.59V10c0-3.22-2.18-5.93-5.14-6.74C13.57 2.52 12.85 2 12 2s-1.56.52-1.86 1.26C7.18 4.08 5 6.79 5 10v2.59L3.29 14.3a1 1 0 0 0-.29.71v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.27-.11-.52-.29-.71zM19 16H5v-.59l1.71-1.71a1 1 0 0 0 .29-.71v-3c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .27.11.52.29.71L19 15.41zM5.64 3.3 4.23 1.89A10.9 10.9 0 0 0 1 9.67h2c0-2.4.94-4.66 2.64-6.36Zm12.72 0C20.06 5 21 7.26 21 9.66h2c0-2.94-1.14-5.7-3.22-7.78l-1.41 1.41ZM12 22c1.31 0 2.41-.83 2.82-2H9.18c.41 1.17 1.51 2 2.82 2"></path>
                        </svg>
                        <span>Notifikasi</span>
                    </a>
                    <a href="/user/notif" className="flex items-center gap-3 text-gray-300 hover:text-[#FBADCC] transition-colors p-3 rounded-xl hover:bg-[#272727]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 5H3c-.55 0-1 .45-1 1v3.55c0 .48.33.89.8.98a1.499 1.499 0 0 1 0 2.94c-.47.09-.8.5-.8.98V18c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-3.55c0-.48-.33-.89-.8-.98a1.499 1.499 0 0 1 0-2.94c.47-.09.8-.5.8-.98V6c0-.55-.45-1-1-1m-1 3.84c-1.2.57-2 1.79-2 3.16s.8 2.59 2 3.16V17h-4v-2h-1v2H4v-1.84c1.2-.57 2-1.79 2-3.16s-.8-2.59-2-3.16V7h11v1h1V7h4z"></path>
                            <path d="M15 9h1v2h-1zm0 3h1v2h-1z"></path>
                        </svg>
                        <span>Pengingat</span>
                    </a>
                    <a href="/user/profile/diikuti" className="flex items-center gap-3 text-gray-300 hover:text-[#FBADCC] transition-colors p-3 rounded-xl hover:bg-[#272727]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
                        </svg>
                        <span>Profil</span>
                    </a>
                </div>
            )}
        </nav>
    )
}