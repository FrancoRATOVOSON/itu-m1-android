import { NextFunction, Request, Response } from 'express'
import { isUserExist } from '../services/user'
import {
  FIELD_MISSING,
  INVALID_EMAIL_FORMAT,
  USER_ALREADY_EXISTS
} from '../utils/const'
import {
  isEmailAndPasswordValid,
  isEmailValid,
  loginFormValidation
} from '../utils/functions'

export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqvalid = isEmailAndPasswordValid(req.body)
  if (reqvalid !== true) res.status(400).json({ message: reqvalid })
  else next()
}

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqvalid = loginFormValidation(req.body)
  if (reqvalid !== true)
    res.status(400).json({ message: `${FIELD_MISSING}${reqvalid}` })
  else next()
}

export const emailValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body

  if (!isEmailValid(email))
    res.status(400).json({ message: INVALID_EMAIL_FORMAT })
  else next()
}

export const userNotExistingCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body
  const exists = await isUserExist(email)
  if (exists) res.status(409).json({ message: USER_ALREADY_EXISTS })
  else next()
}
