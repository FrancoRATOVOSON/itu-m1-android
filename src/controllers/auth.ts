import { Request, Response } from 'express'
import { createUser, findUser } from '../services/user'
import { verifyPassword } from '../tools/bcrypt'
import { signToken } from '../tools/jwt'
import { SERVER_ERROR, USER_DOESNT_EXIST } from '../utils/const'

export const signup = async (req: Request, res: Response) => {
  try {
    const createdUser = await createUser(req.body)
    res.status(201).json({
      token: signToken({ id: createdUser.id, email: createdUser.email })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUser(email)
    if (!user) {
      res.status(404).json({ message: USER_DOESNT_EXIST })
      return
    }
    if (await verifyPassword(password, user.password))
      res.status(200).json({
        token: signToken({ id: user.id, email })
      })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}
