import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_KEY = process.env.TOKEN_SECRET_KEY || 'TOKEN_SECRET_KEY'

export function signToken(paload: string | object | Buffer) {
  return jwt.sign(paload, JWT_KEY, {
    algorithm: 'HS512'
  })
}

export function verifytoken(token: string) {
  return jwt.verify(token, JWT_KEY, {
    algorithms: ['HS512']
  })
}
