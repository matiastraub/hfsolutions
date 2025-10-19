import { apiClient } from './index'
import { API_ENDPOINTS } from './endpoints'

export const productService = {
  getAll: () => apiClient.get(API_ENDPOINTS.PRODUCTS),
  getById: (id) => apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`),
  create: (data) => apiClient.post(API_ENDPOINTS.PRODUCTS, data),
  update: (id, data) => apiClient.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, data),
  delete: (id) => apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`),
}
