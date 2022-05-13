import bcrypt from 'bcrypt'

const BCRYPT_HASH_ROUND = 10

export function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_HASH_ROUND)
}

export function verifyPassword(password: string, encrypted: string) {
  return bcrypt.compare(password, encrypted)
}
