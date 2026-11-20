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
  getConcert: (params = {}) => apiFetch(`/concerts?${new URLSearchParams(params)}`),
  getDetailConcert: (id) => apiFetch(`/concerts/${id}`),
  getMyConcert: () => apiFetch('/concerts/my'),
}

export const orderApi = {
  createOrder: (body) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getOrder:   (status) => apiFetch(`/orders${status ? `?status=${status}` : ''}`),
  detailOrder: (id) => apiFetch(`/orders/${id}`),
  cancelOrder: (id) => apiFetch(`/orders/${id}/cancel`, { method: 'POST' }),
  payOrder:    (id) => apiFetch(`/orders/${id}/pay`, { method: 'POST' }),
  statusOrder: (id) => apiFetch(`/orders/${id}/status`),
};
export const ticketApi = {
  getTicket:   () => apiFetch('/tickets'),
  detailTicket: (id) => apiFetch(`/tickets/${id}`),   // includes qr_image
};
export const notifApi = {
  getNotif:    (unread) => apiFetch(`/notifications${unread ? '?unread=true' : ''}`),
  readNotif:    (id) => apiFetch(`/notifications/${id}/read`, { method: 'PATCH' }),
  readAllNotif: () => apiFetch('/notifications/read-all', { method: 'PATCH' }),
  removeNotif:  (id) => apiFetch(`/notifications/${id}`, { method: 'DELETE' }),
};