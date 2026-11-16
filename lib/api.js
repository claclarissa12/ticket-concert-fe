const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  let token = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || localStorage.getItem('accessToken');
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Gagal (Status: ${res.status})`);
  }

  return res.json();
}

export const authApi = {
  register: (body) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getme: () => apiFetch('/auth/getMe'),
}

export const adminApi = {
  getAllUser: () => apiFetch('/admin/users'),
  getUsers: () => apiFetch('/admin/users'),
}