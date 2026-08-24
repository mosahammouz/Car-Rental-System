import { apiRequest } from './apiClient.js'

function buildCarsQuery(filters = {}) {
  const params = new URLSearchParams()

  const location = typeof filters.location === 'string' ? filters.location.trim() : ''
  if (location) params.set('location', location)

  const rawRate = String(filters.maxDailyRate ?? '').trim()
  if (rawRate) {
    const rate = Number(rawRate)
    if (!Number.isNaN(rate) && rate >= 0) {
      params.set('maxDailyRate', String(rate))
    }
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

function normalizeCar(raw, index) {
  const source = raw ?? {}

  const pick = (...keys) => {
    for (const key of keys) {
      if (source[key] !== undefined && source[key] !== null) {
        return source[key]
      }
    }
    return undefined
  }

  return {
    id: pick('id', 'Id') ?? index,
    make: String(pick('make', 'Make') ?? ''),
    model: String(pick('model', 'Model') ?? ''),
    year: pick('year', 'Year'),
    location: String(pick('location', 'Location') ?? ''),
    dailyRate: pick('dailyRate', 'DailyRate'),
    isAvailable: Boolean(pick('isAvailable', 'IsAvailable')),
  }
}

export async function searchCars(filters = {}, { signal } = {}) {
  const data = await apiRequest(
      `/api/cars/available${buildCarsQuery(filters)}`,
      { authenticated: true, signal }
  )

  const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.data)
              ? data.data
              : []

  return list.map(normalizeCar)
}