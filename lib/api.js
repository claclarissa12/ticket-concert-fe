const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("token")
      : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.message || `Gagal (Status: ${res.status})`);
  }

  return json; // { status, message, data }
}

export const authApi = {

  register: (body) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getme: () => apiFetch('/auth/getMe'),
}

export const adminApi = {
  getAllUser: () => apiFetch('/admin/users'),
  getUsers: () => apiFetch('/admin/users'),
  getDashboard: () => apiFetch('/admin/dashboard'),
  getAllEO: () => apiFetch('/admin/eo'),
  createEO: (body) => apiFetch('/admin/eo', { method: 'POST', body: JSON.stringify(body) }),
  approveEO: (id) => apiFetch(`/admin/eo/${id}/approve`, { method: 'PATCH' }),
  rejectEO: (id) => apiFetch(`/admin/eo/${id}/reject`, { method: 'PATCH' }),
}

export const concertApi = {
  getConcert: (body) => apiFetch('/concerts', { method: 'GET', body: JSON.stringify(body) }),
  getDetailConcert: (id) => apiFetch(`/concerts/${id}`),
  getMyConcert: () => apiFetch('/concerts /my'),
}