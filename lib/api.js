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
  statusUser: (id) => apiFetch(`/admin/users/${id}/status`, { method: 'PATCH' }),

  getConcert: () => apiFetch('/admin/concert'),
  removeConcert: (id) => apiFetch(`/admin/concert/${id}`, { method: "DELETE" }),
  getDashboard: () => apiFetch('/admin/dashboard'),
  getAllEO: () => apiFetch('/admin/eo'),
  createEO: (body) => apiFetch('/admin/eo', { method: 'POST', body: JSON.stringify(body) }),
  approveEO: (id) => apiFetch(`/admin/eo/${id}/approve`, { method: 'PATCH' }),
  rejectEO: (id) => apiFetch(`/admin/eo/${id}/reject`, { method: 'PATCH' }),
  getAllOrders: () => apiFetch(`/admin/orders`),
}

export const organizerApi = {
  getDashboard: () => apiFetch(`/eo/dashboard`),
  getProfile: () => apiFetch(`/eo/profile`),
  updateProfile: (body) => apiFetch("/eo/profile", { method: "PUT", body: JSON.stringify(body) }),

  createConcert: (body) => apiFetch("/eo/concerts", { method: "POST", body: JSON.stringify(body) }),
  getMyConcert: () => apiFetch(`/eo/concerts`),
  getMyConcertById: (id) => apiFetch(`/eo/concerts/${id}`),
  updateConcert: (id, body) => apiFetch(`/eo/concerts/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteConcert: (id) => apiFetch(`/eo/concerts/${id}`, { method: "DELETE" }),
  publishConcert: (id) => apiFetch(`/eo/concerts/${id}/publish`, { method: "PATCH" }),
 
  getTiers: (concertId) => apiFetch(`/eo/concerts/${concertId}/tiers`, { method: 'GET' }),
  createTier: (concertId, body) => apiFetch(`/eo/concerts/${concertId}/tiers`, { method: "POST", body: JSON.stringify(body) }),
  updateTier: (id, body) => apiFetch(`/eo/tiers/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteTier: (id) => apiFetch(`/eo/tiers/${id}`, { method: "DELETE" }),
  
  getConcertReport: (id) => apiFetch(`/eo/concerts/${id}/report`),
  getConcertOrder: (id, params) => apiFetch(`/eo/concerts/${id}/orders?page=${params.page}&limit=${params.limit}${params.status ? `&status=${params.status}` : ''}`),
 
  scanTicket: (body) => apiFetch("/gate/scan", { method: "POST", body: JSON.stringify(body) }),
  getCheckinCount: (concertId) => apiFetch(`/gate/concerts/${concertId}/count`),
}

export const concertApi = {
  getConcert: (params = {}) => apiFetch(`/concerts?${new URLSearchParams(params)}`),
  getDetailConcert: (id) => apiFetch(`/concerts/${id}`),
  getMyConcert: () => apiFetch('/concerts/my'),
}

export const orderApi = {
  createOrder: (body) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getOrder: (status) => apiFetch(`/orders${status ? `?status=${status}` : ''}`),
  detailOrder: (id) => apiFetch(`/orders/${id}`),
  cancelOrder: (id) => apiFetch(`/orders/${id}/cancel`, { method: 'POST' }),
  payOrder: (id) => apiFetch(`/orders/${id}/pay`, { method: 'POST' }),
  statusOrder: (id) => apiFetch(`/orders/${id}/status`),
};
export const ticketApi = {
  getTicket: () => apiFetch('/tickets'),
  detailTicket: (id) => apiFetch(`/tickets/${id}`),   // includes qr_image
};
export const notifApi = {
  getNotif: (unread) => apiFetch(`/notifications${unread ? '?unread=true' : ''}`),
  readNotif: (id) => apiFetch(`/notifications/${id}/read`, { method: 'PATCH' }),
  readAllNotif: () => apiFetch('/notifications/read-all', { method: 'PATCH' }),
  removeNotif: (id) => apiFetch(`/notifications/${id}`, { method: 'DELETE' }),
};



