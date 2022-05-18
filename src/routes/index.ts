import express from 'express'
import authRoute from './auth'
import coursesRoute from './courses'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/', coursesRoute)

export default router
