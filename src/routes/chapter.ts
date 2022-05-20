import express from 'express'
import { verifyToken } from '../middlewares/token'
import { getChapter, closeChapter, verifyChapter } from '../controllers/chapter'

const router = express.Router()

router.get('/:id', getChapter)
router.put('/close/:id', verifyToken, closeChapter)
router.post('/verify/:id', verifyToken, verifyChapter)

export default router
