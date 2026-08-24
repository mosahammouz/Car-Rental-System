import { apiRequest } from './apiClient.js'

export function registerUser(payload) {
  return apiRequest('/api/auth/register', { method: 'POST', body: payload })
}

export function loginUser({ email, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email: email.trim(), password },
  })
}
