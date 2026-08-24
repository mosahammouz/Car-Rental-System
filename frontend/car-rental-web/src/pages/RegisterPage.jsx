import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import PasswordField from '../components/PasswordField.jsx'
import PasswordStrength from '../components/PasswordStrength.jsx'
import Spinner from '../components/Spinner.jsx'
import { registerUser } from '../services/authService.js'
import { validateRegisterForm } from '../utils/validation.js'

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  dateOfBirth: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  driversLicenseNumber: '',
}

const FIELD_NAMES = Object.keys(INITIAL_VALUES)

function mapServerFieldErrors(fieldErrors) {
  if (!fieldErrors) return {}
  const mapped = {}
  for (const [key, message] of Object.entries(fieldErrors)) {
    const match = FIELD_NAMES.find((name) => name.toLowerCase() === key.toLowerCase())
    if (match) mapped[match] = message
    else mapped[key] = message
  }
  return mapped
}

function buildRegisterPayload(values) {
  const payload = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    password: values.password,
    confirmPassword: values.confirmPassword,
    phoneNumber: values.phoneNumber.trim(),
    addressLine1: values.addressLine1.trim(),
    city: values.city.trim(),
    country: values.country.trim(),
    driversLicenseNumber: values.driversLicenseNumber.trim(),
  }
  if (values.dateOfBirth) payload.dateOfBirth = values.dateOfBirth
  if (values.addressLine2.trim()) payload.addressLine2 = values.addressLine2.trim()
  return payload
}

export default function RegisterPage() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})
  const [serverFieldErrors, setServerFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  useEffect(() => {
    document.title = 'Create account · RoadGo Rentals'
  }, [])

  const errors = useMemo(() => validateRegisterForm(values), [values])
  const isValid = Object.values(errors).every((message) => !message)
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  function fieldError(name) {
    return serverFieldErrors[name] || (touched[name] ? errors[name] : '')
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setGeneralError('')
    setServerFieldErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setServerFieldErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setGeneralError('')

    if (!isValid) {
      setTouched(Object.fromEntries(FIELD_NAMES.map((name) => [name, true])))
      setGeneralError('Please fix the highlighted fields and try again.')
      return
    }

    setSubmitting(true)
    try {
      await registerUser(buildRegisterPayload(values))
      setSucceeded(true)
      window.scrollTo({ top: 0 })
    } catch (error) {
      setServerFieldErrors(mapServerFieldErrors(error.fieldErrors))
      setGeneralError(error.message || 'Unable to create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (succeeded) {
    return (
      <AuthLayout
        title="Account created"
        subtitle="Almost there — one last step."
        footer={
          <p>
            Already verified? <Link to="/login">Sign in</Link>
          </p>
        }
      >
        <div className="register-success">
          <Alert kind="success">
            Your account has been created successfully. You can now sign in and start browsing
            available cars.
          </Alert>
          <Link to="/login" className="btn btn--primary btn--block btn--lg">
            Go to sign in
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join RoadGo to find and rent cars in minutes."
      footer={
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      }
    >
      <form className="form" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
        <Alert kind="error">{generalError}</Alert>

        <fieldset className="form-section">
          <legend>Personal details</legend>
          <div className="form-grid form-grid--2">
            <FormField
              label="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('firstName')}
              autoComplete="given-name"
              placeholder="Sarah"
              required
            />
            <FormField
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('lastName')}
              autoComplete="family-name"
              placeholder="Connor"
              required
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('email')}
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            <FormField
              label="Phone number"
              name="phoneNumber"
              type="tel"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('phoneNumber')}
              autoComplete="tel"
              placeholder="+970 59 123 4567"
              required
            />
            <FormField
              label="Date of birth"
              name="dateOfBirth"
              type="date"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('dateOfBirth')}
              autoComplete="bday"
              max={today}
              hint="Optional"
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Password</legend>
          <div className="form-grid form-grid--2">
            <PasswordField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('password')}
              autoComplete="new-password"
              required
            />
            <PasswordField
              label="Confirm password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('confirmPassword')}
              autoComplete="new-password"
              required
            />
          </div>
          <PasswordStrength password={values.password} />
        </fieldset>

        <fieldset className="form-section">
          <legend>Address</legend>
          <div className="form-grid">
            <FormField
              label="Address line 1"
              name="addressLine1"
              value={values.addressLine1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('addressLine1')}
              autoComplete="address-line1"
              placeholder="Street address"
              required
            />
            <FormField
              label="Address line 2"
              name="addressLine2"
              value={values.addressLine2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('addressLine2')}
              autoComplete="address-line2"
              placeholder="Apartment, suite… (optional)"
            />
          </div>
          <div className="form-grid form-grid--2">
            <FormField
              label="City"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('city')}
              autoComplete="address-level2"
              placeholder="Nablus"
              required
            />
            <FormField
              label="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError('country')}
              autoComplete="country-name"
              placeholder="Palestine"
              required
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Driver information</legend>
          <FormField
            label="Driver's license number"
            name="driversLicenseNumber"
            value={values.driversLicenseNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError('driversLicenseNumber')}
            placeholder="e.g. DL-123456789"
            required
          />
        </fieldset>

        <button className="btn btn--primary btn--block btn--lg" type="submit" disabled={submitting || !isValid}>
          {submitting ? (
            <>
              <Spinner /> Creating account…
            </>
          ) : (
            'Create account'
          )}
        </button>
        <p className="form-footnote">Fields marked with * are required.</p>
      </form>
    </AuthLayout>
  )
}
