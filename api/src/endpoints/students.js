import { Router } from 'express'
import { flattenSelect } from '@/models'
import Student from '@/models/student'
import { catchErrors } from '@/middlewares/errors'

const router = Router()

router.get('/students', catchErrors(async (req, res) => {
    const students = (await Student.selectAll()).map(flattenSelect)
    res.send({ data: students })
}))


router.get('/students/:id(\\d+)', catchErrors(async (req, res) => {
    const id = parseInt(req.params.id)
    const student = flattenSelect(await Student.selectById(id))
    if (student === undefined) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    res.status(200).send({ data: student })
}))


router.post('/students', catchErrors(async(req, res) => {
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
        return res.status(400).send({
            message: 'You should give name and surname fields in request body'
        })
    }

    await Student.insert({ firstName, lastName })
    res.status(201).send({ message: 'Created' })
}))


router.put('/students/:id(\\d+)', catchErrors(async (req, res) => {
    const id = parseInt(req.params.id)
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
        return res.status(400).send({
            message: 'You should give both name and surname fields in request body'
        })
    }
    
    if (!await Student.updateById(id, { firstName, lastName })) {
        return res.status(404).send({
            message: 'Student with given id does not exist'
        })
    }
    
    res.status(200).send({
        message: 'Updated'
    })
}))


router.delete('/students/:id', catchErrors(async (req, res) => {
    const id = parseInt(req.params.id)

    if (!await Student.deleteById(id)) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    res.status(200).send({
        message: 'Student deleted successfully'
    })
}))

export default router
