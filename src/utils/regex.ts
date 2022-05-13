export const EMAIL_VALIDATION = /^[a-zA-Z]+[\w-\.]+[\w]+@([\w-]+\.)+[\w-]{2,4}$/

export const HAS_UPPERCASE = /[A-Z]/

export const HAS_LOWERCASE = /[a-z]/

export const HAS_NUMBER = /\d/

export const HAS_NON_ALPHA = /[\W_]/

// Dont't end with space or end line character
export const END_WELL = /([^ ])(.)$/
