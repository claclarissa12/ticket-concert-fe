"use client"

import EoGuard from "@/components/EO/guardEO"
import OrganizerSidebar from "@/components/EO/sidebarEO"
import AccountProfile from "@/components/shared/profile"

export default function OrganizerProfile() {
    return (
        <EoGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <OrganizerSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <AccountProfile roleLabel="Event Organizer" />
                </div>
            </div>
        </EoGuard>
    )
}
