"use client"

import SideNotif from "@/components/layout/sideNotif"
import UserNavbar from "@/components/layout/UserNavbar"

export default function NotifPengingat() {
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
                        <div className="bg-[#272727] rounded-2xl p-6 hover:bg-[#2f2f2f] transition-colors">
                            <div className="flex items-start gap-10">
                                <div className="bg-[#E21D8F] px-4 py-4 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M21 5H3c-.55 0-1 .45-1 1v3.55c0 .48.33.89.8.98a1.499 1.499 0 0 1 0 2.94c-.47.09-.8.5-.8.98V18c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-3.55c0-.48-.33-.89-.8-.98a1.499 1.499 0 0 1 0-2.94c.47-.09.8-.5.8-.98V6c0-.55-.45-1-1-1m-1 3.84c-1.2.57-2 1.79-2 3.16s.8 2.59 2 3.16V17h-4v-2h-1v2H4v-1.84c1.2-.57 2-1.79 2-3.16s-.8-2.59-2-3.16V7h11v1h1V7h4z"></path><path d="M15 9h1v2h-1zm0 3h1v2h-1z"></path>
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white text-lg">Concert reminder</h3>
                                    <p className="text-gray-400 mt-1">
                                        Get ready! <span className="text-white font-medium">Exhorizon Concert</span> starts in exactly 24 hours. Check your transportation route.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-3">1 hour ago</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}