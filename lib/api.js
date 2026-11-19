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
  getConcert: () => apiFetch('/admin/concert'),
  removeConcert: (id) => apiFetch(`/admin/concert/${id}`, { method: "DELETE" }),
  getDashboard: () => apiFetch('/admin/dashboard'),
  getAllEO: () => apiFetch('/admin/eo'),
  createEO: (body) => apiFetch('/admin/eo', { method: 'POST', body: JSON.stringify(body) }),
  approveEO: (id) => apiFetch(`/admin/eo/${id}/approve`, { method: 'PATCH' }),
  rejectEO: (id) => apiFetch(`/admin/eo/${id}/reject`, { method: 'PATCH' }),
  getAllOrders: (params = {}) => apiFetch(
    `/admin/orders?page=${params.page || 1}&limit=${params.limit || 10}${params.status && params.status !== "all" ? `&status=${params.status}` : ""}`
  ),
}

export const organizerApi = {
  getMyConcert: () => apiFetch(`/eo/concerts`),
  publishConcert: (id) => apiFetch(`/eo/concerts/${id}/publish`, { method: "PATCH" }),
  getDashboard: () => apiFetch(`/eo/dashboard`),
  createConcert: (body) => apiFetch("/eo/concerts", { method: "POST", body: JSON.stringify(body) }),
  getMyConcertById: (id) => apiFetch(`/eo/concerts/${id}`),
  updateConcert: (id, body) => apiFetch(`/eo/concerts/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteConcert: (id) => apiFetch(`/eo/concerts/${id}`, { method: "DELETE" }),
  getTiers: (concertId) => apiFetch(`/eo/concerts/${concertId}/tiers`, { method: 'GET' }),
  createTier: (concertId, body) => apiFetch(`/eo/concerts/${concertId}/tiers`, { method: "POST", body: JSON.stringify(body) }),
  updateTier: (id, body) => apiFetch(`/eo/tiers/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteTier: (id) => apiFetch(`/eo/tiers/${id}`, { method: "DELETE" }),
  getConcertReport: (id) => apiFetch(`/eo/concerts/${id}/report`),
  scanTicket: (body) => apiFetch("/eo/gate/scan", { method: "POST", body: JSON.stringify(body) }),
  getCheckinCount: (concertId) => apiFetch(`/eo/gate/concerts/${concertId}/count`),
  getConcertOrder: (id, params) => apiFetch(`/eo/concerts/${id}/orders?page=${params.page}&limit=${params.limit}${params.status ? `&status=${params.status}` : ''}`),
  getProfile: () => apiFetch(`/eo/profile`),
  getProfile: () => apiFetch("/eo/profile"),
  updateProfile: (body) => apiFetch("/eo/profile", { method: "PUT", body: JSON.stringify(body) }),
}

export const concertApi = {
  getConcert: (body) => apiFetch('/concerts', { method: 'GET', body: JSON.stringify(body) }),
  getDetailConcert: (id) => apiFetch(`/concerts/${id}`),
}

