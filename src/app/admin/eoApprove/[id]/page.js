"use client"

import SidebarAdmin from "@/components/admin/sidebarADM"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SuperAdminDetailEO() {
    const params = useParams()
    const id = params.id

    // Data dummy - nanti diganti dengan fetch dari API
    const eoData = {
        id: 1,
        name: "Creative Events",
        email: "creative@events.com",
        phone: "+62 812 3456 7890",
        company: "Creative Events Corp",
        address: "Jl. Sudirman No. 45, Jakarta",
        status: "Pending",
        submitted: "3 days ago",
        documents: ["Business License", "NPWP", "SIUP"],
        description: "Professional event organizer with 5+ years experience in concerts and festivals. We have successfully organized over 100 events across Indonesia.",
        website: "https://creativeevents.com",
        instagram: "@creativeevents",
        bankName: "Bank Central Asia (BCA)",
        bankAccount: "1234567890",
        bankHolder: "Creative Events Corp",
        eventsCreated: 12,
        totalRevenue: "Rp 4.2B",
        totalAttendees: "7,891",
        memberSince: "2024",
        verificationStatus: "Verified",
        documentsList: [
            { name: "Business License", file: "business_license.pdf", size: "2.4 MB", status: "Verified" },
            { name: "NPWP", file: "npwp.pdf", size: "1.8 MB", status: "Verified" },
            { name: "SIUP", file: "siup.pdf", size: "3.2 MB", status: "Pending" },
            { name: "Bank Statement", file: "bank_statement.pdf", size: "1.5 MB", status: "Pending" },
        ],
        activityLog: [
            { action: "Registered as EO", date: "15 Mar 2026, 14:30" },
            { action: "Uploaded documents", date: "16 Mar 2026, 09:15" },
            { action: "Created first event", date: "20 Mar 2026, 11:00" },
            { action: "Event approved", date: "22 Mar 2026, 16:45" },
        ]
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-500/20 text-yellow-400"
            case "Approved": return "bg-green-500/20 text-green-400"
            case "Rejected": return "bg-red-500/20 text-red-400"
            case "Verified": return "bg-green-500/20 text-green-400"
            default: return "bg-gray-500/20 text-gray-400"
        }
    }

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <Link href="/admin/eoApprove" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Link>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">EO Registration Details</h1>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{eoData.company}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {eoData.status === "Pending" && (
                                <>
                                    <button className="px-5 py-2.5 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/30 transition-colors">
                                        ✅ Approve
                                    </button>
                                    <button className="px-5 py-2.5 bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/30 transition-colors">
                                        ❌ Reject
                                    </button>
                                </>
                            )}
                            <button className="px-5 py-2.5 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                                Export Data
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Info */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <div className="flex items-start gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] flex items-center justify-center text-3xl font-bold text-black flex-shrink-0">
                                        {eoData.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-2xl font-bold">{eoData.name}</h2>
                                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(eoData.status)}`}>
                                                {eoData.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-400">{eoData.company}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Email</p>
                                                <p className="text-sm">{eoData.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Phone</p>
                                                <p className="text-sm">{eoData.phone}</p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-xs text-gray-400">Address</p>
                                                <p className="text-sm">{eoData.address}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Website</p>
                                                <p className="text-sm text-[#FBADCC]">{eoData.website}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Instagram</p>
                                                <p className="text-sm text-[#FBADCC]">{eoData.instagram}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-3">Description</h2>
                                <p className="text-gray-300">{eoData.description}</p>
                            </div>

                            {/* Bank Information */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-3">Bank Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-400">Bank Name</p>
                                        <p className="text-sm font-medium">{eoData.bankName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Account Number</p>
                                        <p className="text-sm font-medium">{eoData.bankAccount}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Account Holder</p>
                                        <p className="text-sm font-medium">{eoData.bankHolder}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-3">Documents</h2>
                                <div className="space-y-3">
                                    {eoData.documentsList.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm font-medium">{doc.name}</p>
                                                    <p className="text-xs text-gray-400">{doc.file} • {doc.size}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                                                    {doc.status}
                                                </span>
                                                <button className="px-3 py-1.5 bg-[#272727] rounded-lg text-xs hover:bg-[#333] transition-colors">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Statistics</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Events Created</span>
                                        <span className="font-bold">{eoData.eventsCreated}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Total Revenue</span>
                                        <span className="font-bold text-[#FBADCC]">{eoData.totalRevenue}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Total Attendees</span>
                                        <span className="font-bold">{eoData.totalAttendees}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Member Since</span>
                                        <span className="font-bold">{eoData.memberSince}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded-xl">
                                        <span className="text-sm text-gray-400">Verification</span>
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(eoData.verificationStatus)}`}>
                                            {eoData.verificationStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Log */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Activity Log</h2>
                                <div className="space-y-3">
                                    {eoData.activityLog.map((log, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2">
                                            <div className="w-2 h-2 rounded-full bg-[#FBADCC] mt-1.5"></div>
                                            <div>
                                                <p className="text-sm">{log.action}</p>
                                                <p className="text-xs text-gray-400">{log.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
                                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Email
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222] transition-colors border border-[#333] flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        View Profile
                                    </button>
                                    <button className="w-full px-4 py-2.5 bg-red-500/10 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Suspend Account
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