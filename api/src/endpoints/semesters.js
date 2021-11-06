import { Router } from 'express'
import { flattenSelect } from '@/models'
import Semester from '@/models/semester'
import SemesterForm from '@/forms/semester'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'

const router = Router()

router.get('/semesters',
    controller(async (req, res) => {
        const semesters = await Semester.selectAll()

        res.send({
            data: semesters.map(flattenSelect)
        })
    })
)

router.get('/semesters/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const semester = await Semester.selectById(id)
        if (semester === undefined) {
            return res.status(404).send({
                message: 'This semester does not exist'
            })
        }

        res.status(200).send({
            data: flattenSelect(semester)
        })
    })
)

router.post('/semesters',
    validator(SemesterForm),
    controller(async(req, res) => {
        await Semester.insert(req.body)
        res.status(201).send({
            message: 'Created'
        })
    })
)


router.put('/semesters/:id(\\d+)',
    validator(SemesterForm),
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Semester.updateById(id, req.body)) {
            return res.status(404).send({
                message: 'Semester with given id does not exist'
            })
        }

        res.status(200).send({
            message: 'Updated'
        })
    })
)

router.delete('/semesters/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Semester.deleteById(id)) {
            return res.status(404).send({
                message: 'This semester does not exist'
            })
        }

        res.status(200).send({
            message: 'Semester deleted successfully'
        })
    })
)

export default router
