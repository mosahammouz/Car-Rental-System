import { PASSWORD_STRENGTH_LABELS, getPasswordScore } from '../utils/validation.js'

export default function PasswordStrength({ password }) {
  if (!password) return null
  const score = getPasswordScore(password)
  return (
    <div className="strength" role="status" aria-live="polite">
      <div className={`strength__bars strength__bars--level-${score}`} aria-hidden="true">
        {[1, 2, 3, 4].map((step) => (
          <span key={step} className={`strength__bar${step <= score ? ' is-on' : ''}`} />
        ))}
      </div>
      <span className="strength__label">Password strength: {PASSWORD_STRENGTH_LABELS[score]}</span>
    </div>
  )
}
