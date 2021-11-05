import { Router } from 'express'
import { flattenSelect } from '@/models'
import Faculty from '@/models/faculty'
import { makeController } from '@/middlewares/errors'
import { modelValidator } from '@/middlewares/validator'

const router = Router()

router.get('/faculties', makeController(async (req, res) => {
    const faculties = await Faculty.selectAll()
    res.send({
        data: faculties.map(flattenSelect)
    })
}))


router.get('/faculties/:id(\\d+)', makeController(async (req, res) => {
    const id = parseInt(req.params.id)
    const faculty = await Faculty.selectById(id)
    if (faculty === undefined) {
        return res.status(404).send({
            message: 'This faculty does not exist'
        })
    }

    res.status(200).send({
        data: flattenSelect(faculty)
    })
}))


router.post('/faculties', modelValidator(Faculty), makeController(async(req, res) => {
    await Faculty.insert(req.body)
    res.status(201).send({
        message: 'Created'
    })
}))


router.put('/faculties/:id(\\d+)', modelValidator(Faculty), makeController(async (req, res) => {
    const id = parseInt(req.params.id)
    if (!await Faculty.updateById(id, req.body)) {
        return res.status(404).send({
            message: 'Faculty with given id does not exist'
        })
    }
    
    res.status(200).send({
        message: 'Updated'
    })
}))


router.delete('/faculties/:id', makeController(async (req, res) => {
    const id = parseInt(req.params.id)

    if (!await Faculty.deleteById(id)) {
        return res.status(404).send({
            message: 'This faculty does not exist'
        })
    }

    res.status(200).send({
        message: 'Faculty deleted successfully'
    })
}))

export default router
