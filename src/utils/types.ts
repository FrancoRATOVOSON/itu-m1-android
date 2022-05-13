import { Prisma } from '@prisma/client'

export type ValidationResult = true | string

export type LoginInput = {
  email: string
  password: string
}

export type SignupInput = Omit<
  Prisma.UserCreateInput,
  'subscriptions' | 'progrssions'
>
