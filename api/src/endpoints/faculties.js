import { Router } from 'express'
import { flattenSelect } from '@/models'
import Faculty from '@/models/faculty'
import FacultyForm from '@/forms/faculty'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'

const router = Router()

router.get('/faculties', controller(async (req, res) => {
    const faculties = await Faculty.selectAll()
    res.send({
        data: faculties.map(flattenSelect)
    })
}))


router.get('/faculties/:id(\\d+)', controller(async (req, res) => {
    const id = parseInt(req.params.id)
    const faculty = await Faculty.selectById(id)
    if (faculty === undefined) {
        return res.status(404).send({
            message: 'This faculty does not exist'
        })
    }

    res.status(200).send({
        data: flattenSelect(faculty)
    })
}))


router.post('/faculties', validator(FacultyForm), controller(async(req, res) => {
    await Faculty.insert(req.body)
    res.status(201).send({
        message: 'Created'
    })
}))


router.put('/faculties/:id(\\d+)', validator(FacultyForm), controller(async (req, res) => {
    const id = parseInt(req.params.id)
    if (!await Faculty.updateById(id, req.body)) {
        return res.status(404).send({
            message: 'Faculty with given id does not exist'
        })
    }
    
    res.status(200).send({
        message: 'Updated'
    })
}))


router.delete('/faculties/:id', controller(async (req, res) => {
    const id = parseInt(req.params.id)

    if (!await Faculty.deleteById(id)) {
        return res.status(404).send({
            message: 'This faculty does not exist'
        })
    }

    res.status(200).send({
        message: 'Faculty deleted successfully'
    })
}))

export default router
