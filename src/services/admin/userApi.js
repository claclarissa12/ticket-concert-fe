const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

async function request(path, options = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })

    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json.message || `Request gagal (${res.status})`)
    return json
}

export const userApi = {
    getAllUser: (limit = 100) => request(`/admin/users?limit=${limit}`),
    getAllEO: (limit = 100) => request(`/admin/eo?limit=${limit}`),

    // role user -> /users/:id/status, organizer -> approve / reject
    toggleStatus: (user) => {
        if (user.role === "event_organizer") {
            const action = user.is_active ? "reject" : "approve"
            return request(`/admin/eo/${user.id}/${action}`, { method: "PATCH" })
        }
        return request(`/admin/users/${user.id}/status`, { method: "PATCH" })
    },
}