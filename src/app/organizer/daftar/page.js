"use client"

export default function DaftarEvent() {
  return (
    <div className="min-h-screen bg-[#0f0f11]  items-center justify-center p-6">
      <div className=" p-10">
        <div>
          <div className="mb-8 text-4xl font-bold text-pink-500">Ticket.Com</div>

          <h2 className="text-2xl font-bold text-white">
            Bergabung Sebagai Event Organizer
          </h2>

          <p className="mt-3 text-sm leading-6 pb-4 text-gray-400">
            Daftarkan organisasi Anda untuk mengelola konser, menjual tiket, dan memantau performa event dengan mudah melalui platform kami.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-pink-500"></div>
            <span>Pencairan Dana yang Mudah</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-pink-500"></div>
            <span>Analitik Penjualan Lengkap</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-pink-500"></div>
            <span>Kelola Tiket & Peserta Event</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="mb-6 border-b border-[#2a2a2d] pb-4 text-lg font-semibold text-white">
          Informasi Organisasi
        </h2>

        <form className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Nama Penanggung Jawab
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-lg border border-[#35353a] bg-[#111113] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Nama Organisasi / Perusahaan
              </label>

              <input
                type="text"
                placeholder="Masukkan nama organisasi"
                className="w-full rounded-lg border border-[#35353a] bg-[#111113] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                NPWP (Opsional)
              </label>

              <input
                type="text"
                placeholder="Masukkan nomor NPWP"
                className="w-full rounded-lg border border-[#35353a] bg-[#111113] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email Organisasi
              </label>

              <input
                type="email"
                placeholder="contoh@email.com"
                className="w-full rounded-lg border border-[#35353a] bg-[#111113] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Nomor Telepon
              </label>

              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-lg border border-[#35353a] bg-[#111113] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Alamat Organisasi
            </label>

            <input
              type="text"
              placeholder="Masukkan alamat lengkap organisasi"
              className="w-full rounded-lg border border-[#35353a] bg-[#111113] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="border-t border-[#2a2a2d] pt-6">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Dokumen Verifikasi
            </h3>

            <p className="mb-6 text-sm text-gray-400">
              Unggah dokumen yang diperlukan untuk proses verifikasi organisasi.
              Format yang didukung: PDF, JPG, PNG (Maksimal 5 MB).
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#E21D8F] bg-[#111113] text-center transition hover:border-pink-500">
                <span className="text-3xl">📄</span>

                <span className="mt-2 text-sm font-semibold text-white">
                  KTP Penanggung Jawab
                </span>

                <span className="text-xs text-gray-500">
                  Klik atau seret file ke sini
                </span>

                <input type="file" className="hidden" />
              </label>

              <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#E21D8F] bg-[#111113] text-center transition hover:border-pink-500">
                <span className="text-3xl">📑</span>

                <span className="mt-2 text-sm font-semibold text-white">
                  Surat Izin Usaha
                </span>

                <span className="text-xs text-gray-500">
                  Klik atau seret file ke sini
                </span>

                <input type="file" className="hidden" />
              </label>
            </div>

            <label className="mt-4 flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#E21D8F] bg-[#111113] text-center transition hover:border-pink-500">
              <span className="text-3xl">🖼️</span>

              <span className="mt-2 text-sm font-semibold text-white">
                Logo Organisasi
              </span>

              <span className="text-xs text-gray-500">
                Resolusi minimal 500 × 500 piksel
              </span>

              <input type="file" className="hidden" />
            </label>
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-400">
            <input
              type="checkbox"
              className="mt-1 accent-pink-500"
            />

            <span>
              Saya menyatakan bahwa seluruh data yang diberikan adalah benar dan menyetujui Syarat & Ketentuan serta Kebijakan Privasi yang berlaku pada platform ini.
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#E21D8F] py-3 font-semibold text-white transition hover:opacity-90"
          >
            Kirim Pengajuan
          </button>
        </form>
      </div>
    </div>
  )
}