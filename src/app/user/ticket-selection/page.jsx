
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TicketHeader from "./components/TicketHeader";
import SeatMap from "./components/SeatMap";
import TicketSidebar from "./components/TicketSidebar";
import BottomCheckout from "./components/BottomCheckout";
import { SEAT_INDEX } from "./data/venue";
import { formatRupiah } from "./utils/format";

export default function TicketSelectionPage() {
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [maxSeats, setMaxSeats] = useState(2);
  const [activeTier, setActiveTier] = useState(null);
  const [tab, setTab] = useState("seats");
  const [focus, setFocus] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  const selectedSeats = useMemo(
    () => selected.map((id) => SEAT_INDEX[id]).filter(Boolean),
    [selected]
  );

  const total = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  const toggleSeat = (seat) => {
    if (selected.includes(seat.id)) {
      setSelected((prev) => prev.filter((id) => id !== seat.id));
      return;
    }

    if (selected.length >= maxSeats) {
      setNotice(
        `Maksimal ${maxSeats} tiket. Ubah jumlah tiket untuk menambah kursi.`
      );
      return;
    }

    setSelected((prev) => [...prev, seat.id]);
  };

  const handleCountChange = (count) => {
    setMaxSeats(count);
    setSelected((prev) => prev.slice(0, count));
  };

  const focusSection = (id) => {
    setFocus({ id, time: Date.now() });
    setTab("sections");

    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCheckout = () => {
    if (!selected.length) return;

    router.push(
      `/user/checkout/ORD-20261009-8842?seats=${encodeURIComponent(selected.join(","))}`
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white pb-24">
      <TicketHeader />

      <div className="flex flex-col lg:flex-row">
        <main className="flex-1 min-w-0 p-3 sm:p-4">
          <div className="h-[62vh] min-h-[420px] lg:h-[calc(100vh-250px)]">
            <SeatMap
              selected={selected}
              onToggle={toggleSeat}
              focus={focus}
              activeTier={activeTier}
              onTierChange={setActiveTier}
              notice={notice}
            />
          </div>
        </main>

        <TicketSidebar
          selectedSeats={selectedSeats}
          maxSeats={maxSeats}
          onCountChange={handleCountChange}
          onRemove={(id) =>
            setSelected((prev) => prev.filter((seatId) => seatId !== id))
          }
          tab={tab}
          onTabChange={setTab}
          activeTier={activeTier}
          onFocusSection={focusSection}
        />
      </div>

      <BottomCheckout
        selectedSeats={selectedSeats}
        total={total}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
