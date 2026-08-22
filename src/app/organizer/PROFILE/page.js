"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function OrganizerProfile() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Profile</h1>
                            <p className="text-gray-400 text-sm mt-1">Manage your organizer profile information</p>
                        </div>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                            Save Changes
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Full Name</label>
                                        <input 
                                            type="text" 
                                            value="Event Organizer" 
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Email Address</label>
                                        <input 
                                            type="email" 
                                            value="admin@organizer.com" 
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            value="+62 812 3456 7890" 
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Company Name</label>
                                        <input 
                                            type="text" 
                                            value="Event Organizer Corp" 
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Company Address</label>
                                        <input 
                                            type="text" 
                                            value="Jl. Margonda Raya No. 45, Depok, Jawa Barat" 
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Bio & Description</h2>
                                <textarea 
                                    rows={4} 
                                    placeholder="Tell about your organizer company..." 
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors resize-none"
                                >
                                    Professional event organizer with 5+ years of experience in concerts, festivals, and corporate events.
                                </textarea>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Social Media</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Instagram</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-sm">@</span>
                                            <input 
                                                type="text" 
                                                value="eventorganizer" 
                                                className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Twitter</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-sm">@</span>
                                            <input 
                                                type="text" 
                                                value="eventorg" 
                                                className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Website</label>
                                        <input 
                                            type="url" 
                                            value="https://organizer.com" 
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] flex items-center justify-center text-5xl font-bold text-black mx-auto">
                                        EO
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#E21D8F] flex items-center justify-center hover:bg-[#FBADCC] transition-colors border-2 border-[#131313]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                <h3 className="text-lg font-semibold mt-4">Event Organizer</h3>
                                <p className="text-sm text-gray-400">admin@organizer.com</p>
                                <div className="mt-3">
                                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">Verified</span>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Account Stats</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Total Events</span>
                                        <span className="font-bold">12</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Total Revenue</span>
                                        <span className="font-bold text-[#FBADCC]">Rp 4.2B</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Total Attendees</span>
                                        <span className="font-bold">7,891</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Member Since</span>
                                        <span className="font-bold">2024</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                                        </svg>
                                        Change Password
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                        Two-Factor Authentication
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-red-500/10 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}