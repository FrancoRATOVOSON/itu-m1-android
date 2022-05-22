import prisma from '../tools/prisma'
import {
  ChapterInputType,
  CourseInputType,
  EvaluationInputType,
  SearchCoursesParamsType
} from '../utils/types'

const COURSE_LIST_RETURNED_FIELDS = {
  id: true,
  title: true,
  description: true,
  coverUrl: true
}

const COURSE_RETURNED_FIELDS = {
  title: true,
  description: true,
  coverUrl: true,
  chapters: { select: { id: true, title: true } }
}

const SEARCH_BY_TERM_CONDITION = term => ({ title: { contains: term } })
const SEARCH_BY_TAG_CONDITION = tags => ({
  tags: { some: { tagValue: { in: tags } } }
})

export function getCourses() {
  return prisma.course.findMany({ select: COURSE_LIST_RETURNED_FIELDS })
}

export function getCoursesByParams({ term, tags }: SearchCoursesParamsType) {
  if (!term && !tags) return getCourses()
  if (term && !tags) return searchCourse(term)
  if (!term && tags) return getCoursesByTags(tags)
  if (term && tags) return searchCoursesWithTag(term, tags)
}

export function searchCourse(term: string) {
  return prisma.course.findMany({
    where: SEARCH_BY_TERM_CONDITION(term),
    select: COURSE_LIST_RETURNED_FIELDS
  })
}

export function getCoursesByTags(tags: string[]) {
  return prisma.course.findMany({
    where: SEARCH_BY_TAG_CONDITION(tags),
    select: COURSE_LIST_RETURNED_FIELDS
  })
}

export function searchCoursesWithTag(term: string, tags: string[]) {
  return prisma.course.findMany({
    where: {
      AND: [SEARCH_BY_TERM_CONDITION(term), SEARCH_BY_TAG_CONDITION(tags)]
    },
    select: COURSE_LIST_RETURNED_FIELDS
  })
}

export function getCourse(id: number) {
  return prisma.course.findUnique({
    where: { id },
    select: COURSE_RETURNED_FIELDS
  })
}

export function subscribeToCourse(courseId: number, userId: number) {
  return prisma.course.update({
    where: { id: courseId },
    data: { subscriptions: { create: { userId } } },
    select: COURSE_RETURNED_FIELDS
  })
}

export function createQuestionOptions(options: string[], questionId: number) {
  return prisma.option.createMany({
    data: options.map(value => ({ value, questionId }))
  })
}

export function createQuestionAnswer(value: string, questionId: number) {
  return prisma.option.create({
    data: { value, isTheAnswer: true, questionId }
  })
}

export function createQuestion(question: string, chapterId: number) {
  return prisma.question.create({ data: { question, chapterId } })
}

export async function createEvaluation(
  evaluation: EvaluationInputType,
  chapterId: number
) {
  const { question, options, answer } = evaluation
  const newQuestion = await createQuestion(question, chapterId)
  await createQuestionOptions(options, newQuestion.id)
  await createQuestionAnswer(answer, newQuestion.id)
}

export function createChapter(
  chapter: Omit<ChapterInputType, 'evaluation'>,
  courseId: number
) {
  const { title, description, video } = chapter
  return prisma.chapter.create({
    data: { title, description, videoUrl: video, courseId }
  })
}

export async function createCourse(input: CourseInputType) {
  const { chapters, title, description, cover } = input
  const course = await prisma.course.create({
    data: {
      title,
      description,
      coverUrl: cover
    }
  })
  chapters.forEach(async chapter => {
    const { evaluation, ...chaptr } = chapter
    const newChapter = await createChapter(chaptr, course.id)
    evaluation.forEach(async evl => {
      await createEvaluation(evl, newChapter.id)
    })
  })
}
