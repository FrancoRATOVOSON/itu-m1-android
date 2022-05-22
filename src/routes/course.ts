import express from 'express'
import { getCourse, subscribeToCourse, newCourse } from '../controllers/courses'
import { verifyToken } from '../middlewares/token'

const router = express.Router()

router.put('/subscribe/:id', verifyToken, subscribeToCourse)
router.post('/new', newCourse)
router.get('/:id', getCourse)

export default router
