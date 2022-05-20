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

export type SearchCoursesParamsType = {
  term?: string
  tags?: string[]
}

export type EvalutaionType = {
  question: number
  answer: number
}
