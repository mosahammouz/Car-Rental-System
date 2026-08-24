import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <aside className="auth-hero" aria-hidden="true">
        <div className="auth-hero__inner">
          <span className="auth-hero__badge">Trusted by 40,000+ drivers</span>
          <h2 className="auth-hero__title">
            Hit the road
            <br />
            in minutes.
          </h2>
          <p className="auth-hero__lead">
            Choose from thousands of well-maintained cars across 500+ locations, with transparent
            pricing and no hidden fees.
          </p>
          <ul className="auth-hero__list">
            <li>
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="m4.5 10.5 3.4 3.4 7.6-7.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Free cancellation on most bookings
            </li>
            <li>
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="m4.5 10.5 3.4 3.4 7.6-7.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Transparent daily rates, no surprises
            </li>
            <li>
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="m4.5 10.5 3.4 3.4 7.6-7.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              24/7 roadside assistance included
            </li>
          </ul>
          <dl className="auth-hero__stats">
            <div>
              <dt>500+</dt>
              <dd>Locations</dd>
            </div>
            <div>
              <dt>10k+</dt>
              <dd>Cars in fleet</dd>
            </div>
            <div>
              <dt>4.8/5</dt>
              <dd>Driver rating</dd>
            </div>
          </dl>
        </div>
        <svg className="auth-hero__road" viewBox="0 0 400 120" preserveAspectRatio="none" focusable="false">
          <path d="M0 90 Q200 -20 400 90" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="14 12" />
        </svg>
      </aside>

      <main className="auth-panel">
        <div className="auth-card">
          <Link to="/" className="auth-card__brand" aria-label="RoadGo home">
            <Logo variant="dark" />
          </Link>
          <header className="auth-card__header">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </header>
          {children}
          {footer && <footer className="auth-card__footer">{footer}</footer>}
        </div>
        <p className="auth-page__legal">© {new Date().getFullYear()} RoadGo Rentals. All rights reserved.</p>
      </main>
    </div>
  )
}
