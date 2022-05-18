import prisma from '../tools/prisma'
import { SearchCoursesParamsType } from '../utils/types'

const COURSE_RETURNED_FIELDS = {
  id: true,
  title: true,
  description: true,
  coverUrl: true
}

const SEARCH_BY_TERM_CONDITION = term => ({ title: { contains: term } })
const SEARCH_BY_TAG_CONDITION = tags => ({
  tags: { some: { tagValue: { in: tags } } }
})

export function getCourses() {
  return prisma.course.findMany({ select: COURSE_RETURNED_FIELDS })
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
    select: COURSE_RETURNED_FIELDS
  })
}

export function getCoursesByTags(tags: string[]) {
  return prisma.course.findMany({
    where: SEARCH_BY_TAG_CONDITION(tags),
    select: COURSE_RETURNED_FIELDS
  })
}

export function searchCoursesWithTag(term: string, tags: string[]) {
  return prisma.course.findMany({
    where: {
      AND: [SEARCH_BY_TERM_CONDITION(term), SEARCH_BY_TAG_CONDITION(tags)]
    },
    select: COURSE_RETURNED_FIELDS
  })
}
