"use client"

import Footer from "@/components/layout/footer"
import UserNavbar from "@/components/layout/UserNavbar"
import ProfileSide from "@/components/user/sideprofile"
import UserProfile from "@/components/user/userProfile"

export default function ProfileUser() {
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
                            <h1 className="text-2xl font-bold">Akun yang anda ikuti</h1>
                            <span className="text-sm text-gray-400 bg-[#272727] px-4 py-1.5 rounded-full">
                                {9} akun
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div 
                                    key={i} 
                                    className="bg-[#272727] hover:bg-[#2f2f2f] transition-all duration-300 rounded-2xl p-5 group"
                                >
                                    <div className="flex flex-col">
                                        {/* Profile Info */}
                                        <div className="flex items-center gap-3 pb-4">
                                            <div className="relative">
                                                <img 
                                                    src="/image 9.png" 
                                                    className="w-14 h-14 rounded-full object-cover border-2 border-[#FBADCC]/30 group-hover:border-[#FBADCC] transition-all duration-300"
                                                    alt="Profile"
                                                />
                                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#272727]"></div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold truncate">Nassar Agency</p>
                                                <p className="text-xs text-gray-400">200rb Pengikut</p>
                                            </div>
                                        </div>
                                        
                                        <button className="font-semibold text-sm text-[#FBADCC] border-2 border-[#FBADCC]/50 hover:border-[#FBADCC] hover:bg-[#FBADCC]/10 w-full h-10 rounded-xl transition-all duration-300">
                                            Batal Ikuti
                                        </button>
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