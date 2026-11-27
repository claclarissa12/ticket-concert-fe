"use client"

import { useCallback, useEffect, useState } from "react"
import { authApi } from "../../../lib/api"

export default function SidebarAccount({ roleLabel }) {
    const [user, setUser] = useState(null)
    const [imageError, setImageError] = useState(false)

    const fetchUser = useCallback(async () => {
        try {
            const response = await authApi.getme()

            // Adjust this if your API response has a different structure.
            const data = response.data?.data ?? response.data

            setUser(data)
            setImageError(false)

            console.log("Sidebar user:", data)
            console.log("Avatar URL:", data?.avatar_url)

        } catch (err) {
            console.error("Failed to fetch sidebar profile:", err)
        }
    }, [])

    useEffect(() => {
        fetchUser()

        window.addEventListener("profile-updated", fetchUser)

        return () => {
            window.removeEventListener("profile-updated", fetchUser)
        }
    }, [fetchUser])

    const name = user?.name || "Loading..."

    const initials = (user?.name || "User")
        .split(" ")
        .filter(Boolean)
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    const apiBase = process.env.NEXT_PUBLIC_API_URL
    ?.replace(/\/api\/?$/, "")
    .replace(/\/$/, "")

    const avatarUrl = user?.avatar_url
        ? `${apiBase}${user.avatar_url}`
        : null

    return (
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-[#1a1a1a]/40">

            <div className="relative shrink-0">
                {avatarUrl && !imageError ? (
                    <img
                        src={avatarUrl}
                        alt={`${name}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={() => {
                            console.error("Failed to load avatar:", avatarUrl)
                            setImageError(true)
                        }}
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-[#FBADCC] flex items-center justify-center text-white font-semibold text-sm">
                        {initials || "?"}
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p
                    className="text-sm font-medium text-white truncate"
                    title={name}
                >
                    {name}
                </p>

                <p className="text-[11px] text-gray-500 truncate">
                    {roleLabel}
                </p>
            </div>
        </div>
    )
}