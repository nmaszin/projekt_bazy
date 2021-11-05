import { Router } from 'express'
import studentsRouter from '@/endpoints/students'

const router = Router()
router.use(studentsRouter)

export default router
