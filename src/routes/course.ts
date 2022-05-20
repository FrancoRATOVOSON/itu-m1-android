import express from 'express'
import { getCourse, subscribeToCourse } from '../controllers/courses'
import { verifyToken } from '../middlewares/token'

const router = express.Router()

router.get('/:id', getCourse)
router.put('/subscribe/:id', verifyToken, subscribeToCourse)

export default router
