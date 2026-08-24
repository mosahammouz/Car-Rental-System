export default function Logo({ variant = 'dark' } = {}) {
  return (
    <span className={`logo logo--${variant}`}>
      <svg
        className="logo__mark"
        viewBox="0 0 32 32"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="32" height="32" rx="9" fill="currentColor" opacity="0.14" />
        <path
          d="M6.5 19.5l2.1-5.7A3.4 3.4 0 0 1 11.8 11.5h8.4a3.4 3.4 0 0 1 3.2 2.3l2.1 5.7v4.2a1.2 1.2 0 0 1-1.2 1.2h-1.8a1.2 1.2 0 0 1-1.2-1.2v-.9H10.7v.9a1.2 1.2 0 0 1-1.2 1.2H7.7a1.2 1.2 0 0 1-1.2-1.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path d="M8 17.6h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        Road<span>Go</span>
      </span>
    </span>
  )
}
