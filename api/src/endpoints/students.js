import { Router } from 'express'
import { flattenSelect } from '@/models'
import Student from '@/models/student'
import StudentForm from '@/forms/student'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'

const router = Router()

router.get('/students',
    controller(async (req, res) => {
        const students = (await Student.selectAll()).map(flattenSelect)
        res.send({
            data: students
        })
    })
)

router.get('/students/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const student = await Student.selectById(id)
        if (student === undefined) {
            return res.status(404).send({
                message: 'This student not exists'
            })
        }

        res.status(200).send({
            data: flattenSelect(student)
        })
    })
)

router.post('/students',
    validator(StudentForm),
    controller(async(req, res) => {
        await Student.insert(req.body)
        res.status(201).send({
            message: 'Created'
        })
    })
)

router.put('/students/:id(\\d+)',
    validator(StudentForm),
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Student.updateById(id, req.body)) {
            return res.status(404).send({
                message: 'Student with given id does not exist'
            })
        }

        res.status(200).send({
            message: 'Updated'
        })
    })
)

router.delete('/students/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Student.deleteById(id)) {
            return res.status(404).send({
                message: 'This student not exists'
            })
        }

        res.status(200).send({
            message: 'Student deleted successfully'
        })
    })
)

export default router
