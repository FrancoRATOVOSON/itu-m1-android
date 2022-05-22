import prisma from '../tools/prisma'
import { EvalutaionType } from '../utils/types'

export function getChapter(id: number) {
  return prisma.chapter.findUnique({
    where: { id },
    select: { title: true, description: true, videoUrl: true }
  })
}

export function closeChapter(userId: number, chapterId: number) {
  return prisma.chapter.update({
    where: { id: chapterId },
    data: { progressions: { create: { userId, isFinished: true } } },
    select: {
      id: true,
      questions: {
        select: {
          id: true,
          question: true,
          options: { select: { id: true, value: true } }
        }
      }
    }
  })
}

export function verifyChapter(
  chapterId: number,
  userId: number,
  evaluation: EvalutaionType[]
) {
  return prisma.progression.update({
    where: { userId_chapterId: { userId, chapterId } },
    data: {
      tests: {
        createMany: {
          data: evaluation.map(evl => ({
            questionId: evl.question,
            selectedOptionId: evl.answer
          }))
        }
      }
    },
    select: {
      tests: {
        select: {
          questionId: true,
          question: {
            select: {
              options: { select: { id: true }, where: { isTheAnswer: true } }
            }
          },
          selectedOptionId: true
        }
      }
    }
  })
}
