import express from 'express'
import authRoute from './auth'
import coursesRoute from './courses'
import courseRoute from './course'
import chapterRoute from './chapter'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/course', courseRoute)
router.use('/chapter', chapterRoute)
router.use('/', coursesRoute)

export default router
