
"use client";

import { VENUE, TIERS } from "../data/venue";
import { formatRupiah, shortPrice } from "../utils/format";

export default function TicketSidebar({
  selectedSeats,
  maxSeats,
  onCountChange,
  onRemove,
  tab,
  onTabChange,
  activeTier,
  onFocusSection,
}) {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const sections = VENUE.filter(
    (section) => activeTier === null || section.tier === activeTier
  );

  return (
    <aside className="w-full lg:w-[400px] bg-[#1a1a1a] border-t lg:border-t-0 lg:border-l border-[#333] p-5">
      <label className="block text-xs text-gray-400 mb-1.5">
        Jumlah tiket
      </label>

      <select
        value={maxSeats}
        onChange={(e) => onCountChange(Number(e.target.value))}
        className="w-full bg-[#272727] border border-[#333] rounded-lg px-4 py-2.5 text-sm mb-5"
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <option key={n} value={n}>
            {n} Tiket
          </option>
        ))}
      </select>

      <div className="flex border-b border-[#333] mb-4">
        <button
          onClick={() => onTabChange("seats")}
          className={`flex-1 pb-3 text-xs font-semibold ${
            tab === "seats"
              ? "text-white border-b-2 border-[#FBADCC]"
              : "text-gray-400"
          }`}
        >
          Kursi dipilih ({selectedSeats.length}/{maxSeats})
        </button>

        <button
          onClick={() => onTabChange("sections")}
          className={`flex-1 pb-3 text-xs font-semibold ${
            tab === "sections"
              ? "text-white border-b-2 border-[#FBADCC]"
              : "text-gray-400"
          }`}
        >
          Daftar section
        </button>
      </div>

      {tab === "seats" ? (
        <div className="space-y-3">
          {selectedSeats.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#3a3a3a] p-6 text-center">
              <p className="text-sm font-semibold mb-1">
                Belum ada kursi dipilih
              </p>
              <p className="text-xs text-gray-400">
                Zoom peta, lalu pilih kursi yang tersedia.
              </p>
            </div>
          )}

          {selectedSeats.map((seat) => (
            <div
              key={seat.id}
              className="flex items-center gap-3 bg-[#272727] border border-[#FBADCC]/40 rounded-xl p-3"
            >
              <span className="w-3 h-3 rounded-sm bg-[#FBADCC] shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {seat.sectionLabel}
                </p>
                <p className="text-xs text-gray-400">
                  Baris {seat.row} • Kursi {seat.num}
                </p>
              </div>

              <p className="text-sm font-bold text-[#FBADCC]">
                {formatRupiah(seat.price)}
              </p>

              <button
                onClick={() => onRemove(seat.id)}
                aria-label={`Hapus kursi ${seat.row}${seat.num}`}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}

          {selectedSeats.length > 0 && (
            <div className="flex items-center justify-between pt-3 border-t border-[#333]">
              <span className="text-sm text-gray-400">Total</span>
              <span className="font-bold">{formatRupiah(total)}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2 max-h-[450px] overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onFocusSection(section.id)}
              className="w-full flex items-center gap-3 bg-[#272727] border border-[#333] hover:border-[#FBADCC]/40 rounded-xl p-3 text-left"
            >
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ background: TIERS[section.tier].color }}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{section.label}</p>
                <p className="text-xs text-gray-400">
                  {section.available} kursi tersedia
                </p>
              </div>

              <p className="text-sm font-bold">
                {shortPrice(section.price)}
              </p>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
