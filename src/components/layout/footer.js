"use client"


export default function Footer() {
    return (

        <footer className="mt-24     border-t border-[#2c2c2c] bg-[#111111]">

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
    )
}