import { config } from '../config'

const API_BASE_URL = config.apiUrl

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) throw new Error('La solicitud de API falló')
    return response.json()
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('La solicitud de API falló')
    return response.json()
  },

  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('La solicitud de API falló')
    return response.json()
  },

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('La solicitud de API falló')
    return response.json()
  }
}
