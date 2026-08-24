import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import PasswordField from '../components/PasswordField.jsx'
import Spinner from '../components/Spinner.jsx'
import { loginUser } from '../services/authService.js'
import { saveToken } from '../utils/auth.js'
import { validateLoginForm } from '../utils/validation.js'

const INITIAL_VALUES = { email: '', password: '', rememberMe: false }

export default function LoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.title = 'Sign in · RoadGo Rentals'
  }, [])

  const errors = useMemo(() => validateLoginForm(values), [values])
  const isValid = Object.values(errors).every((message) => !message)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setGeneralError('')
  }

  function handleBlur(event) {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setGeneralError('')

    if (!isValid) {
      setTouched({ email: true, password: true })
      setGeneralError('Please fix the highlighted fields and try again.')
      return
    }

    setSubmitting(true)
    try {
      const data = await loginUser({ email: values.email, password: values.password })
      const token = data?.token ?? data?.Token ?? null
      if (!token) {
        setGeneralError('Login succeeded but the server did not return a token.')
        return
      }
      saveToken(token)
      navigate('/main', { replace: true })
    } catch (error) {
      setGeneralError(error.message || 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to browse available cars and manage your rentals."
      footer={
        <p>
          New to RoadGo? <Link to="/register">Create an account</Link>
        </p>
      }
    >
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Alert kind="error">{generalError}</Alert>
        {notice && (
          <button
            type="button"
            className="alert alert--info alert--as-text"
            onClick={() => setNotice('')}
          >
            <span className="alert__icon alert__icon--info" aria-hidden="true">
              <svg viewBox="0 0 20 20" focusable="false">
                <path
                  d="M10 9v5m0-8.2h.01M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="alert__body">Password reset is not available yet. Please contact support.</span>
          </button>
        )}

        <FormField
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ''}
          autoComplete="email"
          placeholder="you@example.com"
          required
        />

        <PasswordField
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ''}
          autoComplete="current-password"
          required
        />

        <div className="form-row form-row--split">
          <label className="checkbox" htmlFor="rememberMe">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={values.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="link-button"
            onClick={() => setNotice('Password reset is not available yet.')}
          >
            Forgot password?
          </button>
        </div>

        <button className="btn btn--primary btn--block btn--lg" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner /> Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </AuthLayout>
  )
}
