"use client"

import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"
import ProfileSide from "@/components/user/sideprofile"
import UserProfile from "@/components/user/userProfile"


export default function ProfileSetting() {
    return (
        <div className="bg-[#131313] min-h-screen text-white">
            <UserNavbar />
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <UserProfile />

                <div className="flex gap-12 pt-6">
                    <div className="flex-shrink-0">
                        <ProfileSide />
                    </div>
                    <div>
                        <div className=" grid gap-10 grid-cols-2  ">

                            <div className="bg-[#272727] p-8 space-y-5 rounded-md  w-md">
                                <div className="flex gap-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path><path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path>
                                    </svg>
                                    <h1 className="font-semibold">Informasi Akun</h1>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[#FBADCC]">Nama</p>
                                    <div className=" bg-[#131313] w-full h-12 rounded-md p-3">
                                        <p className="text-gray-300">Abdul Somat</p>
                                    </div>

                                </div>
                                <div className="space-y-2">
                                    <p className="text-[#FBADCC]">Alamat Email</p>
                                    <div className=" bg-[#131313] w-full h-12 rounded-md p-3">
                                        <p className="text-gray-300">Abulsukibul@gmail.com</p>
                                    </div>

                                </div>
                                <div className="space-y-2">
                                    <p className="text-[#FBADCC]">Password</p>
                                    <div className=" bg-[#131313] w-full h-12 rounded-md p-3">
                                        <p className="text-gray-300">******</p>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-[#272727] p-8 space-y-5 rounded-md  w-md">
                                <div className="flex gap-4 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m7.5 7.24c-1.05-.45-2.36-.77-3.76-.97-.2-1.4-.52-2.71-.97-3.76 2.19.81 3.92 2.55 4.73 4.73m-3.55 4.44c.03-.56.05-1.12.05-1.68s-.02-1.12-.05-1.68C18.62 10.79 20 11.64 20 12s-1.39 1.21-4.05 1.68M12 20c-.36 0-1.21-1.39-1.68-4.05.56.03 1.12.05 1.68.05s1.12-.02 1.68-.05C13.21 18.62 12.36 20 12 20m0-6c-.69 0-1.33-.03-1.93-.07-.05-.6-.07-1.24-.07-1.93s.03-1.33.07-1.93c.6-.05 1.24-.07 1.93-.07s1.33.03 1.93.07c.05.6.07 1.24.07 1.93s-.03 1.33-.07 1.93c-.6.05-1.24.07-1.93.07m-8-2c0-.36 1.39-1.21 4.05-1.68C8.02 10.88 8 11.44 8 12s.02 1.12.05 1.68C5.38 13.21 4 12.36 4 12m8-8c.36 0 1.21 1.39 1.68 4.05C13.12 8.02 12.56 8 12 8s-1.12.02-1.68.05C10.79 5.38 11.64 4 12 4m-2.76.5c-.45 1.05-.77 2.36-.97 3.76-1.4.2-2.71.52-3.76.97A8.04 8.04 0 0 1 9.24 4.5M4.51 14.76c1.05.45 2.36.77 3.76.97.2 1.4.52 2.71.97 3.76a8.04 8.04 0 0 1-4.73-4.73m10.26 4.73c.45-1.05.77-2.36.97-3.76 1.4-.2 2.71-.52 3.76-.97a8.04 8.04 0 0 1-4.73 4.73"></path>
                                    </svg>
                                    <h1 className="font-semibold">Preference</h1>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[#FBADCC]">Bahasa</p>
                                    <div className=" bg-[#131313] w-full h-12 rounded-md p-3">
                                        <p className="text-gray-300">Indonesia</p>
                                    </div>

                                </div>
                                <div className="space-y-2">
                                    <p className="text-[#FBADCC]">Mata Uang</p>
                                    <div className=" bg-[#131313] w-full h-12 rounded-md p-3">
                                        <p className="text-gray-300">IDR (Rp)</p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}