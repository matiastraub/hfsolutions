import { apiClient } from './index'
import { API_ENDPOINTS } from './endpoints'

export const categoryService = {
  getAll: () => apiClient.get(API_ENDPOINTS.CATEGORIES),
  create: (data) => apiClient.post(API_ENDPOINTS.CATEGORIES, data),
  update: (id, data) => apiClient.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, data)
}
