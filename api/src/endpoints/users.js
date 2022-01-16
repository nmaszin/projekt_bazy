import { Router } from 'express'
import User from '@/models/user'
import UserForm from '@/forms/user'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'

const router = Router()

router.get('/users',
    controller(async (req, res) => {
        const users = await User.selectAll()
        const data = users.map(user => ({
            id: user.id,
            username: user.data.username
        }))

        res.status(200).send({ data })
    })
)

router.get('/users/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const { username } = await User.selectById(id)
        const data = { id, username }

        res.status(200).send({ data })
    })
)

router.post('/users',
    validator(UserForm),
    controller(async (req, res) => {
        const id = await User.insert(req.body)
        if (!id) {
            return res.status(400).send({
                message: 'Username should be unique'
            })
        }

        const user = await User.selectById(id)
        res.status(201).send({
            data: {
                id: user.id,
                username: user.data.username
            }
        })
    })
)

router.delete('/users/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await User.deleteById(id)) {
            return res.status(404).send({
                message: `This user does not exist`
            })
        }

        res.status(200).send({})
    })
)

export default router
