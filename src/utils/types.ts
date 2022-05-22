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

export type EvaluationInputType = {
  question: string
  options: string[]
  answer: string
}

export type ChapterInputType = {
  title: string
  description: string
  video: string
  evaluation: EvaluationInputType[]
}

export type CourseInputType = {
  title: string
  description: string
  cover: string
  chapters: ChapterInputType[]
}
