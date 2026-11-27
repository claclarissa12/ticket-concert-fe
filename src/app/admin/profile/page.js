
"use client"

import AdminGuard from "@/components/admin/guardAdmin"
import AdminSidebar from "@/components/admin/sidebarADM"
import AccountProfile from "@/components/shared/profile"

export default function AdminProfile() {
    return (
        <AdminGuard>
            <div className="bg-[#131313] min-h-screen flex text-white">
                <AdminSidebar />

                <div className="flex-1 overflow-x-hidden">
                    <AccountProfile roleLabel="Administrator" />
                </div>
            </div>
        </AdminGuard>
    )
}
