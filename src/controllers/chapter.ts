import { Request } from 'express'
import { Response } from 'express-serve-static-core'
import { ID_MUST_BE_A_NUMBER, SERVER_ERROR, TOKEN_ERROR } from '../utils/const'
import {
  getChapter as gChapter,
  closeChapter as clChapter,
  verifyChapter as vrChapter
} from '../services/chapter'

export const getChapter = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10)
    if (Number.isNaN(courseId)) {
      res.status(400).json({ message: ID_MUST_BE_A_NUMBER })
      return
    }
    res.status(200).json({ ...(await gChapter(courseId)) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}

export const closeChapter = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      res.status(400).json({ message: TOKEN_ERROR })
      return
    }
    const chapterId = parseInt(req.params.id, 10)
    const userId = parseInt(req.userId, 10)
    if (Number.isNaN(chapterId) || Number.isNaN(userId)) {
      res.status(400).json({ message: ID_MUST_BE_A_NUMBER })
      return
    }
    res.status(200).json({ ...(await clChapter(userId, chapterId)) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}

export const verifyChapter = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      res.status(400).json({ message: TOKEN_ERROR })
      return
    }
    const chapterId = parseInt(req.params.id, 10)
    const userId = parseInt(req.userId, 10)
    if (Number.isNaN(chapterId) || Number.isNaN(userId)) {
      res.status(400).json({ message: ID_MUST_BE_A_NUMBER })
      return
    }
    const { evaluation } = req.body
    res
      .status(200)
      .json({ ...(await vrChapter(chapterId, userId, evaluation)) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: SERVER_ERROR })
  }
}
