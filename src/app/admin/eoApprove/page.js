"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useState } from "react"

export default function SuperAdminApproveEO() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const eoRegistrations = [
        {
            id: 1,
            name: "Creative Events",
            email: "creative@events.com",
            phone: "+62 812 3456 7890",
            company: "Creative Events Corp",
            address: "Jl. Sudirman No. 45, Jakarta",
            status: "Pending",
            submitted: "3 days ago",
            documents: "Business License, NPWP",
            description: "Professional event organizer with 5+ years experience in concerts and festivals"
        },
        {
            id: 2,
            name: "Concert Pro",
            email: "info@concertpro.com",
            phone: "+62 813 4567 8901",
            company: "Concert Pro International",
            address: "Jl. Gatot Subroto No. 12, Bandung",
            status: "Pending",
            submitted: "1 week ago",
            documents: "Business License, SIUP, NPWP",
            description: "Specializing in large-scale concerts and music festivals across Indonesia"
        },
        {
            id: 3,
            name: "Festival Organizer",
            email: "hello@festival.com",
            phone: "+62 814 5678 9012",
            company: "Festival Organizer Group",
            address: "Jl. Diponegoro No. 78, Surabaya",
            status: "Pending",
            submitted: "2 weeks ago",
            documents: "Business License, NPWP",
            description: "Leading festival organizer with international experience"
        },
        {
            id: 4,
            name: "Music Entertainment",
            email: "info@musicent.com",
            phone: "+62 815 6789 0123",
            company: "Music Entertainment Ltd",
            address: "Jl. Pahlawan No. 23, Yogyakarta",
            status: "Approved",
            submitted: "3 weeks ago",
            documents: "Business License, NPWP, SIUP",
            description: "Entertainment company focused on music events and artist management"
        },
        {
            id: 5,
            name: "Event Planner Pro",
            email: "contact@eventplanner.com",
            phone: "+62 816 7890 1234",
            company: "Event Planner Pro",
            address: "Jl. Malioboro No. 56, Yogyakarta",
            status: "Rejected",
            submitted: "1 month ago",
            documents: "Business License",
            description: "Event planning service for corporate and private events"
        },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-500/20 text-yellow-400"
            case "Approved": return "bg-green-500/20 text-green-400"
            case "Rejected": return "bg-red-500/20 text-red-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    const filteredEO = eoRegistrations.filter(eo => {
        const matchesSearch = eo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eo.company.toLowerCase().includes(searchTerm.toLowerCase())
        if (activeTab === "all") return matchesSearch
        return matchesSearch && eo.status === activeTab
    })

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Approve Form Register EO</h1>
                            <p className="text-gray-400 text-sm mt-1">Approve or reject event organizer registration</p>
                        </div>
                        <button className="px-4 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Export
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex bg-[#272727] rounded-xl p-1 border border-[#333]">
                            <button onClick={() => setActiveTab("all")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "all" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>All</button>
                            <button onClick={() => setActiveTab("pending")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "pending" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Pending</button>
                            <button onClick={() => setActiveTab("approved")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "approved" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Approved</button>
                            <button onClick={() => setActiveTab("rejected")} className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${activeTab === "rejected" ? "bg-[#FBADCC] text-black" : "text-gray-400 hover:text-white"}`}>Rejected</button>
                        </div>
                        <input type="text" placeholder="Search EO..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm flex-1 min-w-[200px]" />
                    </div>

                    <div className="space-y-4">
                        {filteredEO.map((eo) => (
                            <div
                                key={eo.id}
                                className="bg-[#272727] rounded-2xl p-6 border border-[#333] hover:border-[#FBADCC]/30 transition-all hover:scale-[1.005]"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-full bg-[#FBADCC] flex items-center justify-center text-2xl font-bold text-black">
                                            {eo.name.charAt(0)}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-xl font-bold">{eo.name}</h3>
                                                <p className="text-sm text-gray-400">{eo.company}</p>
                                            </div>
                                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(eo.status)}`}>
                                                {eo.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Email</p>
                                                <p className="text-sm">{eo.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Phone</p>
                                                <p className="text-sm">{eo.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Address</p>
                                                <p className="text-sm">{eo.address}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Submitted</p>
                                                <p className="text-sm">{eo.submitted}</p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-xs text-gray-400">Description</p>
                                                <p className="text-sm">{eo.description}</p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-xs text-gray-400">Documents</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {eo.documents.split(", ").map((doc, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs flex px-2 py-1 gap-2 rounded-full bg-[#1a1a1a] border border-[#333]"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor" viewBox="0 0 24 24" >
                                                                <path d="m19.94 7.68-.03-.09a.8.8 0 0 0-.2-.29l-5-5c-.09-.09-.19-.15-.29-.2l-.09-.03a.8.8 0 0 0-.26-.05c-.02 0-.04-.01-.06-.01H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12s-.01-.04-.01-.06c0-.09-.02-.17-.05-.26ZM6 20V4h7v4c0 .55.45 1 1 1h4v11z"></path><path d="M8 11h8v2H8zm0 4h8v2H8zm0-8h3v2H8z"></path>
                                                            </svg> {doc}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-5 pt-4 border-t border-[#333]">
                                            {eo.status === "Pending" ? (
                                                <a href="eoApprove/[id]">
                                                    <button className="px-6 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#333] transition-colors">
                                                        View Details
                                                    </button>
                                                </a>
                                            ) : (
                                                <>
                                                    <button className="px-6 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#333] transition-colors">
                                                        View Details
                                                    </button>
                                                    {eo.status === "Rejected" && (
                                                        <button className="px-6 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#333] transition-colors">
                                                            Re-apply
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredEO.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold mb-2">No registrations found</h3>
                            <p className="text-gray-400">No EO registrations match your current filter</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-400">Showing {filteredEO.length} of {eoRegistrations.length} registrations</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Previous</button>
                            <button className="px-4 py-2 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black">1</button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">2</button>
                            <button className="px-4 py-2 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}