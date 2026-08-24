import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert.jsx'
import CarCard from '../components/CarCard.jsx'
import FormField from '../components/FormField.jsx'
import Logo from '../components/Logo.jsx'
import Spinner from '../components/Spinner.jsx'
import { searchCars } from '../services/carService.js'
import { clearToken, getTokenClaims } from '../utils/auth.js'
import { validateMaxDailyRate } from '../utils/validation.js'

const INITIAL_FILTERS = { location: '', maxDailyRate: '' }

function describeFilters(filters) {
  const parts = []
  if (filters.location.trim()) parts.push(`in ${filters.location.trim()}`)
  if (String(filters.maxDailyRate).trim()) parts.push(`up to $${Number(filters.maxDailyRate).toFixed(2)}/day`)
  return parts.length > 0 ? `Showing cars ${parts.join(' ')}` : ''
}

export default function MainPage() {
  const navigate = useNavigate()
  const [draft, setDraft] = useState(INITIAL_FILTERS)
  const [applied, setApplied] = useState(INITIAL_FILTERS)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const abortRef = useRef(null)

  const claims = useMemo(() => getTokenClaims(), [])
  const email = claims?.email || claims?.sub || 'your account'
  const initials = useMemo(() => {
    const source = String(email).trim()
    const segments = source.split(/[\s@._-]+/).filter(Boolean)
    if (segments.length === 0) return '?'
    return segments.slice(0, 2).map((segment) => segment.charAt(0).toUpperCase()).join('')
  }, [email])

  const rateError = validateMaxDailyRate(draft.maxDailyRate)

  const loadCars = useCallback(async (filters) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const data = await searchCars(filters, { signal: controller.signal })
      if (controller.signal.aborted) return
      setCars(data)
      setError('')
    } catch (caught) {
      if (controller.signal.aborted || caught?.name === 'AbortError') return
      setCars([])
      setError(caught?.message || 'Unable to load cars. Please try again.')
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    searchCars(INITIAL_FILTERS, { signal: controller.signal })
      .then((data) => {
        if (!active) return
        setCars(data)
        setLoading(false)
      })
      .catch((caught) => {
        if (!active || caught?.name === 'AbortError') return
        setCars([])
        setError(caught?.message || 'Unable to load cars. Please try again.')
        setLoading(false)
      })
    return () => {
      active = false
      controller.abort()
    }
  }, [])

  useEffect(() => {
    document.title = 'Find your ride · RoadGo Rentals'
  }, [])

  function handleDraftChange(event) {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
  }

  function beginLoad(filters) {
    setLoading(true)
    setError('')
    loadCars(filters)
  }

  function handleSearch(event) {
    event.preventDefault()
    if (validateMaxDailyRate(draft.maxDailyRate)) return
    setApplied({ ...draft })
    beginLoad(draft)
  }

  function handleReset() {
    const cleared = { location: '', maxDailyRate: '' }
    setDraft(cleared)
    setApplied(cleared)
    beginLoad(cleared)
  }

  function handleLogout() {
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/main" className="site-header__brand" aria-label="RoadGo home">
            <Logo variant="light" />
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <a href="#fleet" className="site-nav__link is-active">
              Available cars
            </a>
            <span className="site-nav__link site-nav__link--disabled" title="Profile management coming soon">
              Profile
            </span>
          </nav>
          <div className="header-actions">
            <span className="user-chip" title={`Signed in as ${email}`}>
              <span className="user-chip__avatar" aria-hidden="true">
                {initials}
              </span>
              <span className="user-chip__meta">
                <span className="user-chip__name">{email}</span>
                <span className="user-chip__role">Member</span>
              </span>
            </span>
            <button type="button" className="btn btn--ghost-light" onClick={handleLogout}>
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path
                  d="M12.5 6.5v-1a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1m2.5-8.5 3 3-3 3m3-3H7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="page-head container">
          <h1>Find your next ride</h1>
          <p>
            Browse our fleet, filter by location and daily rate, and hit the road with RoadGo.
          </p>
        </section>

        <section className="container" aria-labelledby="search-heading">
          <form className="search-card" onSubmit={handleSearch} noValidate aria-busy={loading}>
            <h2 id="search-heading" className="visually-hidden">
              Search for cars
            </h2>
            <svg className="search-card__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.9-.7L21 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <div className="search-card__fields">
              <FormField
                label="Location"
                name="location"
                value={draft.location}
                onChange={handleDraftChange}
                placeholder="e.g. Nablus"
                autoComplete="off"
              />
              <FormField
                label="Maximum daily rate ($)"
                name="maxDailyRate"
                type="number"
                value={draft.maxDailyRate}
                onChange={handleDraftChange}
                placeholder="e.g. 50"
                min="0"
                step="0.01"
                inputMode="decimal"
                error={rateError}
              />
            </div>
            <div className="search-card__actions">
              <button type="submit" className="btn btn--primary btn--lg" disabled={Boolean(rateError)}>
                Search
              </button>
              <button type="button" className="btn btn--outline btn--lg" onClick={handleReset}>
                Clear
              </button>
            </div>
          </form>
        </section>

        <section id="fleet" className="container fleet-section" aria-labelledby="results-heading">
          <div className="fleet-section__head">
            <h2 id="results-heading">Available cars</h2>
            {!loading && !error && (
              <span className="count-badge">
                {cars.length} {cars.length === 1 ? 'car' : 'cars'}
              </span>
            )}
          </div>
          {describeFilters(applied) && !loading && !error && (
            <p className="fleet-section__summary">
              {describeFilters(applied)} ·{' '}
              <button type="button" className="link-button" onClick={handleReset}>
                Clear filters
              </button>
            </p>
          )}

          {loading && (
            <div className="fleet-loading">
              <Spinner label="Loading cars…" />
            </div>
          )}

          {!loading && error && (
            <Alert kind="error">
              {error}
              <span className="alert__actions">
                <button type="button" className="btn btn--outline btn--sm" onClick={() => beginLoad(applied)}>
                  Try again
                </button>
              </span>
            </Alert>
          )}

          {!loading && !error && cars.length === 0 && (
            <div className="empty-state">
              <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                <path
                  d="M6.5 19.5l2.1-5.7A3.4 3.4 0 0 1 11.8 11.5h8.4a3.4 3.4 0 0 1 3.2 2.3l2.1 5.7v4.2a1.2 1.2 0 0 1-1.2 1.2h-1.8a1.2 1.2 0 0 1-1.2-1.2v-.9H10.7v.9a1.2 1.2 0 0 1-1.2 1.2H7.7a1.2 1.2 0 0 1-1.2-1.2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
                <path d="M8 17.6h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
              <h3>No cars found</h3>
              <p>We couldn't find any cars matching your filters. Try widening your search.</p>
              <button type="button" className="btn btn--primary" onClick={handleReset}>
                Show all cars
              </button>
            </div>
          )}

          {!loading && !error && cars.length > 0 && (
            <ul className="car-grid">
              {cars.map((car) => (
                <li key={car.id ?? `${car.make}-${car.model}-${car.location}`}>
                  <CarCard car={car} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <Logo variant="light" />
          <p>© {new Date().getFullYear()} RoadGo Rentals. Booking coming soon.</p>
        </div>
      </footer>
    </div>
  )
}
