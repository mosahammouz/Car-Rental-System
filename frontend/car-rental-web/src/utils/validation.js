export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_PATTERN = /^[+()\-\s\d]{6,20}$/

export function validateRequired(value, label) {
  return value && value.trim() ? '' : `${label} is required.`
}

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Email address is required.'
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address, e.g. name@example.com.'
  return ''
}

export function validatePassword(value) {
  if (!value) return 'Password is required.'
  if (value.length < 6) return 'Password must be at least 6 characters long.'
  return ''
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.'
  if (password !== confirmPassword) return 'Passwords do not match.'
  return ''
}

export function validatePhone(value) {
  const phone = value.trim()
  if (!phone) return 'Phone number is required.'
  if (!PHONE_PATTERN.test(phone)) return 'Enter a valid phone number (digits, spaces, +, -).'
  return ''
}

export function validateDateOfBirth(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Enter a valid date.'
  if (date.getTime() > Date.now()) return 'Date of birth cannot be in the future.'
  return ''
}

export function validateMaxDailyRate(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return ''
  const rate = Number(raw)
  if (Number.isNaN(rate) || rate < 0) return 'Enter a positive number.'
  return ''
}

export function validateRegisterForm(values) {
  return {
    firstName: validateRequired(values.firstName, 'First name'),
    lastName: validateRequired(values.lastName, 'Last name'),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
    phoneNumber: validatePhone(values.phoneNumber),
    dateOfBirth: validateDateOfBirth(values.dateOfBirth),
    addressLine1: validateRequired(values.addressLine1, 'Address line 1'),
    addressLine2: '',
    city: validateRequired(values.city, 'City'),
    country: validateRequired(values.country, 'Country'),
    driversLicenseNumber: validateRequired(values.driversLicenseNumber, "Driver's license number"),
  }
}

export function validateLoginForm(values) {
  return {
    email: validateEmail(values.email),
    password: validateRequired(values.password, 'Password'),
  }
}

export function getPasswordScore(password) {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return Math.min(score, 4)
}

export const PASSWORD_STRENGTH_LABELS = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong']
