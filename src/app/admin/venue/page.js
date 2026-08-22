"use client"

import { useState } from "react"
import StageLayoutPicker from "@/components/EO/stageLayout"
import SidebarAdmin from "@/components/admin/sidebarADM"

export default function Venue() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDesign, setSelectedDesign] = useState(null)

    const venueDesigns = [
        { id: 1, name: "Proscenium Stage", description: "Classic stage with arch frame" },
        { id: 2, name: "Thrust Stage", description: "Stage extends into audience" },
        { id: 3, name: "Arena Stage", description: "360° stage in the center" },
        { id: 4, name: "Theater in the Round", description: "Circular stage with audience all sides" },
        { id: 5, name: "Catwalk Stage", description: "Stage with extended runway" },
    ]

    const filteredDesigns = venueDesigns.filter(design =>
        design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="bg-[#131313] min-h-screen flex text-white">
            <SidebarAdmin />
            <div className="flex-1 overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Pilih Desain Venue</h1>
                            <p className="text-gray-400 mt-1">Pilih tata letak panggung untuk event Anda</p>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Cari desain venue..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2.5 bg-[#272727] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none transition-colors text-sm w-64"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                        {filteredDesigns.map((design) => (
                            <div
                                key={design.id}
                                onClick={() => setSelectedDesign(design.id)}
                                className={`bg-[#272727] rounded-xl p-4 border-2 transition-all cursor-pointer hover:scale-[1.02] ${
                                    selectedDesign === design.id
                                        ? 'border-[#FBADCC] shadow-lg shadow-[#FBADCC]/20'
                                        : 'border-[#333] hover:border-[#FBADCC]/30'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">{design.name}</h3>
                                        <p className="text-xs text-gray-400">{design.description}</p>
                                    </div>
                                    {selectedDesign === design.id && (
                                        <div className="w-3 h-3 rounded-full bg-[#FBADCC] flex-shrink-0"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <StageLayoutPicker />

                    <div className="mt-8 flex justify-end gap-3">
                        <button className="px-6 py-3 bg-[#272727] rounded-xl text-sm hover:bg-[#333] transition-colors border border-[#333]">
                            Batal
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-[#E21D8F] to-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                            Tambah   Design
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}