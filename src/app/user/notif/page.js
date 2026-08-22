"use client"

import Footer from "@/components/layout/footer"
import SideNotif from "@/components/layout/sideNotif"
import UserNavbar from "@/components/layout/UserNavbar"

export default function Notif() {
    return (
        <div className="bg-[#131313] min-h-screen text-white">
            <UserNavbar />
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="flex gap-12 items-start">
                    <SideNotif />
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-xl font-semibold">Recent Updates</h1>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white text-lg">Ticket purchased successfully</h3>
                                        <p className="text-gray-400 mt-1">
                                            Your booking for <span className="text-white font-medium">King Nassar Asyeole</span> at GBK Stadium is confirmed.
                                        </p>
                                        <div className="flex gap-4 mt-3">
                                            <button className="text-[#FBADCC] hover:underline text-sm font-medium">
                                                View E-Ticket
                                            </button>
                                            <button className="text-[#FBADCC] hover:underline text-sm font-medium">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-3">Just now</p>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-colors">
                                <div>
                                    <h3 className="font-semibold text-white text-lg">Concert reminder</h3>
                                    <p className="text-gray-400 mt-1">
                                        Get ready! <span className="text-white font-medium">Exhorizon Concert</span> starts in exactly 24 hours. Check your transportation route.
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 mt-3">1 hour ago</p>
                            </div>

                            <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white text-lg">Special offer unlocked!</h3>
                                        <p className="text-gray-400 mt-1">
                                            Enjoy <span className="text-white font-medium">20% OFF</span> on your next booking. Valid for any concert this month.
                                        </p>
                                    </div>
                                    <button className="text-[#FBADCC] hover:underline text-sm font-medium whitespace-nowrap ml-4">
                                        Claim Discount →
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-3">4 hours ago</p>
                            </div>

                            <div>
                                <h2 className="text-sm font-medium text-gray-400 mb-4">YESTERDAY</h2>
                                
                                <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-colors mb-4">
                                    <div>
                                        <h3 className="font-semibold text-white text-lg">Profile updated</h3>
                                        <p className="text-gray-400 mt-1">
                                            Your security settings and contact preferences were successfully updated.
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3">Yesterday, 14:20</p>
                                </div>

                                <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-colors">
                                    <div>
                                        <h3 className="font-semibold text-white text-lg">New artist you might like</h3>
                                        <p className="text-gray-400 mt-1">
                                            We found a new artist matching your taste in Electronic Pop. Check out their upcoming tour!
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3">Yesterday, 09:15</p>
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