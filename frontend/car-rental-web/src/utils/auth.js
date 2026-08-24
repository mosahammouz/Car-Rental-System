const TOKEN_KEY = 'car-rental-token'

export function getToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function saveToken(token) {
  if (!token) return
  try {
    window.localStorage.setItem(TOKEN_KEY, token)
  } catch {
    return
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    return
  }
}

export function isAuthenticated() {
  return Boolean(getToken())
}

export function getTokenClaims(token = getToken()) {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return JSON.parse(window.atob(padded))
  } catch {
    return null
  }
}
