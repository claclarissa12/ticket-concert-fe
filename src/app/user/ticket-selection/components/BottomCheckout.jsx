
import { formatRupiah } from "../utils/format";

export default function BottomCheckout({
  selectedSeats,
  total,
  onCheckout,
}) {
  const canCheckout = selectedSeats.length > 0;

  const seatLabels = selectedSeats.map((seat) =>
    `${seat.sectionLabel.replace("SUITE BOX", "BOX").replace("FLOOR ", "")} ${seat.row}${seat.num}`
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-md border-t border-[#333]">
      <div className="px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs text-gray-500">
            {canCheckout
              ? `${selectedSeats.length} kursi dipilih`
              : "Pilih kursi pada peta"}
          </p>
          <p className="text-sm font-semibold truncate">
            {canCheckout ? seatLabels.join(", ") : "—"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {canCheckout && (
            <p className="hidden sm:block text-sm font-bold">
              {formatRupiah(total)}
            </p>
          )}

          <button
            onClick={onCheckout}
            disabled={!canCheckout}
            className={`px-5 sm:px-8 py-3 rounded-xl text-sm font-semibold whitespace-nowrap ${
              canCheckout
                ? "bg-[#FBADCC] text-black hover:bg-[#f8a0c4]"
                : "bg-[#272727] text-gray-500 cursor-not-allowed"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
