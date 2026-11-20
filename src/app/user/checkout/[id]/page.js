"use client";

// Place at: src/app/user/checkout/[id]/page.js   (replaces the current file)
// [id] is the REAL order id, created by POST /orders on the ticket-selection page.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/components/cards/back";
import { apiFetch } from "../../../../../lib/api.js";

const formatRupiah = (value) => `IDR ${Number(value || 0).toLocaleString("id-ID")}`;

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

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

// what to show when the order is no longer payable
const CLOSED = {
  paid: {
    title: "Pembayaran berhasil",
    text: "Pesanan ini sudah dibayar. Tiketmu sudah terbit.",
    tone: "text-green-400 border-green-500/30 bg-green-500/10",
  },
  expired: {
    title: "Waktu pembayaran habis",
    text: "Pesanan ini kedaluwarsa dan tiketnya sudah dilepas kembali.",
    tone: "text-gray-300 border-[#444] bg-[#272727]",
  },
  cancelled: {
    title: "Pesanan dibatalkan",
    text: "Pesanan ini dibatalkan dan tiketnya sudah dilepas kembali.",
    tone: "text-gray-300 border-[#444] bg-[#272727]",
  },
};

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  const deadlineRef = useRef(0); // timestamp (ms) when the order expires

  const [paying, setPaying] = useState(false);
  const [checking, setChecking] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [actionError, setActionError] = useState("");
  const busyRef = useRef(false); // blocks a second click before React re-renders

  const goLogin = useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
    router.replace("/login");
  }, [router]);

  // GET /orders/:id  ->  { id, status, total_price, expires_at, seconds_left,
  //                        concert: { id, title, date, venue, location },
  //                        details: [{ quantity, unit_price, subtotal, tier: { name } }] }
  // (the backend expires the order right here if its time is already over)
  const loadOrder = useCallback(async () => {
    const res = await apiFetch(`/orders/${id}`);
    const data = res.data;
    deadlineRef.current = Date.now() + (data.seconds_left || 0) * 1000;
    setOrder(data);
    setTimeLeft(data.seconds_left || 0);
    return data;
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let token = null;
      try {
        token = localStorage.getItem("token");
      } catch {}
      if (!token) {
        router.replace("/login");
        return;
      }

      const [orderResult, meResult] = await Promise.allSettled([
        loadOrder(),
        apiFetch("/auth/getMe"),
      ]);
      if (cancelled) return;

      if (meResult.status === "fulfilled") setBuyer(meResult.value.data);
      if (orderResult.status === "rejected") setLoadError(orderResult.reason.message);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [loadOrder, router]);

  // countdown: always computed from the deadline, so it stays right even if the tab was in the background
  useEffect(() => {
    if (order?.status !== "pending") return;

    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setTimeLeft(left);

      if (left === 0) {
        clearInterval(timer);
        loadOrder().catch(() => {}); // the backend marks it "expired" and releases the tickets
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order?.status, order?.id, loadOrder]);

  const handleError = (err) => {
    if (/token|access denied/i.test(err.message)) {
      goLogin();
      return;
    }
    setActionError(err.message);
  };

  // POST /orders/:id/pay  ->  { token, redirect_url, ... }  : send the buyer to the Midtrans payment page
  const handlePay = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setPaying(true);
    setActionError("");

    try {
      const res = await apiFetch(`/orders/${id}/pay`, { method: "POST" });
      if (!res.data?.redirect_url) throw new Error("Link pembayaran tidak tersedia, coba lagi.");

      try {
        sessionStorage.setItem("lastOrderId", String(id)); // lets the success page know which order it is
      } catch {}
      window.location.href = res.data.redirect_url; // stay "paying" while the browser leaves
    } catch (err) {
      handleError(err);
      busyRef.current = false;
      setPaying(false);
    }
  };

  // GET /orders/:id/status  ->  asks Midtrans directly (needed on localhost, where the webhook can't reach us)
  const handleCheckStatus = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setChecking(true);
    setActionError("");

    try {
      const res = await apiFetch(`/orders/${id}/status`);
      await loadOrder();
      if (res.data.status === "pending") {
        setActionError("Pembayaran belum kami terima. Selesaikan pembayaran lalu cek lagi.");
      }
    } catch (err) {
      handleError(err);
    } finally {
      busyRef.current = false;
      setChecking(false);
    }
  };

  // POST /orders/:id/cancel  ->  releases the held tickets
  const handleCancel = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setCancelling(true);
    setActionError("");

    try {
      await apiFetch(`/orders/${id}/cancel`, { method: "POST" });
      await loadOrder();
      setConfirmCancel(false);
    } catch (err) {
      handleError(err);
    } finally {
      busyRef.current = false;
      setCancelling(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* States                                                              */
  /* ------------------------------------------------------------------ */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
        <p className="text-sm text-gray-400">Memuat pesanan...</p>
      </div>
    );
  }

  if (loadError || !order) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-sm text-red-400">{loadError || "Pesanan tidak ditemukan."}</p>
        <Link href="/user/orders" className="text-sm text-[#FBADCC] hover:underline">
          Lihat pesanan saya
        </Link>
      </div>
    );
  }

  const isPending = order.status === "pending";
  const closed = CLOSED[order.status];
  const busy = paying || checking || cancelling;

  /* ------------------------------------------------------------------ */
  /* Page                                                                */
  /* ------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-full bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left side */}
        <div className="flex-1 p-6 border-r border-[#333]">
          <BackButton className="mb-6" />

          <div className="space-y-6">
            <div className="bg-[#272727] border border-[#333] rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Data Pemesan</h2>
              {buyer ? (
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-400">Nama</dt>
                    <dd className="text-right">{buyer.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-400">Email</dt>
                    <dd className="text-right break-all">{buyer.email}</dd>
                  </div>
                  {buyer.phone && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-400">Nomor Telepon</dt>
                      <dd className="text-right">{buyer.phone}</dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="text-sm text-gray-500">Data akun tidak bisa dimuat.</p>
              )}
              <p className="mt-4 text-xs text-gray-500">
                Tiket akan terbit di akun ini setelah pembayaran berhasil.
              </p>
            </div>

            <div className="bg-[#272727] border border-[#333] rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-2">Pembayaran</h2>
              <p className="text-sm text-gray-400 leading-6">
                Kamu akan diarahkan ke halaman pembayaran aman Midtrans untuk memilih metode
                pembayaran (kartu, transfer bank, QRIS, dan lainnya). Data kartu dan rekening
                tidak pernah melewati website ini.
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-[380px] bg-[#1a1a1a] p-6 flex flex-col">
          <h2 className="text-sm font-semibold mb-4">Detail Pesanan #{order.id}</h2>

          <div className="bg-[#272727] border border-[#333] rounded-xl p-4 mb-6">
            {order.concert && (
              <div className="mb-4 border-b border-[#333] pb-4">
                <p className="text-sm font-semibold">{order.concert.title}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(order.concert.date)}</p>
                <p className="text-xs text-gray-400">
                  {[order.concert.venue, order.concert.location].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            <ul className="space-y-3 text-sm">
              {order.details?.map((d) => (
                <li key={d.id ?? d.ticket_tier_id} className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{d.tier?.name ?? "Tiket"}</p>
                    <p className="text-xs text-gray-400">
                      {d.quantity} × {formatRupiah(d.unit_price)}
                    </p>
                  </div>
                  <span className="text-gray-300 whitespace-nowrap">{formatRupiah(d.subtotal)}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#333] pt-3 mt-4 flex justify-between font-semibold text-white text-sm">
              <span>Total</span>
              <span>{formatRupiah(order.total_price)}</span>
            </div>
          </div>

          {isPending ? (
            <>
              <div className="bg-[#272727] border border-[#FBADCC]/30 rounded-xl p-4 mb-6 text-center">
                <p className="text-xs text-gray-400 mb-1">Selesaikan pembayaran dalam</p>
                <p className="text-2xl font-bold text-[#FBADCC] font-mono tracking-wider">
                  {formatTime(timeLeft)}
                </p>
                <p className="text-[10px] text-gray-500 mt-1">Tiket akan dilepas jika waktu habis</p>
              </div>

              {actionError && (
                <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {actionError}
                </p>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={busy || timeLeft === 0}
                className="w-full bg-[#FBADCC] hover:bg-[#f8a0c4] text-black font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paying ? "Mengarahkan ke pembayaran..." : "Bayar Sekarang"}
              </button>

              <button
                type="button"
                onClick={handleCheckStatus}
                disabled={busy}
                className="mt-3 w-full border border-[#3a3a3a] hover:border-[#FBADCC]/60 text-sm py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? "Memeriksa..." : "Saya sudah membayar"}
              </button>

              {!confirmCancel ? (
                <button
                  type="button"
                  onClick={() => setConfirmCancel(true)}
                  disabled={busy}
                  className="mt-3 w-full text-xs text-gray-400 hover:text-red-400 py-2 disabled:opacity-50"
                >
                  Batalkan pesanan
                </button>
              ) : (
                <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <p className="text-xs text-red-300 mb-3">
                    Batalkan pesanan ini? Tiket akan dilepas dan tidak bisa dikembalikan.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={busy}
                      className="flex-1 rounded-md bg-red-500 py-2 text-xs font-semibold text-white disabled:opacity-50"
                    >
                      {cancelling ? "Membatalkan..." : "Ya, batalkan"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmCancel(false)}
                      disabled={busy}
                      className="flex-1 rounded-md border border-[#3a3a3a] py-2 text-xs disabled:opacity-50"
                    >
                      Tidak
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={`rounded-xl border p-4 text-center ${closed?.tone ?? ""}`}>
              <p className="text-sm font-semibold">{closed?.title ?? `Status: ${order.status}`}</p>
              <p className="text-xs mt-1 opacity-80">{closed?.text}</p>

              <div className="mt-4 flex flex-col gap-2">
                {order.status === "paid" ? (
                  <Link
                    href={`/user/orders/${order.id}`}
                    className="rounded-lg bg-[#FBADCC] py-3 text-sm font-semibold text-black hover:bg-[#f8a0c4]"
                  >
                    Lihat pesanan
                  </Link>
                ) : (
                  <>
                    {order.concert?.id && (
                      <Link
                        href={`/user/ticket-selection/${order.concert.id}`}
                        className="rounded-lg bg-[#FBADCC] py-3 text-sm font-semibold text-black hover:bg-[#f8a0c4]"
                      >
                        Pilih tiket lagi
                      </Link>
                    )}
                    <Link href="/user/orders" className="py-2 text-xs text-gray-400 hover:text-white">
                      Lihat pesanan saya
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
