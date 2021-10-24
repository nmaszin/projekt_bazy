import { Router } from 'express'

let students = [
    { id: 1, firstname: 'Eryk', surname: 'Andrzejewski' },
    { id: 2, firstname: 'Konrad', surname: 'Bankiewicz' },
    { id: 3, firstname: 'Paweł', surname: 'Błoch' }
]

const router = Router()

router.get('/students', (req, res) => {
    res.send({ students })
})

router.get('/students/:id(\\d+)', (req, res) => {
    const id = parseInt(req.params.id)
    const student = students.find(student => student.id === id)
    if (student === undefined) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    res.status(200).send({ student })
})

router.post('/students', (req, res) => {
    const { firstname, surname } = req.body
    if (!firstname || !surname) {
        return res.status(400).send({
            message: 'You should give name and surname fields in request body'
        })
    }

    const id = Math.max(...students.map(student => student.id)) + 1
    students.push({ id, firstname, surname })

    res.status(201).send({ message: 'Created' })
})

router.put('/students/:id(\\d+)', (req, res) => {
    const id = parseInt(req.params.id)
    const { firstname, surname } = req.body
    if (!firstname || !surname) {
        return res.status(400).send({
            message: 'You should give both name and surname fields in request body'
        })
    }

    const index = students.findIndex(student => student.id === id)
    if (index === -1) {
        return res.status(404).send({
            message: 'Student with given id does not exist'
        })
    }

    students[index] = { id, firstname, surname }
    res.status(200).send({
        message: 'Updated'
    })
})

router.patch('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { firstname, surname } = req.body

    const index = students.findIndex(student => student.id === id)
    if (index === -1) {
        return res.status(404).send({
            message: 'Student with given id does not exist'
        })
    }

    if (firstname !== undefined) {
        students[index].firstname = firstname
    }
    if (surname !== undefined) {
        students[index].surname = surname
    }

    res.status(200).send({
        message: 'Updated'
    })
})

router.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = students.findIndex(student => student.id === id)
    if (index === -1) {
        return res.status(404).send({
            message: 'This student not exists'
        })
    }

    students.splice(index, 1)

    res.status(200).send({
        message: 'Student deleted successfully'
    })
})

export default router
