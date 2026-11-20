"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import UserNavbar from "@/components/layout/UserNavbar";
import { apiFetch } from "../../../../../lib/api.js";
import { formatRupiah } from "../utils/format";


const DEFAULT_MAX_PER_ORDER = 4;

const formatDate = (iso) =>
  new Date(iso).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }) + " WIB";

export default function TicketSelectionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [concert, setConcert] = useState(null);
  const [role, setRole] = useState(null);
  const [concertStarted, setConcertStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [counts, setCounts] = useState({}); // { [tierId]: quantity }
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const submittingRef = useRef(false); // blocks a second click before React re-renders

  const goLogin = useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
    router.replace("/login");
  }, [router]);

  // GET /concerts/:id  ->  res.data = { id, title, date, venue, location, banner_url, organizer, tiers: [...] }
  // every tier already has: price, quota, sold, available, sale_status ("on_sale" | "sold_out" | "upcoming" | "ended")
  const fetchConcert = useCallback(async () => {
    const res = await apiFetch(`/concerts/${id}`);
    const data = res.data;

    setConcert(data);
    setConcertStarted(new Date(data.date) <= new Date());

    // availability may have changed: never keep more tickets in the cart than are left
    setCounts((prev) => {
      const next = {};
      for (const tier of data.tiers ?? []) {
        const cap = tier.sale_status === "on_sale" ? tier.available : 0;
        const qty = Math.min(prev[tier.id] || 0, cap);
        if (qty > 0) next[tier.id] = qty;
      }
      return next;
    });

    return data;
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let token = null;
      let userRole = null;
      try {
        token = localStorage.getItem("token");
        userRole = JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
      } catch {}

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await fetchConcert();
        if (!cancelled) setRole(userRole);
      } catch (err) {
        if (!cancelled) setLoadError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchConcert, router]);

  const tiers = useMemo(
    () => [...(concert?.tiers ?? [])].sort((a, b) => a.price - b.price),
    [concert]
  );

  const maxPerOrder = Number(concert?.max_tickets_per_order) || DEFAULT_MAX_PER_ORDER;
  const totalQty = Object.values(counts).reduce((sum, q) => sum + q, 0);
  const totalPrice = tiers.reduce((sum, t) => sum + t.price * (counts[t.id] || 0), 0);

  // Only the "user" role can create orders (EO / admin get 403 from the backend).
  // role === null means we couldn't read it: let the backend decide.
  const canBuy = (role === null || role === "user") && !concertStarted;

  const changeQty = (tier, delta) => {
    setFormError("");
    setCounts((prev) => {
      const current = prev[tier.id] || 0;
      const inOtherTiers = Object.entries(prev).reduce(
        (sum, [tierId, q]) => (tierId === String(tier.id) ? sum : sum + q),
        0
      );
      const cap = Math.min(tier.available, maxPerOrder - inOtherTiers);
      const next = Math.max(0, Math.min(current + delta, cap));

      const copy = { ...prev };
      if (next === 0) delete copy[tier.id];
      else copy[tier.id] = next;
      return copy;
    });
  };

  // POST /orders  { concert_id, items: [{ ticket_tier_id, quantity }] }
  // The backend holds the tickets right away and answers with the new order (status "pending").
  const handleCheckout = async () => {
    if (submittingRef.current || totalQty === 0 || !canBuy) return;

    submittingRef.current = true;
    setSubmitting(true);
    setFormError("");

    try {
      const items = Object.entries(counts).map(([tierId, quantity]) => ({
        ticket_tier_id: Number(tierId),
        quantity,
      }));

      const res = await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({ concert_id: Number(id), items }),
      });

      // stay "submitting" while navigating so the button can't be clicked twice
      router.push(`/user/checkout/${res.data.id}`);
    } catch (err) {
      if (/token|access denied/i.test(err.message)) {
        goLogin();
        return;
      }
      setFormError(err.message); // e.g. "Not enough "VIP" tickets left (1 available)"
      submittingRef.current = false;
      setSubmitting(false);
      try {
        await fetchConcert(); // refresh the numbers shown on screen
      } catch {}
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
        <p className="text-sm text-gray-400">Memuat tiket...</p>
      </div>
    );
  }

  if (loadError || !concert) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-sm text-red-400">{loadError || "Konser tidak ditemukan."}</p>
        <Link href="/user/home" className="text-sm text-[#FBADCC] hover:underline">
          Kembali ke beranda
        </Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white pb-32">
      <UserNavbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/user/home" className="text-xs text-gray-400 hover:text-white">
          ← Kembali
        </Link>

        {/* concert header */}
        <div className="mt-4 flex items-start gap-4 rounded-2xl border border-[#333] bg-[#121212] p-4">
          {concert.banner_url ? (
            <img
              src={concert.banner_url}
              alt={concert.title}
              className="h-24 w-24 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-[#FBADCC] text-3xl font-bold text-black">
              {concert.title?.[0] ?? "T"}
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-snug">{concert.title}</h1>
            <p className="mt-1 text-sm text-gray-400">{formatDate(concert.date)}</p>
            <p className="text-sm text-gray-400">
              {[concert.venue, concert.location].filter(Boolean).join(", ")}
            </p>
            {concert.organizer?.name && (
              <p className="mt-1 text-xs text-gray-500">oleh {concert.organizer.name}</p>
            )}
          </div>
        </div>

        {concertStarted && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            Konser ini sudah dimulai atau selesai, tiket tidak bisa dibeli lagi.
          </div>
        )}

        {role && role !== "user" && (
          <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
            Hanya akun pengguna yang bisa membeli tiket. Masuk dengan akun pengguna untuk melanjutkan.
          </div>
        )}

        {/* tiers */}
        <div className="mt-6 mb-3 flex items-end justify-between">
          <h2 className="text-lg font-semibold">Pilih tiket</h2>
          <p className="text-xs text-gray-500">Maksimal {maxPerOrder} tiket per pesanan</p>
        </div>

        {tiers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#3a3a3a] p-8 text-center text-sm text-gray-400">
            Belum ada tiket yang dijual untuk konser ini.
          </div>
        ) : (
          <ul className="space-y-3">
            {tiers.map((tier) => {
              const qty = counts[tier.id] || 0;
              const onSale = tier.sale_status === "on_sale";

              let reason = "";
              if (tier.sale_status === "sold_out") reason = "Tiket habis";
              else if (tier.sale_status === "upcoming")
                reason = `Penjualan dibuka ${formatDate(tier.sale_start)}`;
              else if (tier.sale_status === "ended") reason = "Penjualan sudah ditutup";
              else if (tier.available <= 10) reason = `Sisa ${tier.available} tiket`;

              const canAdd =
                canBuy && onSale && qty < tier.available && totalQty < maxPerOrder;

              return (
                <li
                  key={tier.id}
                  className={`flex items-center gap-4 rounded-xl border p-4 ${
                    qty > 0
                      ? "border-[#FBADCC]/60 bg-[#272727]"
                      : "border-[#333] bg-[#222]"
                  } ${!onSale ? "opacity-60" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{tier.name}</p>
                    <p className="mt-0.5 text-base font-bold text-[#FBADCC]">
                      {formatRupiah(tier.price)}
                    </p>
                    {reason && (
                      <p
                        className={`mt-1 text-xs ${
                          onSale ? "text-yellow-400" : "text-gray-400"
                        }`}
                      >
                        {reason}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => changeQty(tier, -1)}
                      disabled={qty === 0 || submitting}
                      aria-label={`Kurangi tiket ${tier.name}`}
                      className="h-9 w-9 rounded-lg border border-[#3a3a3a] text-lg leading-none hover:border-[#FBADCC]/60 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(tier, 1)}
                      disabled={!canAdd || submitting}
                      aria-label={`Tambah tiket ${tier.name}`}
                      className="h-9 w-9 rounded-lg border border-[#3a3a3a] text-lg leading-none hover:border-[#FBADCC]/60 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {formError && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <p>{formError}</p>
            {/unpaid/i.test(formError) && (
              <Link href="/user/orders" className="mt-1 inline-block text-[#FBADCC] hover:underline">
                Lihat pesanan saya
              </Link>
            )}
          </div>
        )}

        <p className="mt-6 text-xs leading-5 text-gray-500">
          Tiket ditahan sementara setelah pesanan dibuat. Selesaikan pembayaran sebelum waktunya
          habis, kalau tidak pesanan dibatalkan dan tiket dilepas kembali.
        </p>
      </div>

      {/* bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#333] bg-[#121212]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 sm:text-xs">
              {totalQty > 0 ? `${totalQty} tiket dipilih` : "Pilih jumlah tiket"}
            </p>
            <p className="truncate text-sm font-semibold">
              {totalQty > 0
                ? tiers
                    .filter((t) => counts[t.id])
                    .map((t) => `${counts[t.id]}× ${t.name}`)
                    .join(", ")
                : "—"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {totalQty > 0 && (
              <p className="hidden text-sm font-bold sm:block">{formatRupiah(totalPrice)}</p>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={totalQty === 0 || submitting || !canBuy}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold sm:px-8 ${
                totalQty > 0 && canBuy && !submitting
                  ? "bg-[#FBADCC] text-black hover:bg-[#f8a0c4]"
                  : "cursor-not-allowed bg-[#272727] text-gray-500"
              }`}
            >
              {submitting ? "Memproses..." : "Lanjut ke pembayaran"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
