// components/EO/StageLayoutPicker.jsx
"use client"

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

const stageLayouts = [
  {
    id: 'proscenium',
    name: 'Proscenium',
    description: 'Panggung tradisional dengan lengkung proscenium, penonton menghadap ke satu arah',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 60" fill="none">
        <rect x="5" y="15" width="90" height="30" rx="4" className="stroke-[#FBADCC] stroke-2" />
        <rect x="25" y="5" width="50" height="10" rx="2" className="fill-[#FBADCC]/20 stroke-[#FBADCC] stroke-2" />
        <path d="M5 15L25 5M95 15L75 5" className="stroke-[#FBADCC] stroke-2" />
        <rect x="10" y="45" width="80" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
      </svg>
    ),
    capacity: '500 - 3000',
    bestFor: ['Konser', 'Teater', 'Konferensi']
  },
  {
    id: 'thrust',
    name: 'Thrust',
    description: 'Panggung yang menjorok ke tengah penonton, penonton di 3 sisi',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 60" fill="none">
        <rect x="10" y="15" width="80" height="30" rx="4" className="stroke-[#FBADCC] stroke-2" />
        <rect x="30" y="5" width="40" height="10" rx="2" className="fill-[#FBADCC]/20 stroke-[#FBADCC] stroke-2" />
        <path d="M30 5L10 15M70 5L90 15" className="stroke-[#FBADCC] stroke-2" />
        <rect x="5" y="45" width="25" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="35" y="45" width="30" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="70" y="45" width="25" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
      </svg>
    ),
    capacity: '300 - 2000',
    bestFor: ['Konser', 'Acara Musik', 'Pertunjukan']
  },
  {
    id: 'arena',
    name: 'Arena',
    description: 'Panggung di tengah dengan penonton melingkar di semua sisi',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 60" fill="none">
        <circle cx="50" cy="25" r="20" className="stroke-[#FBADCC] stroke-2" />
        <circle cx="50" cy="25" r="12" className="fill-[#FBADCC]/20 stroke-[#FBADCC] stroke-2" />
        <rect x="20" y="45" width="15" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="40" y="45" width="20" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="65" y="45" width="15" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
      </svg>
    ),
    capacity: '200 - 1500',
    bestFor: ['Konser', 'Festival', 'Pertunjukan Interaktif']
  },
  {
    id: 'theater',
    name: 'Theater in the Round',
    description: 'Panggung melingkar dengan penonton mengelilingi secara 360 derajat',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 60" fill="none">
        <circle cx="50" cy="25" r="18" className="stroke-[#FBADCC] stroke-2" />
        <circle cx="50" cy="25" r="8" className="fill-[#FBADCC]/20 stroke-[#FBADCC] stroke-2" />
        <rect x="15" y="8" width="10" height="10" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="75" y="8" width="10" height="10" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="15" y="37" width="10" height="10" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="75" y="37" width="10" height="10" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
      </svg>
    ),
    capacity: '100 - 1000',
    bestFor: ['Pertunjukan Intim', 'Konser Akustik', 'Teater']
  },
  {
    id: 'catwalk',
    name: 'Catwalk',
    description: 'Panggung memanjang dengan penonton di kedua sisi panjang',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 60" fill="none">
        <rect x="5" y="20" width="90" height="20" rx="2" className="stroke-[#FBADCC] stroke-2" />
        <rect x="35" y="10" width="30" height="10" rx="2" className="fill-[#FBADCC]/20 stroke-[#FBADCC] stroke-2" />
        <rect x="5" y="45" width="40" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
        <rect x="55" y="45" width="40" height="8" rx="2" className="fill-[#FBADCC]/10 stroke-[#FBADCC] stroke-2" />
      </svg>
    ),
    capacity: '400 - 2500',
    bestFor: ['Fashion Show', 'Konser', 'Brand Event']
  }
]

export default function StageLayoutPicker() {
  const [selectedLayout, setSelectedLayout] = useState('proscenium')
  const [isExpanded, setIsExpanded] = useState(true)

  const selected = stageLayouts.find(layout => layout.id === selectedLayout)

  return (
    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333]">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Tata Letak Panggung
          <span className="text-xs text-gray-400 font-normal bg-[#1a1a1a] px-2 py-1 rounded-full">
            {selected?.name}
          </span>
        </h2>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {selected && (
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {selected.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#FBADCC]">{selected.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{selected.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-[#272727] px-2 py-1 rounded-full text-gray-300">
                      Kapasitas: {selected.capacity}
                    </span>
                    {selected.bestFor.map((item) => (
                      <span 
                        key={item}
                        className="text-xs bg-[#FBADCC]/10 px-2 py-1 rounded-full text-[#FBADCC]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stageLayouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  selectedLayout === layout.id
                    ? 'border-[#FBADCC] bg-[#FBADCC]/10 shadow-lg shadow-[#E21D8F]/10'
                    : 'border-[#333] bg-[#1a1a1a] hover:border-[#555]'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {layout.icon}
                  <p className="text-xs font-medium">{layout.name}</p>
                  {selectedLayout === layout.id && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-[#FBADCC] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 bg-[#1a1a1a] rounded-xl p-3">
            <div>
              <span className="block font-medium text-white mb-1">Tips Memilih:</span>
              <ul className="space-y-1 list-disc list-inside">
                <li>Sesuaikan dengan genre acara</li>
                <li>Pertimbangkan interaksi dengan penonton</li>
                <li>Perhatikan kapasitas venue</li>
              </ul>
            </div>
            <div>
              <span className="block font-medium text-white mb-1">Rekomendasi:</span>
              <ul className="space-y-1 list-disc list-inside">
                <li>Konser: {stageLayouts.filter(l => l.bestFor.includes('Konser')).map(l => l.name).join(', ')}</li>
                <li>Festival: {stageLayouts.filter(l => l.bestFor.includes('Festival')).map(l => l.name).join(', ')}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}