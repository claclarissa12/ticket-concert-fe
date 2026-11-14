"use client"

import OrganizerSidebar from "@/components/EO/sidebarEO"
import StageLayoutPicker from "@/components/EO/stageLayout"
import Link from "next/link"
import { useState } from "react"

export default function CreateEvent() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        venue: "",
        location: "",
        date: "",
        time: "",
        banner_url: "",
        status: "draft"
    })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            title: form.title,
            description: form.description,
            venue: form.venue,
            location: form.location,
            date: `${form.date} ${form.time}:00`,
            banner_url: form.banner_url,
            status: form.status,
            created_by: 1,
            created_at: new Date().toISOString()
        }
        console.log("Data siap dikirim ke API:", payload)
    }

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
                            <button onClick={handleSubmit} className="px-5 py-2.5 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
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
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange}
                                            placeholder="Enter event name"
                                            className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Venue</label>
                                            <input
                                                type="text"
                                                name="venue"
                                                value={form.venue}
                                                onChange={handleChange}
                                                placeholder="e.g. Hall A"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={form.location}
                                                onChange={handleChange}
                                                placeholder="e.g. Jakarta"
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={form.date}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400 block mb-1.5">Time</label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={form.time}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <StageLayoutPicker />

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Description</h2>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Describe your event..."
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Banner URL</h2>
                                <input
                                    type="url"
                                    name="banner_url"
                                    value={form.banner_url}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors"
                                />
                                <p className="text-xs text-gray-500 mt-2">Masukkan link gambar poster dari internet (maks 500 karakter)</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Event Status</h2>
                                <div className="space-y-3">
                                    <div 
                                        onClick={() => setForm(prev => ({ ...prev, status: 'draft' }))}
                                        className={`w-full px-4 py-3 rounded-xl border cursor-pointer transition-all ${form.status === 'draft' ? 'bg-[#FBADCC]/10 border-[#FBADCC]' : 'bg-[#1a1a1a] border-[#333]'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`font-medium ${form.status === 'draft' ? 'text-[#FBADCC]' : 'text-white'}`}>Draft</p>
                                                <p className="text-xs text-gray-400">Save as draft</p>
                                            </div>
                                            {form.status === 'draft' && <div className="w-3 h-3 rounded-full bg-[#FBADCC]"></div>}
                                        </div>
                                    </div>
                                    <div 
                                        onClick={() => setForm(prev => ({ ...prev, status: 'published' }))}
                                        className={`w-full px-4 py-3 rounded-xl border cursor-pointer transition-all ${form.status === 'published' ? 'bg-[#FBADCC]/10 border-[#FBADCC]' : 'bg-[#1a1a1a] border-[#333]'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`font-medium ${form.status === 'published' ? 'text-[#FBADCC]' : 'text-white'}`}>Published</p>
                                                <p className="text-xs text-gray-400">Live and visible</p>
                                            </div>
                                            {form.status === 'published' && <div className="w-3 h-3 rounded-full bg-[#FBADCC]"></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}