import express from 'express'
import config from './config'
import endpoints from './endpoints'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(endpoints)
app.use('/', (req, res) => {
    res.status(404).send({
        message: 'Unknown route'
    })
})

app.listen(config.port, () => console.log(`Running on http://localhost:${config.port}`))
