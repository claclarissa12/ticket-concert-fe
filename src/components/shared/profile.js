
"use client"

import { useCallback, useEffect, useState } from "react"
import { authApi, assetUrl } from "../../../lib/api"

export default function AccountProfile({ roleLabel = "User" }) {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        avatar_url: ""
    })

    const [form, setForm] = useState({
        name: "",
        phone: ""
    })

    const [preview, setPreview] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

useEffect(() => {
    let isMounted = true

    const loadProfile = async () => {
        try {
            setLoading(true)
            setError("")

            const response = await authApi.getme()
            const data = response.data?.data ?? response.data

            if (!isMounted) return

            setProfile(data)

            setForm({
                name: data.name || "",
                phone: data.phone || ""
            })
        } catch (err) {
            if (isMounted) {
                console.error("GET PROFILE ERROR:", err)
                setError(err.message || "Failed to fetch profile")
            }
        } finally {
            if (isMounted) {
                setLoading(false)
            }
        }
    }

    loadProfile()

    return () => {
        isMounted = false
    }
}, [])

    // Form input
    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // Select avatar
    const handleImageChange = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Only JPG, PNG and WEBP images are allowed.")
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Image size must not exceed 2 MB.")
            return
        }

        setError("")
        setMessage("")

        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
    }

    // Upload avatar
    const handleUploadPicture = async () => {
        console.log("Selected file:", selectedFile)
        if (!selectedFile) {
            setError('Please select an image');
            return
        }

        try {
            setUploading(true)
            setError("")
            setMessage("")

            const formData = new FormData()
            formData.append("avatar", selectedFile)

            console.log("Uploading:", selectedFile.name)
            const response = await authApi.uploadProfilePicture(formData)
            console.log("Upload response:", response)
            setProfile(prev => ({
                ...prev,
                ...response.data
            }))

            setSelectedFile(null)
            setPreview("")

            window.dispatchEvent(new Event("profile-updated"))
        } catch (err) {
            console.error("AVATAR UPLOAD ERROR:", err)
            setError(err.message || "Failed to upload profile picture")
        } finally {
            setUploading(false)
        }
    }

    // Update profile information
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSaving(true)
            setError("")
            setMessage("")

            const response = await authApi.updateProfile(form)
            const data = response.data

            setProfile(prev => ({
                ...prev,
                ...data
            }))

            setForm({
                name: data.name || "",
                phone: data.phone || ""
            })

            setMessage("Profile updated successfully!")
        } catch (err) {
            console.error("UPDATE PROFILE ERROR:", err)
            setError(err.message || "Failed to update profile")
        } finally {
            setSaving(false)
        }
    }

    const initials = profile.name
        ? profile.name
            .split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U"

    const avatarSrc = preview || assetUrl(profile.avatar_url)

    return (
        <div className="max-w-full mx-auto px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Profile Settings
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Manage your account information
                </p>
            </div>

            {/* Feedback */}
            {error && (
                <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                    {error}
                </div>
            )}

            {message && (
                <div className="mb-5 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm">
                    {message}
                </div>
            )}

            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Loading profile...
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Profile card */}
                    <div className="bg-[#272727] rounded-2xl p-6 border border-[#333] h-fit text-center">

                        <div className="w-28 h-28 rounded-full bg-[#FBADCC] overflow-hidden flex items-center justify-center mx-auto">
                            {avatarSrc ? (
                                <img
                                    src={avatarSrc}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl font-bold text-black">
                                    {initials}
                                </span>
                            )}
                        </div>

                        <h2 className="text-xl font-semibold mt-4">
                            {profile.name || "User"}
                        </h2>

                        <p className="text-sm text-gray-400 mt-1 break-all">
                            {profile.email || "-"}
                        </p>

                        <div className="mt-4 inline-flex px-3 py-1 rounded-full bg-pink-500/10 text-[#FBADCC] text-xs">
                            {roleLabel}
                        </div>

                        {/* Avatar upload */}
                        <div className="mt-6 pt-5 border-t border-[#333] text-left">
                            <label className="block text-sm font-medium mb-3">
                                Profile Picture
                            </label>

                            <label className="block w-full text-center px-4 py-3 bg-[#1a1a1a] border border-[#444] rounded-xl text-sm cursor-pointer hover:border-[#FBADCC] transition">
                                Choose Image

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            <p className="text-xs text-gray-500 mt-2">
                                JPG, PNG or WEBP. Maximum 2 MB.
                            </p>

                            {selectedFile && (
                                <div className="mt-4 space-y-3">
                                    <p className="text-xs text-gray-400 break-all">
                                        {selectedFile.name}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleUploadPicture}
                                        disabled={uploading}
                                        className="w-full px-4 py-3 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                                    >
                                        {uploading ? "Uploading..." : "Save Picture"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null)
                                            setPreview("")
                                        }}
                                        className="w-full text-sm text-gray-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account form */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-[#272727] rounded-2xl p-6 border border-[#333]"
                    >
                        <h2 className="text-lg font-semibold mb-6">
                            Account Information
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    maxLength={100}
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={profile.email || ""}
                                    disabled
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] text-gray-500 cursor-not-allowed outline-none"
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    Email cannot be changed.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-xl border border-[#333] focus:border-[#FBADCC] outline-none"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-8 pt-5 border-t border-[#333]">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-3 bg-[#FBADCC] rounded-xl text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
