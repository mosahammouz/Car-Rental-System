import { useId } from 'react'

export default function FormField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = 'text',
  required = false,
  autoComplete,
  placeholder,
  min,
  max,
  step,
  inputMode,
}) {
  const id = useId()
  const messageId = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

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
      <input
        id={id}
        name={name}
        type={type}
        className="field__input"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId || undefined}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        inputMode={inputMode}
      />
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
