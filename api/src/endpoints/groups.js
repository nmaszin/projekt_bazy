import { Router } from 'express'
import Group from '@/models/group'
import GroupView from '@/models/groupView'
import GroupForm from '@/forms/group'
import { validator } from '@/middlewares/validator'
import { controller } from '@/middlewares/controller'
import { jwtAuth } from '@/middlewares/auth'
import { atLeastReader, atLeastWriter } from '@/middlewares/roles'
import { flattenSelect } from '@/models'

const router = Router()

router.get('/groups',
    jwtAuth,
    atLeastReader,
    controller(async (req, res) => {
        const data = await Group.selectAll()
        res.send({
            data: data.map(flattenSelect)
        })
    })
)

router.get('/groups/:id(\\d+)',
    jwtAuth,
    atLeastReader,
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const data = await Group.selectById(id)
        if (data === undefined) {
            return res.status(404).send({
                message: `This group does not exist`
            })
        }

        res.status(200).send({
            data: flattenSelect(data)
        })
    })
)

router.post('/groups',
    jwtAuth,
    atLeastWriter,
    validator(GroupForm),
    controller(async(req, res) => {
        const id = await Group.insert(req.body)
        if (id === undefined) {
            return res.status(400).send({
                message: 'Could not add record to database'
            })
        }

        const data = { id, ...req.body }
        res.status(201).send({ data })
    })
)

router.put('/groups/:id(\\d+)',
    jwtAuth,
    atLeastWriter,
    validator(GroupForm),
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const data = { id, ...req.body }
        if (!await Group.updateById(id, req.body)) {
            return res.status(404).send({
                message: `Group with given id does not exist`
            })
        }

        res.status(200).send({ data })
    })
)

router.delete('/groups/:id(\\d+)',
    jwtAuth,
    atLeastWriter,
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        if (!await Group.deleteById(id)) {
            return res.status(404).send({
                message: `This group does not exist`
            })
        }

        res.status(200).send({})
    })
)


export default router

