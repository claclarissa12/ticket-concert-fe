"use client"

import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"
import ProfileSide from "@/components/user/sideprofile"
import UserProfile from "@/components/user/userProfile"

export default function ProfileFav() {
    return (
        <div className="bg-[#131313] min-h-screen text-white">
            <UserNavbar />
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <UserProfile />
                
                <div className="flex gap-12 pt-6">
                    <div className="flex-shrink-0">
                        <ProfileSide />
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold">Event yang kamu sukai</h1>
                            <span className="text-sm text-gray-400 bg-[#272727] px-4 py-1.5 rounded-full">
                                10 event
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((event) => (
                                <div 
                                    key={event} 
                                    className="bg-[#272727] rounded-2xl overflow-hidden hover:bg-[#2f2f2f] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FBADCC]/10 group"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src="/image 9.png"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            alt="Event"
                                        />
                                        <div className="absolute top-3 right-3 bg-[#E21D8F] px-3 py-1 rounded-full text-xs font-semibold">
                                         Favorit
                                        </div>
                                    </div>
                                    
                                    <div className="p-5">
                                        <h2 className="text-lg font-bold text-white truncate">
                                            Nassar Tour Depok 2026
                                        </h2>
                                        
                                        <div className="mt-3 space-y-2">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M5 20V8h14V6v14z"></path>
                                                    <path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path>
                                                </svg>
                                                <span className="text-sm">20 Mei 2026</span>
                                            </div>
                                            
                                            <div className="flex items-start gap-2 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                                                    <path d="M6 8.44c-.02 5.1 5.17 9.18 5.39 9.35.18.14.4.21.61.21s.43-.07.61-.21c.22-.17 5.41-4.25 5.39-9.35C18 4.89 15.31 2 12 2S6 4.89 6 8.44m10 0c.01 3.19-2.74 6.08-4 7.24-1.26-1.15-4.01-4.04-4-7.24C8 5.99 9.79 4 12 4s4 1.99 4 4.44"></path>
                                                    <path d="M12 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4m6.02 8.73c-.4.64-.84 1.23-1.27 1.76C18.88 16.97 20 17.68 20 18c0 .51-2.75 2-8 2s-8-1.49-8-2c0-.32 1.12-1.03 3.25-1.51-.43-.53-.86-1.12-1.27-1.76C3.66 15.37 2 16.44 2 18c0 2.75 5.18 4 10 4s10-1.25 10-4c0-1.56-1.67-2.63-3.98-3.27"></path>
                                                </svg>
                                                <span className="text-sm line-clamp-2">Jln. Margonda Raya Pondok Cina No 45</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-700">
                                            <h3 className="text-xl font-bold text-white">
                                                IDR 500.000
                                            </h3>
                                            <button className="h-10 px-6 rounded-xl bg-[#FBADCC] font-semibold text-black hover:opacity-90 transition-all duration-300 hover:scale-[1.05] shadow-lg shadow-[#E21D8F]/25">
                                                Pesan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}