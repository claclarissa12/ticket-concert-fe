"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Footer from "@/components/layout/footer";
import UserNavbar from "@/components/layout/UserNavbar";
import { authApi } from "../../../../lib/api";

const TABS = [
  { id: "following", label: "Mengikuti" },
  { id: "favorites", label: "Tiket favorit" },
  { id: "settings", label: "Pengaturan" },
];

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBADCC]";

const BTN_PRIMARY =
  `rounded-lg bg-[#FBADCC] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#f8a0c4] disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`;

const BTN_OUTLINE =
  `rounded-lg border border-[#333] px-4 py-2 text-xs font-medium text-white transition hover:border-[#555] ${FOCUS}`;

function formatDate(date) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "?";
}

function Avatar({ name, src, size = "h-16 w-16 text-xl" }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`Foto profil ${name}`}
        className={`${size} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      aria-label={`Avatar ${name}`}
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#FBADCC]/15 font-semibold text-[#FBADCC]`}
    >
      {getInitials(name)}
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10zm0-7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      />
    </svg>
  );
}

function EmptyState({ title, message, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#333] px-6 py-16 text-center">
      <p className="text-sm font-semibold">{title}</p>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-gray-500">
        {message}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function SettingsCard({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-[#272727] bg-[#131313]">
      <div className="border-b border-[#272727] px-5 py-4 sm:px-6">
        <h2 className="text-sm font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>

      <div className="px-5 py-5 sm:px-6">{children}</div>
    </section>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="mb-1.5 text-xs text-gray-500">{label}</p>
      <p className="rounded-lg border border-[#272727] bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-white">
        {value || "-"}
      </p>
    </div>
  );
}

function FollowingTab() {
  return (
    <EmptyState
      title="Belum mengikuti siapa pun"
      message="Ikuti artis dan penyelenggara favoritmu untuk mendapatkan kabar saat mereka mengadakan event."
      action={
        <Link href="/events" className={BTN_PRIMARY}>
          Jelajahi event
        </Link>
      }
    />
  );
}

function FavoritesTab() {
  return (
    <EmptyState
      title="Belum ada tiket favorit"
      message="Event yang kamu simpan sebagai favorit akan muncul di sini."
      action={
        <Link href="/events" className={BTN_PRIMARY}>
          Jelajahi event
        </Link>
      }
    />
  );
}

function SettingsTab({ profile }) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Informasi akun"
        description="Informasi akun yang terdaftar pada sistem."
      >
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} size="h-16 w-16 text-lg" />

          <div className="min-w-0">
            <p className="text-sm font-semibold">{profile.name}</p>
            <p className="mt-1 text-xs text-gray-500">
              Bergabung sejak {profile.joined}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileField label="Nama lengkap" value={profile.name} />
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Nomor telepon" value={profile.phone} />
          <ProfileField label="Kota" value={profile.city} />
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Pengubahan informasi akun belum tersedia.
        </p>
      </SettingsCard>

      <SettingsCard
        title="Keamanan"
        description="Jaga keamanan akun dan informasi pribadimu."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Kata sandi</p>
            <p className="mt-1 text-xs text-gray-500">
              Gunakan kata sandi yang kuat dan unik.
            </p>
          </div>

          <Link href="/profile/password" className={BTN_OUTLINE}>
            Ubah kata sandi
          </Link>
        </div>
      </SettingsCard>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("following");
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        setError("");

        const res = await authApi.getme();

        console.log("GETME RESPONSE:", res);

        // apiFetch returns the backend response:
        // { status, message, data }
        const userData = res?.data;

        if (!userData) {
          throw new Error("Data pengguna tidak ditemukan.");
        }

        const profileData = {
          id: userData.id,
          name: userData.name ?? "",
          email: userData.email ?? "",
          phone: userData.phone ?? "",
          city: userData.city ?? "-",
          joined: formatDate(userData.created_at),
        };

        if (isMounted) {
          setProfile(profileData);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);

        if (isMounted) {
          setError(err.message || "Gagal mengambil data profil.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2 MB.");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  }

  function handleTabKeyDown(event) {
    const currentIndex = TABS.findIndex(
      (tab) => tab.id === activeTab
    );

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    } else {
      return;
    }

    event.preventDefault();

    const nextTab = TABS[nextIndex].id;
    setActiveTab(nextTab);

    document.getElementById(`tab-${nextTab}`)?.focus();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131313] text-white">
        <UserNavbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <p className="text-sm text-gray-400">Memuat profil...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#131313] text-white">
        <UserNavbar />
        <main className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-md rounded-2xl border border-[#333] bg-[#1a1a1a] p-8 text-center">
            <h1 className="text-lg font-semibold">
              Gagal memuat profil
            </h1>

            <p className="mt-2 text-sm text-red-400">
              {error || "Data profil tidak ditemukan."}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className={`${BTN_PRIMARY} mt-5`}
            >
              Coba lagi
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <UserNavbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Profile card */}
          <aside className="w-full shrink-0 rounded-2xl border border-[#272727] bg-[#1a1a1a] lg:sticky lg:top-24 lg:w-72 xl:w-80">
            <div className="flex items-center gap-4 p-5 lg:flex-col lg:p-6 lg:text-center">
              <Avatar
                name={profile.name}
                src={avatar}
                size="h-16 w-16 text-xl lg:h-24 lg:w-24 lg:text-3xl"
              />

              <div className="min-w-0 flex-1 lg:w-full lg:flex-none">
                <h1 className="truncate text-lg font-semibold">
                  {profile.name}
                </h1>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {profile.email}
                </p>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 lg:justify-center">
                  <PinIcon />
                  {profile.city}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`shrink-0 lg:mt-1 lg:w-full ${BTN_OUTLINE}`}
              >
                Lihat pengaturan
              </button>
            </div>

            <div className="border-t border-[#272727] px-5 py-4 lg:px-6">
              <p className="text-xs text-gray-500">Bergabung sejak</p>
              <p className="mt-1 text-sm font-semibold">
                {profile.joined}
              </p>
            </div>

            <div className="border-t border-[#272727] px-5 py-4 lg:px-6">
              <label
                htmlFor="avatar-upload"
                className={`${BTN_OUTLINE} block cursor-pointer text-center`}
              >
                Ganti foto profil
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <p className="mt-2 text-center text-[11px] text-gray-500">
                JPG, PNG, atau WebP. Maksimal 2 MB.
              </p>
            </div>

            <div className="border-t border-[#272727] p-5 lg:px-6">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-red-400/30 px-4 py-2.5 text-xs font-medium text-red-400 transition hover:bg-red-400/10"
              >
                Keluar dari akun
              </button>
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0 flex-1 rounded-2xl border border-[#272727] bg-[#1a1a1a]">
            <div
              role="tablist"
              aria-label="Bagian profil"
              onKeyDown={handleTabKeyDown}
              className="flex gap-1 overflow-x-auto border-b border-[#272727] px-2 sm:px-4"
            >
              {TABS.map((tab) => {
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    className={`-mb-px whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition ${FOCUS} ${
                      active
                        ? "border-[#FBADCC] text-white"
                        : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="p-4 sm:p-6"
            >
              {activeTab === "following" && <FollowingTab />}

              {activeTab === "favorites" && <FavoritesTab />}

              {activeTab === "settings" && (
                <SettingsTab profile={profile} />
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
