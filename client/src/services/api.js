import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};

export const books = {
  getAll: async (params) => {
    const response = await api.get('/books', { params });
    return response.data;
  },

  addBook: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  updateBook: async (bookId, bookData) => {
    const response = await api.put(`/books/${bookId}`, bookData);
    return response.data;
  },

  deleteBook: async (bookId) => {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
  },

  requestExchange: async (bookId) => {
    const response = await api.post(`/books/${bookId}/exchange-request`);
    return response.data;
  }
};

export const exchanges = {
  getAll: () => api.get('/exchanges'),
  updateStatus: (id, status) => api.put(`/exchanges/${id}`, { status }),
};

export default api; 