import express from 'express'
import { login, signup } from '../controllers/auth'
import {
  emailValidation,
  loginValidation,
  signupValidation,
  userNotExistingCheck
} from '../middlewares/auth'

const router = express.Router()

router.post('/login', loginValidation, emailValidation, login)
router.post('/signup', signupValidation, userNotExistingCheck, signup)

export default router
