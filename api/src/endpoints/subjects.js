import { Router } from 'express'
import { flattenSelect } from '@/models'
import Subject from '@/models/subject'
import SubjectForm from '@/forms/subject'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'

const router = Router()

router.get('/subjects',
    controller(async (req, res) => {
        const subjects = await Subject.selectAll()

        res.send({
            data: subjects.map(flattenSelect)
        })
    })
)

router.get('/subjects/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const subject = await Subject.selectById(id)
        if (subject === undefined) {
            return res.status(404).send({
                message: 'This subject does not exist'
            })
        }

        res.status(200).send({
            data: flattenSelect(subject)
        })
    })
)

router.post('/subjects',
    validator(SubjectForm),
    controller(async(req, res) => {
        await Subject.insert(req.body)
        res.status(201).send({
            message: 'Created'
        })
    })
)


router.put('/subjects/:id(\\d+)',
    validator(SubjectForm),
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Subject.updateById(id, req.body)) {
            return res.status(404).send({
                message: 'Subject with given id does not exist'
            })
        }

        res.status(200).send({
            message: 'Updated'
        })
    })
)

router.delete('/subjects/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Subject.deleteById(id)) {
            return res.status(404).send({
                message: 'This subject does not exist'
            })
        }

        res.status(200).send({
            message: 'Subject deleted successfully'
        })
    })
)

export default router
