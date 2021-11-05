import { Router } from 'express'
import { flattenSelect } from '@/models'
import Laboratory from '@/models/laboratory'
import { makeController } from '@/middlewares/errors'
import { modelValidator } from '@/middlewares/validator'

const router = Router()

router.get('/laboratories', makeController(async (req, res) => {
    const laboratories = await Laboratory.selectAll()
    res.send({
        data: laboratories.map(flattenSelect)
    })
}))


router.get('/laboratories/:id(\\d+)', makeController(async (req, res) => {
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
}))


router.post('/laboratories', modelValidator(Laboratory), makeController(async(req, res) => {
    await Laboratory.insert(req.body)
    res.status(201).send({
        message: 'Created'
    })
}))


router.put('/laboratories/:id(\\d+)', modelValidator(Laboratory), makeController(async (req, res) => {
    const id = parseInt(req.params.id)
    if (!await Laboratory.updateById(id, req.body)) {
        return res.status(404).send({
            message: 'Laboratory with given id does not exist'
        })
    }
    
    res.status(200).send({
        message: 'Updated'
    })
}))


router.delete('/laboratories/:id(\\d+)', makeController(async (req, res) => {
    const id = parseInt(req.params.id)

    if (!await Laboratory.deleteById(id)) {
        return res.status(404).send({
            message: 'This laboratory does not exist'
        })
    }

    res.status(200).send({
        message: 'Laboratory deleted successfully'
    })
}))

export default router
