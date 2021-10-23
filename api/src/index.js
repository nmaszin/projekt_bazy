import express from 'express'
import config from './config.js'
import router from './routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use('/', (req, res) => {
    res.status(404).send({
        message: 'Unknown route'
    })
})

app.listen(config.port, () => console.log(`Running on https://localhost:${config.port}`))
