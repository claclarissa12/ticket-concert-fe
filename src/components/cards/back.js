"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "Kembali", className = "" }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            <span>{label}</span>
        </button>
    );
}