import { Router } from 'express'
import { flattenSelect } from '@/models'
import Laboratory from '@/models/laboratory'
import LaboratoryForm from '@/forms/laboratory'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'

const router = Router()

router.get('/laboratories',
    controller(async (req, res) => {
        const laboratories = await Laboratory.selectAll()

        res.send({
            data: laboratories.map(flattenSelect)
        })
    })
)

router.get('/laboratories/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const laboratory = await Laboratory.selectById(id)
        if (laboratory === undefined) {
            return res.status(404).send({
                message: 'This laboratory does not exist'
            })
        }

        res.status(200).send({
            data: flattenSelect(laboratory)
        })
    })
)

router.post('/laboratories',
    validator(LaboratoryForm),
    controller(async(req, res) => {
        const id = await Laboratory.insert(req.body)
        const data = { id, ...req.body }

        res.status(201).send({ data })
    })
)


router.put('/laboratories/:id(\\d+)',
    validator(LaboratoryForm),
    controller(async (req, res) => {
        const id = parseInt(req.params.id)
        const data = { id, ...req.body }
        if (!await Laboratory.updateById(id, req.body)) {
            return res.status(404).send({
                message: 'Laboratory with given id does not exist'
            })
        }

        res.status(200).send({ data })
    })
)

router.delete('/laboratories/:id(\\d+)',
    controller(async (req, res) => {
        const id = parseInt(req.params.id)

        if (!await Laboratory.deleteById(id)) {
            return res.status(404).send({
                message: 'This laboratory does not exist'
            })
        }

        res.status(200).send({
            message: 'Laboratory deleted successfully'
        })
    })
)

export default router
