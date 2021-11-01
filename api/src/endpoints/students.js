import { Router } from 'express'
import Student from '@/model/student'

const router = Router()

router.get('/students', async (req, res) => {
    const students = (await Student.selectAll())
        .map(student => ({
            id: student['id'],
            firstName: student['first_name'],
            lastName: student['last_name']
        }))

    res.send({ students })
})


router.get('/students/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)
    const student = (await Student.selectById(id))[0]
    if (student === undefined) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    res.status(200).send({ student })
})


router.post('/students', async(req, res) => {
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
        return res.status(400).send({
            message: 'You should give name and surname fields in request body'
        })
    }

    await Student.insert({ firstName, lastName })
    res.status(201).send({ message: 'Created' })
})


router.put('/students/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)
    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
        return res.status(400).send({
            message: 'You should give both name and surname fields in request body'
        })
    } else if (!(await Student.exists(id))) {
        return res.status(404).send({
            message: 'Student with given id does not exist'
        })
    }

    await Student.update({ id, firstName, lastName })
    res.status(200).send({
        message: 'Updated'
    })
})


router.delete('/students/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    if (!(await Student.exists(id))) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    await Student.deleteById(id)

    res.status(200).send({
        message: 'Student deleted successfully'
    })
})

export default router
