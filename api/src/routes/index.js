import { Router } from 'express'
import studentsRouter from './students'

const router = Router()
router.use(studentsRouter)

export default router
