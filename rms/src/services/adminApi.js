import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const adminApi = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),

  // Users
  getUsers: () => api.get('/admin/users'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // Products
  getProducts: () => api.get('/admin/products'),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  createProduct: (data) => {
    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price || 0);
      formData.append("category", data.category || "");
      formData.append("special", data.special || false);
      formData.append("isAvailable", data.isAvailable || true);
      formData.append("image", data.image);
      return api.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return api.post('/admin/products', data);
  },
  updateProduct: (id, data) => {
    if (data.image instanceof File) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price || 0);
      formData.append("category", data.category || "");
      formData.append("special", data.special || false);
      formData.append("isAvailable", data.isAvailable || true);
      formData.append("image", data.image);
      return api.put(`/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return api.put(`/admin/products/${id}`, data);
  },
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Orders
  getOrders: () => api.get('/admin/orders'),
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, data) => api.put(`/admin/orders/${id}`, data),
  deleteOrder: (id) => api.delete(`/admin/orders/${id}`),

  // Audits
  getAudits: ({ page = 1, limit = 20, resource, action } = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (resource) params.append('resource', resource);
    if (action) params.append('action', action);
    return api.get(`/admin/audits?${params.toString()}`);
  }
};

export default adminApi;
