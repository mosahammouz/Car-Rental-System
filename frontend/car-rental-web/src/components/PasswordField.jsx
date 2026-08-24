import { useId, useState } from 'react'

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  autoComplete,
}) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const messageId = [hint && !error && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

  return (
    <div className={`field${error ? ' field--invalid' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="field__password-wrap">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          className="field__input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId || undefined}
          aria-required={required || undefined}
          autoComplete={autoComplete}
          placeholder="••••••••"
        />
        <button
          type="button"
          className="field__toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M3 3l18 18M10.6 5.1A9.8 9.8 0 0 1 12 5c5 0 8.6 3.6 10 7-.5 1.2-1.3 2.5-2.4 3.6M6.2 6.2C4.3 7.5 2.9 9.4 2 12c1.4 3.4 5 7 10 7 1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 1 0 4.2 4.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M12 5c-5 0-8.6 3.6-10 7 1.4 3.4 5 7 10 7s8.6-3.6 10-7c-1.4-3.4-5-7-10-7Zm0 10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
