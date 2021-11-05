import { Router } from 'express'
import dbRouter from '@/endpoints/db'
import studentsRouter from '@/endpoints/students'
import facultiesRouter from '@/endpoints/faculties'

const router = Router()
router.use(dbRouter)
router.use(facultiesRouter)
router.use(studentsRouter)

export default router
