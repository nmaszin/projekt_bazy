import { Router } from 'express'
import dbRouter from '@/endpoints/db'
import studentsRouter from '@/endpoints/students'
import facultiesRouter from '@/endpoints/faculties'
import laboratoriesRouter from '@/endpoints/laboratories'

const router = Router()
router.use(dbRouter)
router.use(facultiesRouter)
router.use(laboratoriesRouter)
router.use(studentsRouter)

export default router
