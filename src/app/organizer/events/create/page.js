"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import StageLayoutPicker from "@/components/EO/stageLayout"
import Link from "next/link"

export default function CreateEvent() {
    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <OrganizerSidebar />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create Event</h1>
                            <p className="text-gray-400 text-sm mt-1">Create a new event for your audience</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/organizer/events" className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Cancel
                            </Link>
                            <button className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                                Save Event
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
                                        <input
                                            type="text"
                                            placeholder="Enter event name"
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Category</label>
                                            <select className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors">
                                                <option value="">Select Category</option>
                                                <option value="Concert">Concert</option>
                                                <option value="Festival">Festival</option>
                                                <option value="Conference">Conference</option>
                                                <option value="Exhibition">Exhibition</option>
                                                <option value="Sports">Sports</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Genre</label>
                                            <select className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors">
                                                <option value="">Select Genre</option>
                                                <option value="Pop">Pop</option>
                                                <option value="Rock">Rock</option>
                                                <option value="Electronic">Electronic</option>
                                                <option value="Jazz">Jazz</option>
                                                <option value="Hip Hop">Hip Hop</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Time</label>
                                            <input
                                                type="time"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Location</label>
                                        <input
                                            type="text"
                                            placeholder="Venue name"
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Address</label>
                                        <input
                                            type="text"
                                            placeholder="Complete address"
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                            <StageLayoutPicker />

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Description</h2>
                                <textarea
                                    rows={5}
                                    placeholder="Describe your event..."
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Poster</h2>
                                <div className="border-2 border-dashed border-[#333] rounded-xl p-8 text-center hover:border-[#FBADCC] transition-colors cursor-pointer">
                                    <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-400 text-sm mt-2">Click or drag to upload poster</p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP (Max 5MB)</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Status</h2>
                                <div className="space-y-3">
                                    <div className="w-full px-4 py-3 bg-[#FBADCC]/10 rounded-xl border border-[#FBADCC]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-[#FBADCC]">Draft</p>
                                                <p className="text-xs text-gray-400">Save as draft</p>
                                            </div>
                                            <div className="w-3 h-3 rounded-full bg-[#FBADCC]"></div>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-white">Published</p>
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
                                        <input
                                            type="number"
                                            placeholder="Total capacity"
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-1.5">Ticket Price</label>
                                        <input
                                            type="number"
                                            placeholder="Price per ticket"
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm text-[#FBADCC] hover:bg-[#222] transition-colors border border-[#333]">
                                        + Add Ticket Tier
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        Save as Template
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        Share Event
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Preview Event
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