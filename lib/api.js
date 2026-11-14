const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Terjadi kesalahan');
  }

  const data = await res.json();
  return data;
}


export const authApi = {
    register : (body) => apiFetch('/auth/register',  { method: 'POST', body: JSON.stringify(body) }) ,
    login : (body) => apiFetch('/auth/login',  { method: 'POST', body: JSON.stringify(body) }),
    getme: () => apiFetch('/auth/getMe'),
}