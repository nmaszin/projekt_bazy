import { Router } from 'express'
import { catchErrors } from '@/middlewares/errors'
import Student from '@/models/student'

const router = Router()

router.post('/db', catchErrors(async (req, res) => {
    try {
        await Student.initialize()
    } catch (err) {}
    
    res.status(200).send({
        message: 'Database succesfully initialized'
    })
}))

router.put('/db', catchErrors(async (req, res) => {
    try {
        await Student.deinitialize()
        await Student.initialize()
    } catch (err) {}

    res.status(200).send({
        message: 'Database succesfully reinitialized'
    })
}))

router.delete('/db', catchErrors(async (req, res) => {
    try {
        await Student.deinitialize()
    } catch (err) {}

    res.status(200).send({
        message: 'Database succesfully deinitialized'
    })
}))

export default router
