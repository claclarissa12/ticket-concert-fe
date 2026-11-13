const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'


async function apiFetch(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData (multipart) 
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
}


export const authApi = {
    register : (body) => apiFetch('/auth/register',  { method: 'POST', body: JSON.stringify(body) }) ,
    login : (body) => apiFetch('/auth/login',  { method: 'POST', body: JSON.stringify(body) }),
    getme: () => apiFetch('/auth/getMe'),
}


