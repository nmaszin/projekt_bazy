import { Router } from 'express'

const router = Router()
router.get('/students', (req, res) => res.send({
    students: []
}))

export default router
