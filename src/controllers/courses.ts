import { Request, Response } from 'express'
import { SEARCH_MUST_BE_A_STRING, SERVER_ERROR } from '../utils/const'
import { getCourses as gCources, getCoursesByParams } from '../services/courses'

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
    res.status(200).json({
      courses: await getCoursesByParams({
        term: search,
        tags: typeof tag === 'string' ? [tag] : tag
      })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}
