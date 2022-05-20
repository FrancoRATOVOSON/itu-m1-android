import { NextFunction, Request, Response } from 'express'
import { verifytoken } from '../tools/jwt'
import { LOGIN_REQUIRED_ERROR } from '../utils/const'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token) {
    const decodedToken = verifytoken(token)
    if (
      typeof decodedToken !== 'string' &&
      decodedToken.id &&
      decodedToken.email
    ) {
      req.userId = decodedToken.id
      next()
    }
  } else res.status(401).json({ message: LOGIN_REQUIRED_ERROR })
}
