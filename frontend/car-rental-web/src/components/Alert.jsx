const ICONS = {
  error: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M10 6.5v4.2m0 3.1h.01M8.6 3.2 2.9 13.1a1.8 1.8 0 0 0 1.5 2.7h11.2a1.8 1.8 0 0 0 1.5-2.7L11.4 3.2a1.6 1.6 0 0 0-2.8 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="m4.5 10.5 3.4 3.4 7.6-7.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M10 9v5m0-8.2h.01M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
}

export default function Alert({ kind = 'info', children }) {
  if (!children) return null
  return (
    <div className={`alert alert--${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <span className={`alert__icon alert__icon--${kind}`}>{ICONS[kind] ?? ICONS.info}</span>
      <div className="alert__body">{children}</div>
    </div>
  )
}
