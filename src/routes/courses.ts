import express from 'express'
import { getCourses, getCourse } from '../controllers/courses'

const router = express.Router()

router.get('/courses', getCourses)
router.get('/course/:id', getCourse)

export default router
