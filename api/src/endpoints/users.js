import { Router } from 'express'
import User from '@/models/user'
import UserForm from '@/forms/user'
import UserUpdateForm from '@/forms/userUpdate'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'
import { jwtAuth } from '@/middlewares/auth'
import { atLeastAdmin } from '@/middlewares/roles'

const router = Router()

router.get('/users',
    jwtAuth,
    atLeastAdmin,
    controller(async (req, res) => {
        const users = await User.selectAll()
        const data = users.map(user => ({
            id: user.id,
            username: user.data.username,
            role: user.data.role
        }))

        res.status(200).send({ data })
    })
)

router.get('/users/:id(\\d+)',
    jwtAuth,
    atLeastAdmin,
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const { username, role } = await User.selectById(id)
        const data = { id, username, role }

        res.status(200).send({ data })
    })
)

router.post('/users',
    jwtAuth,
    atLeastAdmin,
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
                username: user.data.username,
                role: user.data.role
            }
        })
    })
)

router.put('/users/:id(\\d+)',
    jwtAuth,
    atLeastAdmin,
    validator(UserUpdateForm),
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await User.updateById(id, req.body)) {
            return res.status(404).send({
                message: `User with given id does not exist`
            })
        }

        res.status(200).send({ data })
    })
)

router.delete('/users/:id(\\d+)',
    jwtAuth,
    atLeastAdmin,
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
