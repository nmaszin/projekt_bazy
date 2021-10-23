import { Router } from 'express'

const students = [
    { id: 1, firstname: 'Eryk', surname: 'Andrzejewski' },
    { id: 2, firstname: 'Konrad', surname: 'Bankiewicz' },
    { id: 3, firstname: 'Paweł', surname: 'Błoch' }
]

const router = Router()

router.get('/students', (req, res) => {
    res.send({ students })
})

router.get('/students/:id', (req, res) => {
    const student = students.find(student => student.id === req.params.id)
    if (student === undefined) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    res.status(200).send({
        student
    })
})

router.post('/students', (req, res) => {
    const { name, surname } = req.body
    if (!name || !surname) {
        return res.status(400).send({
            message: 'You should give name and surname fields in request body'
        })
    }

    const id = Math.max(...students.map(student => student.id)) + 1
    students.push({ id, name, surname })

    res.status(201).send({
        message: 'Created'
    })
})

router.delete('/students/:id', (req, res) => {
    const student = students.find(student => student.id === req.params.id)
    if (student === undefined) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    res.status(200).send({
        message: 'Student deleted successfully'
    })
})

export default router
