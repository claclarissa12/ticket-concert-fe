"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import Link from "next/link"

export default function EditEvent() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar/>
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <Link href="/organizer/events" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </Link>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Edit Event</h1>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">Update event details - Nassar Tour 2026</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/organizer/events" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Cancel
                            </Link>
                            <button className="px-5 py-2.5 bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                Update Event
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Event Name</label>
                                        <input type="text" value="Nassar Tour 2026" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Category</label>
                                            <select className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none">
                                                <option>Concert</option>
                                                <option>Festival</option>
                                                <option>Conference</option>
                                                <option>Exhibition</option>
                                                <option>Sports</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Genre</label>
                                            <select className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none">
                                                <option>Pop</option>
                                                <option>Rock</option>
                                                <option>Electronic</option>
                                                <option>Jazz</option>
                                                <option>Hip Hop</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Date</label>
                                            <input type="date" value="2026-05-20" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Time</label>
                                            <input type="time" value="19:00" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Location</label>
                                        <input type="text" value="Jakarta International Stadium" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Address</label>
                                        <input type="text" value="Jl. Margonda Raya No. 45, Depok, Jawa Barat" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Description</h2>
                                <textarea rows={5} className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none resize-none">
                                    Nassar Tour 2026 is the biggest concert event of the year featuring top artists from around the world. Join us for an unforgettable night of music and entertainment.
                                </textarea>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Poster</h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-32 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200" className="w-full h-full object-cover"/>
                                    </div>
                                    <div>
                                        <button className="px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333]">
                                            Change Poster
                                        </button>
                                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, WebP (Max 5MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Status</h2>
                                <div className="space-y-3">
                                    <div className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Draft</p>
                                                <p className="text-xs text-gray-400">Save as draft</p>
                                            </div>
                                            <div className="w-3 h-3 rounded-full bg-[#FBADCC]"></div>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] hover:bg-[#222] transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Published</p>
                                                <p className="text-xs text-gray-400">Live and visible</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Pricing & Capacity</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Capacity</label>
                                        <input type="number" value="1000" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Ticket Price</label>
                                        <input type="number" value="500000" className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"/>
                                    </div>
                                    <Link href="/organizer/events/1/tickets" className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                                        </svg>
                                        Manage Ticket Tiers
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2.5 bg-red-500/10 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        Delete Event
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