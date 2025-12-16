const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  },

  // Auth endpoints
  auth: {
    login: (email, password) =>
      api.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    register: (name, email, password, role = 'customer') =>
      api.request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) }),
    setupAdmin: (name, email, password) =>
      api.request('/auth/setup-admin', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  },

  // Admin endpoints
  admin: {
    users: {
      list: () => api.request('/admin/users'),
      get: (id) => api.request(`/admin/users/${id}`),
      update: (id, data) => api.request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id) => api.request(`/admin/users/${id}`, { method: 'DELETE' }),
    },
    products: {
      list: () => api.request('/admin/products'),
      get: (id) => api.request(`/admin/products/${id}`),
      create: (data) => api.request('/admin/products', { method: 'POST', body: JSON.stringify(data) }),
      update: (id, data) => api.request(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
      delete: (id) => api.request(`/admin/products/${id}`, { method: 'DELETE' }),
    },
    orders: {
      list: () => api.request('/admin/orders'),
      get: (id) => api.request(`/admin/orders/${id}`),
      updateStatus: (id, status) => api.request(`/admin/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
      delete: (id) => api.request(`/admin/orders/${id}`, { method: 'DELETE' }),
    },
  },

  // Customer endpoints
  customer: {
    products: {
      list: () => api.request('/customer/products'),
      get: (id) => api.request(`/customer/products/${id}`),
    },
    orders: {
      list: () => api.request('/customer/orders'),
      get: (id) => api.request(`/customer/orders/${id}`),
      create: (data) => api.request('/customer/orders', { method: 'POST', body: JSON.stringify(data) }),
    },
  },

  // Contact endpoints
  contact: {
    submit: (data) => api.request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
};

export default api;
