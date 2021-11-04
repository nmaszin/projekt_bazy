import { Router } from 'express'
import dbRouter from '@/endpoints/db'
import studentsRouter from '@/endpoints/students'

const router = Router()
router.use(dbRouter)
router.use(studentsRouter)

export default router
