import { getToken } from '../utils/auth.js'

export const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, status = 0, fieldErrors = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

function parseBody(response) {
  return response.text().then((text) => {
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  })
}

function extractErrorMessage(body, response) {
  if (body && typeof body === 'object') {
    if (typeof body.message === 'string' && body.message.trim()) return body.message
    if (typeof body.title === 'string' && body.title.trim()) return body.title
  }
  if (typeof body === 'string' && body.trim()) return body
  if (response.status === 401) return 'Invalid email or password.'
  if (response.status === 404) return 'The requested resource was not found.'
  if (response.status >= 500) return 'The server encountered an error. Please try again later.'
  return response.statusText || 'Something went wrong. Please try again.'
}

function extractFieldErrors(body) {
  const errors = body && typeof body === 'object' ? body.errors : null
  if (!errors || typeof errors !== 'object') return null
  const fieldErrors = {}
  for (const [key, value] of Object.entries(errors)) {
    fieldErrors[key] = Array.isArray(value)
      ? value.join(' ')
      : String(value)
  }
  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null
}

export async function apiRequest(path, { method = 'GET', body, authenticated = false, signal } = {}) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (authenticated) {
    const token = getToken()
    if (!token) throw new ApiError('You are not signed in. Please sign in and try again.', 401)
    headers.Authorization = `Bearer ${token}`
  }

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      signal,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    if (signal?.aborted) {
      const abortError = new Error('Request aborted')
      abortError.name = 'AbortError'
      throw abortError
    }
    throw new ApiError(
      'Unable to reach the server. Check that the API is running and that VITE_API_BASE_URL is configured.',
      0,
    )
  }

  const payload = await parseBody(response)
  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(payload, response),
      response.status,
      extractFieldErrors(payload),
    )
  }
  return payload
}
