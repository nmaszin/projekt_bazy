import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { controller } from '@/middlewares/controller'
import { validator } from '@/middlewares/validator'
import { loginAuth } from '@/middlewares/auth'
import LoginForm from '@/forms/login'

const router = Router()

router.post('/login',
    validator(LoginForm),
    loginAuth,
    controller(async (req, res) => {
        const user = req.user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 1200 }
        )

        return res.status(200).send({
            token
        })
    })
)

export default router
