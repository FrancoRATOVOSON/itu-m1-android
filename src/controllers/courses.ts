import { Request, Response } from 'express'
import {
  ID_MUST_BE_A_NUMBER,
  SEARCH_MUST_BE_A_STRING,
  SERVER_ERROR,
  TOKEN_ERROR
} from '../utils/const'
import {
  getCourses as gCources,
  getCoursesByParams,
  getCourse as gCourse,
  subscribeToCourse as subToCourse,
  createCourse
} from '../services/courses'

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { search, tag } = req.query
    if (!search && !tag) {
      res.status(200).json({ courses: await gCources() })
      return
    }
    if (search && typeof search !== 'string') {
      res.status(400).json({ message: SEARCH_MUST_BE_A_STRING })
      return
    }
    let tags: string[] | undefined
    if (tag) {
      if (typeof tag === 'string') tags = [tag]
      else tags = tag as string[]
    }
    res
      .status(200)
      .json({ courses: await getCoursesByParams({ term: search, tags }) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}

export const getCourse = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10)
    if (Number.isNaN(courseId)) {
      res.status(400).json({ message: ID_MUST_BE_A_NUMBER })
      return
    }
    res.status(200).json({ ...(await gCourse(courseId)) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}

export const subscribeToCourse = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      res.status(400).json({ message: TOKEN_ERROR })
      return
    }
    const courseId = parseInt(req.params.id, 10)
    const userId = parseInt(req.userId, 10)
    if (Number.isNaN(courseId) || Number.isNaN(userId)) {
      res.status(400).json({ message: ID_MUST_BE_A_NUMBER })
      return
    }
    res.status(200).json({ ...(await subToCourse(courseId, userId)) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}

export const newCourse = (req: Request, res: Response) => {
  createCourse(req.body)
    .then(() => res.status(200).send('Done'))
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: SERVER_ERROR })
    })
}
