export const SERVER_ERROR = 'Oups!! Something went wrong'

export const LOGIN_REQUIRED_ERROR =
  'You must be logged in to perform this action'

export const FIELD_MISSING = 'Fields missing: '

export const INVALID_EMAIL_FORMAT = 'Invalid email format'
export const USER_ALREADY_EXISTS = 'User already exists'
export const USER_DOESNT_EXIST = 'User not found'

const passwordMustContains = (missingPart: string) =>
  `Password must contain at least ${missingPart}`

export const PASSWORD_LENGTH_ERROR = passwordMustContains('6 characters')
export const PASSWORD_UPPERCASE_ERROR = passwordMustContains('1 capital letter')
export const PASSWORD_LOWERCASE_ERROR =
  passwordMustContains('1 lowercase letter')
export const PASSWORD_DIGIT_ERROR = passwordMustContains(
  '1 numerical character'
)
export const PASSWORD_NONALPHA_ERROR = passwordMustContains(
  '1 special character'
)
