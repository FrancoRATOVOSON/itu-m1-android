import express from 'express'
import { getCourses } from '../controllers/courses'

const router = express.Router()

router.get('/courses', getCourses)

export default router
