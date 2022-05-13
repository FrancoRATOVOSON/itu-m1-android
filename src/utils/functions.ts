import {
  FIELD_MISSING,
  INVALID_EMAIL_FORMAT,
  PASSWORD_DIGIT_ERROR,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_LOWERCASE_ERROR,
  PASSWORD_NONALPHA_ERROR,
  PASSWORD_UPPERCASE_ERROR
} from './const'
import {
  EMAIL_VALIDATION,
  HAS_LOWERCASE,
  HAS_NON_ALPHA,
  HAS_NUMBER,
  HAS_UPPERCASE
} from './regex'
import { LoginInput, SignupInput, ValidationResult } from './types'

export function isEmailValid(email: string) {
  const localPartLength = email.split('@')[0].length
  return (
    localPartLength >= 1 &&
    localPartLength <= 64 &&
    EMAIL_VALIDATION.test(email)
  )
}

export function isPasswordValid(password: string): ValidationResult {
  if (password.length < 6) return PASSWORD_LENGTH_ERROR
  if (!HAS_UPPERCASE.test(password)) return PASSWORD_UPPERCASE_ERROR
  if (!HAS_LOWERCASE.test(password)) return PASSWORD_LOWERCASE_ERROR
  if (!HAS_NUMBER.test(password)) return PASSWORD_DIGIT_ERROR
  if (!HAS_NON_ALPHA.test(password)) return PASSWORD_NONALPHA_ERROR
  return true
}

export function isEmailAndPasswordValid(
  input: Partial<SignupInput>
): true | string {
  const formValidation = signupFormValidation(input)
  if (formValidation !== true) {
    return formValidation
  }

  const { email, password } = input
  if (!isEmailValid(email as string)) {
    return INVALID_EMAIL_FORMAT
  }

  const passwordValidation = isPasswordValid(password as string)
  if (passwordValidation !== true) {
    return passwordValidation
  }

  return true
}

export function loginFormValidation(
  fields: Partial<LoginInput>
): ValidationResult {
  const { email, password } = fields
  let message = ''
  let isValid = true

  if (!email) {
    message += '-<email>'
    isValid = false
  }
  if (!password) {
    message += '-<password>'
    isValid = false
  }

  return isValid || message
}

export function signupFormValidation(
  fields: Partial<SignupInput>
): ValidationResult {
  const { email, password, firstname, lastname } = fields
  let message = FIELD_MISSING
  let isValid = true

  const login = loginFormValidation({ email, password })

  if (login !== true) {
    message += login
    isValid = false
  }
  if (!firstname) {
    message += '-<firstName>'
    isValid = false
  }
  if (!lastname) {
    message += '-<lastName>'
    isValid = false
  }

  return isValid || message
}
