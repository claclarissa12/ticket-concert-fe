
"use client";

import { memo } from "react";
import { TIERS, PITCH, SEAT } from "../data/venue";
import { shortPrice } from "../utils/format";

function SectionLayer({
  section,
  level,
  selected,
  dimmed,
  onSeat,
  onHover,
  onSection,
}) {
  const tier = TIERS[section.tier];
  const isSuite = section.tier === "suite";
  const cx = section.x + section.w / 2;
  const cy = section.y + section.h / 2;

  return (
    <g style={{ opacity: dimmed ? 0.2 : 1 }}>
      <rect
        x={section.x - 5}
        y={section.y - 5}
        width={section.w + 10}
        height={section.h + 10}
        rx={6}
        fill={tier.color}
        fillOpacity={level === 0 ? 0.92 : 0.1}
        stroke={tier.color}
        strokeWidth={0.7}
        style={{
          cursor: level === 0 ? "pointer" : "default",
          pointerEvents: dimmed ? "none" : "auto",
        }}
        onClick={() => level === 0 && onSection(section)}
        onPointerMove={(e) => onHover({ section }, e)}
        onPointerLeave={() => onHover(null)}
      />

      {level === 0 && (
        <g pointerEvents="none" fill="#0d0d0d" textAnchor="middle">
          <text
            x={cx}
            y={cy + (isSuite ? 0 : 6)}
            fontSize={isSuite ? 11 : 22}
            fontWeight="bold"
          >
            {section.short}
          </text>
          <text
            x={cx}
            y={cy + (isSuite ? 13 : 22)}
            fontSize={isSuite ? 8 : 10}
          >
            {shortPrice(section.price)}
          </text>
        </g>
      )}

      {level > 0 && (
        <>
          {Array.from({ length: section.rows }, (_, r) => (
            <text
              key={r}
              x={section.x - 8}
              y={section.y + r * PITCH + 9}
              fontSize={6}
              fill="#999"
              textAnchor="end"
              pointerEvents="none"
            >
              {String.fromCharCode(65 + r)}
            </text>
          ))}

          {section.seats.map((seat) => {
            const isSelected = selected.includes(seat.id);

            return (
              <g key={seat.id}>
                <rect
                  x={seat.x}
                  y={seat.y}
                  width={SEAT}
                  height={SEAT}
                  rx={2}
                  fill={
                    seat.sold
                      ? "#303030"
                      : isSelected
                        ? "#FBADCC"
                        : tier.color
                  }
                  stroke={isSelected ? "#fff" : "none"}
                  style={{
                    cursor: seat.sold ? "not-allowed" : "pointer",
                  }}
                  onClick={() => !seat.sold && onSeat(seat)}
                  onPointerMove={(e) => onHover({ seat }, e)}
                  onPointerLeave={() => onHover(null)}
                />

                {level === 2 && !seat.sold && (
                  <text
                    x={seat.x + SEAT / 2}
                    y={seat.y + SEAT / 2 + 2}
                    fontSize={5.5}
                    textAnchor="middle"
                    fill="#111"
                    pointerEvents="none"
                  >
                    {seat.num}
                  </text>
                )}
              </g>
            );
          })}
        </>
      )}
    </g>
  );
}

export default memo(SectionLayer);
