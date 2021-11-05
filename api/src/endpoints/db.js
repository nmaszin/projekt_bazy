import { Router } from 'express'
import { makeController } from '@/middlewares/errors'
import Database from '@/models/db'

const router = Router()

router.post('/db', makeController(async (req, res) => {
    try {
        await Database.initialize()
    } catch (err) {}
    
    res.status(200).send({
        message: 'Database succesfully initialized'
    })
}))

router.put('/db', makeController(async (req, res) => {
    try {
        await Database.deinitialize()
        await Database.initialize()
    } catch (err) {}

    res.status(200).send({
        message: 'Database succesfully reinitialized'
    })
}))

router.delete('/db', makeController(async (req, res) => {
    try {
        await Database.deinitialize()
    } catch (err) {}

    res.status(200).send({
        message: 'Database succesfully deinitialized'
    })
}))

export default router
