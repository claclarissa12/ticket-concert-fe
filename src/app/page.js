"use client"

const popularEvents = [
  {
    id: 1,
    date: "17 mei",
    title: "Nassar Tour 2026",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
  },
  {
    id: 2,
    date: "17 mei",
    title: "Nassar Tour 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
  },
  {
    id: 3,
    date: "17 mei",
    title: "Nassar Tour 2026",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
  },
  {
    id: 4,
    date: "17 mei",
    title: "Nassar Tour 2026",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
  },
  {
    id: 5,
    date: "17 mei",
    title: "Nassar Tour 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
  },
  {
    id: 6,
    date: "17 mei",
    title: "Nassar Tour 2026",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
  },
];

export default function LandingPage() {

  return (
    <main className="min-h-screen bg-[#141414] text-white">

      <nav className="flex items-center justify-between px-20 py-6">
        <h1 className="text-xl font-bold">
          Ticket<span className="text-[#E21D8F]">.COM</span>
        </h1>

        <button className="rounded-full bg-[#E21D8F] px-6 py-2 text-sm font-medium hover:bg-pink-600 duration-300">
          Mulai Sekarang
        </button>
      </nav>

      <section className="mx-auto w-[90%] overflow-hidden rounded-xl bg-black relative">

        <img
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600"
          className="h-[420px] w-full object-cover brightness-50"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

          <h2 className="text-5xl font-black leading-tight">
            Musik Terbaik Layak
            <br />
            Dinikmati Secara Langsung
          </h2>

          <p className="mt-6 max-w-xl text-gray-300">
            Jangan hanya mendengarkan, rasakan langsung euforianya.
            Temukan konser favoritmu dan pesan tiket sekarang juga.
          </p>

          <div className="mt-8 flex gap-4">
            <a href="/login">

              <button className="rounded-lg bg-[#E21D8F] px-8 py-2 font-medium hover:bg-pink-600 duration-300">
                Masuk
              </button>
            </a>

            <button className="rounded-lg border border-white px-8 py-2 font-medium hover:bg-white hover:text-black duration-300">
              Daftar
            </button>

          </div>

        </div>

      </section>

      <section className="mx-auto mt-8 flex w-[90%] flex-wrap items-center justify-between gap-1 rounded-xl border border-[#2b2b2b] bg-[#1c1c1c] p-4">

        <div className="rounded-full border border-[#3a3a3a] bg-[#141414] px-14 py-2 text-lg outline-none">
          <p className="flex gap-3" >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
              fill="currentColor" viewBox="0 0 24 24" >
              <path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6"></path>
            </svg>Cari Artis atau event</p>
        </div>

        <select className="rounded-lg border border-[#3a3a3a]  px-14 py-2.5 text-lg outline-none">
          <option>Pilih Lokasi</option>
        </select>

        <select className="rounded-lg border border-[#3a3a3a]  px-14 py-2.5 text-lg outline-none">
          <option>Semua Genre</option>
        </select>

        <select className="rounded-lg border border-[#3a3a3a]  px-14 py-2.5 text-lg outline-none">

          <option>Semua Tanggal</option>
        </select>

        <select className="rounded-full border border-[#3a3a3a]  px-14 py-2.5 text-lg outline-none">
          <option>Minggu Ini</option>
        </select>

      </section>

      <section className="mx-auto mt-14 w-[90%]">

        <div className="mb-8 flex items-center justify-between">
          <div className="grid gap-2">
            <h2 className="text-2xl text-[#FBADCC] font-bold uppercase">
              Terpopuler Minggu Ini
            </h2>
            <div className="bg-[#E21D8F] py-0.5"></div>
          </div>

          <button className="text-sm text-[#FBADCC] hover:underline">
            Lihat Semua
          </button>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularEvents.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-xl"
            >
              <img
                src={event.image}
                alt={event.title}
                className="h-96 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 z-10 w-full p-5">
                <p className="text-sm text-[#FBADCC]">
                  {event.date}
                </p>

                <h3 className="mt-1 text-4xl font-light text-white">
                  {event.title}
                </h3>

                <button className="mt-5 rounded-full bg-white px-8 py-2 text-sm font-semibold text-black transition hover:bg-[#FBADCC] hover:text-white">
                  Beli Tiket
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>
      <section className="mt-16 p-18 ">

        <div className="mb-8 flex items-center justify-between">
          <div className="grid gap-2">
            <h2 className="text-2xl text-[#FBADCC] font-bold uppercase">
              Konser Mendatang
            </h2>
            <div className="bg-[#E21D8F] py-0.5"></div>
          </div>

          <button className="text-sm text-pink-500 hover:underline">
            Lihat Semua
          </button>

        </div>

        <div className=" flex gap-6 overflow-x-scroll ">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex w-[800px] flex-shrink-0 rounded-xl bg-[#202020] p-6 hover:bg-[#272727] duration-300"
            >

              <div className="flex gap-9">

                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700"
                  className="h-60 w-70 rounded-lg object-cover"
                />

                <div className="grid  w-max">
                  <p className="text-md font-medium text-end text-[#FBADCC]">
                    22 Juli 2027
                  </p>

                  <h3 className="mt-1 text-3xl font-bold">

                    Nassar Horizon World Tour 2027
                  </h3>

                  <p className="mt-2 text-sm text-[#FBADCC] flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18"
                      fill="currentColor" viewBox="0 0 24 24" >
                      <path d="M6 8.44c-.02 5.1 5.17 9.18 5.39 9.35.18.14.4.21.61.21s.43-.07.61-.21c.22-.17 5.41-4.25 5.39-9.35C18 4.89 15.31 2 12 2S6 4.89 6 8.44m10 0c.01 3.19-2.74 6.08-4 7.24-1.26-1.15-4.01-4.04-4-7.24C8 5.99 9.79 4 12 4s4 1.99 4 4.44"></path><path d="M12 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m6.02 8.73c-.4.64-.84 1.23-1.27 1.76C18.88 16.97 20 17.68 20 18c0 .51-2.75 2-8 2s-8-1.49-8-2c0-.32 1.12-1.03 3.25-1.51-.43-.53-.86-1.12-1.27-1.76C3.66 15.37 2 16.44 2 18c0 2.75 5.18 4 10 4s10-1.25 10-4c0-1.56-1.67-2.63-3.98-3.27"></path>
                    </svg>
                    Jakarta International Stadium
                  </p>


                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-[#FBADCC]">Harga</p>
                      <p className="text-2xl font-bold text-[#FBADCC]">IDR 500.000</p>
                    </div>
                    <div>
                      <button className="bg-[#FBADCC] px-10 py-3 rounded-xl text-md text-black font-bold">
                        Lihat Tiket
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          ))}


        </div>

      </section>

      <section className="mx-auto mt-20 w-[90%]">

        <h2 className="text-center text-2xl font-bold uppercase">
          Cari Berdasarkan Genre
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">

          {[
            "Jazz",
            "Rock",
            "EDM",
            "Theater",
            "Pop",
            "Hip Hop"
          ].map((genre) => (
            <div
              key={genre}
              className="flex cursor-pointer flex-col items-center gap-4"
            >

              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-pink-500 hover:bg-pink-500 duration-300">

                <span className="text-3xl">
                  🎵
                </span>

              </div>

              <p className="font-medium">
                {genre}
              </p>

            </div>
          ))}

        </div>

      </section>
      <section className="mx-auto mt-20 w-[90%]">

        <div className="flex flex-col items-center justify-between gap-10 rounded-2xl bg-[#FBADCC] px-10 py-12 text-black lg:flex-row">

          <div className="lg:pl-20">

            <h2 className="text-6xl font-black text-[#E21D8F] leading-tight">
              Konser Favoritmu
              <br />
              Menunggu.
            </h2>

            <p className="mt-5 max-w-md text-lg leading-7 text-gray-800">
              Daftar sekarang dan nikmati akses lebih awal ke tiket konser, promo spesial, serta update event favoritmu.
            </p>

            <button className="mt-8 rounded-lg bg-[#E21D8F] px-10 py-3 font-medium text-white duration-300 hover:bg-black">
              Gabung Sekarang
            </button>

          </div>

          <img
            src="/Group 127.png"
            alt=""
            className="h-129 pr-19 object-contain"
          />

        </div>

      </section>

      <footer className="mt-24 border-t border-[#2c2c2c] bg-[#111111]">

        <div className="mx-auto grid w-[90%] gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          <div>

            <h2 className="text-2xl font-bold">
              Ticket<span className="text-pink-500">.COM</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Temukan konser favoritmu dengan mudah.
              Pesan tiket secara aman, cepat, dan nikmati pengalaman
              konser yang tak terlupakan.
            </p>

          </div>

          <div>
            <div className="border-l-6  border-[#FBADCC] ">
              <h3 className="mb-5 ml-3 text-lg text-[#FBADCC] font-semibold">
                Navigasi
              </h3>
            </div>

            <ul className="space-y-3 text-[#FBADCC]">

              <li className="cursor-pointer hover:text-pink-500">
                Beranda
              </li>

              <li className="cursor-pointer hover:text-pink-500">
                Event
              </li>

              <li className="cursor-pointer hover:text-pink-500">
                Genre
              </li>

              <li className="cursor-pointer hover:text-pink-500">
                Tentang Kami
              </li>

            </ul>

          </div>

          <div>

            <div className="border-l-6  border-[#FBADCC] ">
              <h3 className="mb-5 ml-3 text-lg text-[#FBADCC] font-semibold">
                Kontak
              </h3>
            </div>

            <div className="space-y-4 text-gray-400 ">

              <div className="text-[#FBADCC] flex gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22"
                  fill="currentColor" viewBox="0 0 24 24" >
                  <path d="M6 8.44c-.02 5.1 5.17 9.18 5.39 9.35.18.14.4.21.61.21s.43-.07.61-.21c.22-.17 5.41-4.25 5.39-9.35C18 4.89 15.31 2 12 2S6 4.89 6 8.44m10 0c.01 3.19-2.74 6.08-4 7.24-1.26-1.15-4.01-4.04-4-7.24C8 5.99 9.79 4 12 4s4 1.99 4 4.44"></path><path d="M12 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m6.02 8.73c-.4.64-.84 1.23-1.27 1.76C18.88 16.97 20 17.68 20 18c0 .51-2.75 2-8 2s-8-1.49-8-2c0-.32 1.12-1.03 3.25-1.51-.43-.53-.86-1.12-1.27-1.76C3.66 15.37 2 16.44 2 18c0 2.75 5.18 4 10 4s10-1.25 10-4c0-1.56-1.67-2.63-3.98-3.27"></path>
                </svg>
                <p className="">Depok, Indonesia</p>
              </div>

              <div className="text-[#FBADCC] flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="currentColor" viewBox="0 0 24 24" >
                  <path d="M18.07 22h.35c.47-.02.9-.26 1.17-.64l2.14-3.09c.23-.33.32-.74.24-1.14s-.31-.74-.64-.97l-4.64-3.09a1.47 1.47 0 0 0-.83-.25c-.41 0-.81.16-1.1.48l-1.47 1.59c-.69-.43-1.61-1.07-2.36-1.82s-1.39-1.68-1.82-2.36l1.59-1.47c.54-.5.64-1.32.23-1.93L7.84 2.67c-.22-.33-.57-.57-.97-.64a1.46 1.46 0 0 0-1.13.24L2.65 4.41c-.39.27-.62.7-.64 1.17-.03.69-.16 6.9 4.68 11.74 4.35 4.35 9.81 4.69 11.38 4.69ZM6.88 10.05c-.16.15-.21.39-.11.59.05.09 1.15 2.24 2.74 3.84 1.6 1.6 3.75 2.7 3.84 2.75.2.1.44.06.59-.11l1.99-2.15 3.86 2.57-1.7 2.46c-1.16 0-6.13-.24-9.99-4.1S4 7.06 4 5.91l2.46-1.7 2.57 3.86-2.15 1.99Z"></path><path d="m20.29 2.29-4 4L14 4v6h6l-2.29-2.29 4-4z"></path>
                </svg>
                <p>+62 812-3456-7890</p>
              </div>

              <div className="text-[#FBADCC] flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="currentColor" viewBox="0 0 24 24" >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 2v.51l-8 6.22-8-6.22V6zM4 18V9.04l7.39 5.74c.18.14.4.21.61.21s.43-.07.61-.21L20 9.03v8.96H4Z"></path>
                </svg>
                <p>ticket@gmail.com</p>
              </div>

            </div>

          </div>

          <div>

            <div className="border-l-6  border-[#FBADCC] ">
              <h3 className="mb-5 ml-3 text-lg text-[#FBADCC] font-semibold">
                Ikuti Kami
              </h3>
            </div>

            <div className="flex gap-4">

              <div className="flex h-11 w-11  cursor-pointer items-center justify-center rounded-full border border-[#E21D8F] duration-300 hover:bg-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="currentColor" viewBox="0 0 24 24" >
                  <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
              </div>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E21D8F] duration-300 hover:bg-pink-500">

              </div>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E21D8F] puration-300 hover:bg-pink-500">

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-[#2c2c2c] py-6 text-center text-sm text-gray-500">

          © 2026 Ticket.COM. All Rights Reserved.

        </div>

      </footer>

    </main>

  )
}