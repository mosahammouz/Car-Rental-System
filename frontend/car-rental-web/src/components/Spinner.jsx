export default function Spinner({ label }) {
  return (
    <span className="spinner-group" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      {label && <span className="spinner-label">{label}</span>}
    </span>
  )
}
