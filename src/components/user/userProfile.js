"use client"

export default function UserProfile() {
    return (
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#272727] rounded-2xl p-8 border border-[#333333]">
            <div className="flex items-center gap-10">
                    <div className="absolute shadow-2xs shadow-pink-300  rounded-full blur-sm opacity-70"></div>
                    <img
                        src="/image 9.png"
                        className="relative shadow-2xs shadow-pink-100 h-32 w-32 rounded-full object-cover border-4 border-[#131313]"
                        alt="Profile"
                    />
                
                <div className="flex-1">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-white">Abdul Somat</h1>
                        <p className="text-gray-400">abulsukibu@gmail.com</p>
                    </div>
                
                    <div className="flex gap-3 mt-5">
                        <button className="bg-[#E21D8F] px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#E21D8F]/25">
                            Edit Profil
                        </button>
                        <button className="border-2 border-[#E21D8F] px-6 py-2.5 rounded-xl text-sm font-semibold text-[#E21D8F] hover:bg-[#E21D8F]/10 hover:border-[#FBADCC] hover:text-[#FBADCC] transition-all duration-300">
                            Bagikan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}