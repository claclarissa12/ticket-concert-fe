
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionLayer from "./SectionLayer";
import { VENUE, W, H } from "../data/venue";
import { formatRupiah } from "../utils/format";

const clamp = (view) => ({
  k: Math.max(1, Math.min(9, view.k)),
  x: Math.min(0, Math.max(W - W * view.k, view.x)),
  y: Math.min(0, Math.max(H - H * view.k, view.y)),
});

export default function SeatMap({
  selected,
  onToggle,
  focus,
  activeTier,
  onTierChange,
  notice,
}) {
  const wrapRef = useRef(null);
  const drag = useRef({ pointers: new Map(), moved: false, start: null, pinch: 0 });
  const [view, setView] = useState({ k: 1, x: 0, y: 0 });
  const [hover, setHover] = useState(null);

  const level = view.k < 2.4 ? 0 : view.k < 5 ? 1 : 2;

  const zoom = useCallback((factor, point = { x: W / 2, y: H / 2 }) => {
    setView((v) => {
      const k = Math.max(1, Math.min(9, v.k * factor));
      const ratio = k / v.k;

      return clamp({
        k,
        x: point.x - (point.x - v.x) * ratio,
        y: point.y - (point.y - v.y) * ratio,
      });
    });
  }, []);

  const focusSection = useCallback((section) => {
    const k = Math.min(
      6,
      W / (section.w + 80),
      H / (section.h + 80)
    );
    const scale = Math.max(2.6, k);

    setView(
      clamp({
        k: scale,
        x: W / 2 - (section.x + section.w / 2) * scale,
        y: H / 2 - (section.y + section.h / 2) * scale,
      })
    );
  }, []);

  useEffect(() => {
    if (!focus) return;
    const section = VENUE.find((s) => s.id === focus.id);
    if (section) focusSection(section);
  }, [focus, focusSection]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      zoom(Math.exp(-e.deltaY * 0.002), {
        x: ((e.clientX - rect.left) / rect.width) * W,
        y: ((e.clientY - rect.top) / rect.height) * H,
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom]);

  useEffect(() => {
    const move = (e) => {
      const d = drag.current;
      if (!d.pointers.has(e.pointerId)) return;

      const prev = d.pointers.get(e.pointerId);
      const current = { x: e.clientX, y: e.clientY };
      const el = wrapRef.current;
      if (!el) return;

      if (d.pointers.size >= 2) {
        d.pointers.set(e.pointerId, current);
        const [a, b] = [...d.pointers.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (d.pinch) zoom(distance / d.pinch);
        d.pinch = distance;
        d.moved = true;
        return;
      }

      if (
        !d.moved &&
        Math.hypot(
          current.x - d.start.x,
          current.y - d.start.y
        ) < 6
      ) return;

      d.moved = true;
      setHover(null);
      d.pointers.set(e.pointerId, current);

      const rect = el.getBoundingClientRect();

      setView((v) =>
        clamp({
          ...v,
          x: v.x + ((current.x - prev.x) / rect.width) * W,
          y: v.y + ((current.y - prev.y) / rect.height) * H,
        })
      );
    };

    const up = (e) => {
      const d = drag.current;
      d.pointers.delete(e.pointerId);
      if (d.pointers.size < 2) d.pinch = 0;
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [zoom]);

  const handlePointerDown = (e) => {
    if (e.target.closest("button")) return;

    const d = drag.current;
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    d.start = { x: e.clientX, y: e.clientY };
    d.moved = d.pointers.size > 1;
    if (d.pointers.size === 2) d.pinch = 0;
  };

  const handleSeat = (seat) => {
    if (!drag.current.moved) onToggle(seat);
  };

  const handleSection = (section) => {
    if (!drag.current.moved) focusSection(section);
  };

  const handleHover = (payload, e) => {
    if (!payload || drag.current.moved) {
      setHover(null);
      return;
    }

    const rect = wrapRef.current.getBoundingClientRect();

    setHover({
      ...payload,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: rect.width,
    });
  };

  return (
    <div
      ref={wrapRef}
      onPointerDown={handlePointerDown}
      className="relative w-full h-full overflow-hidden rounded-xl border border-[#2c2c2c] bg-[#131313] select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full">
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          <g pointerEvents="none">
            <rect
              x={420}
              y={36}
              width={360}
              height={70}
              rx={8}
              fill="#222"
              stroke="#4a4a4a"
            />
            <text
              x={600}
              y={78}
              textAnchor="middle"
              fontSize={22}
              fontWeight="bold"
              letterSpacing={8}
              fill="#aaa"
            >
              STAGE
            </text>
          </g>

          {VENUE.map((section) => (
            <SectionLayer
              key={section.id}
              section={section}
              level={level}
              selected={selected}
              dimmed={activeTier !== null && activeTier !== section.tier}
              onSeat={handleSeat}
              onHover={handleHover}
              onSection={handleSection}
            />
          ))}
        </g>
      </svg>

      <div
        className="absolute top-3 right-3 flex flex-col gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => zoom(1.6)}
          className="w-10 h-10 rounded-lg bg-[#272727] border border-[#3a3a3a]"
          aria-label="Perbesar"
        >
          +
        </button>
        <button
          onClick={() => zoom(1 / 1.6)}
          className="w-10 h-10 rounded-lg bg-[#272727] border border-[#3a3a3a]"
          aria-label="Perkecil"
        >
          −
        </button>
        <button
          onClick={() => setView({ k: 1, x: 0, y: 0 })}
          className="w-10 h-10 rounded-lg bg-[#272727] border border-[#3a3a3a] text-xs"
          aria-label="Reset zoom"
        >
          Reset
        </button>
      </div>

      <div
        className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {Object.entries(
          (awaitable => awaitable)(/* tiers are imported below */ {})
        ).length > 0 && null}
      </div>

      {notice && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#FBADCC] text-black text-xs font-semibold rounded-lg px-4 py-2">
          {notice}
        </div>
      )}

      {hover && (
        <div
          className="absolute z-10 pointer-events-none bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg px-3 py-2 text-xs shadow-xl"
          style={{
            left: Math.max(4, Math.min(hover.x + 14, hover.w - 190)),
            top: hover.y + 14,
          }}
        >
          <p className="font-semibold">
            {hover.seat
              ? hover.seat.sectionLabel
              : hover.section.label}
          </p>
          {hover.seat ? (
            <>
              <p className="text-gray-400">
                Baris {hover.seat.row} • Kursi {hover.seat.num}
              </p>
              <p className="text-[#FBADCC] mt-1">
                {hover.seat.sold
                  ? "Sudah terjual"
                  : formatRupiah(hover.seat.price)}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-400">
                {hover.section.available} kursi tersedia
              </p>
              <p className="text-[#FBADCC] mt-1">
                {formatRupiah(hover.section.price)}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
