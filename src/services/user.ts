import { Prisma } from '@prisma/client'
import { hashPassword } from '../tools/bcrypt'
import prisma from '../tools/prisma'

export async function createUser({
  password,
  ...user
}: Prisma.UserCreateInput) {
  return prisma.user.create({
    data: {
      password: await hashPassword(password),
      ...user
    }
  })
}

export function findUser(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function isUserExist(email: string) {
  try {
    const userFound = await findUser(email)
    if (userFound) return true
    return false
  } catch (err) {
    throw new Error(err)
  }
}
