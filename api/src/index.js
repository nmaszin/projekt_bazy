import express from 'express'
import endpoints from '@/endpoints'
import database from '@/db'

(async () => {
    const db = await database()
    const [result, _] = await db.query('SELECT 1 + 1 AS result')
    console.log(result)

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.use(endpoints)
    app.use('/', (req, res) => {
        res.status(404).send({
            message: 'Unknown route'
        })
    })

    const port = process.env.PORT
    app.listen(port, () => console.log(`Running on http://localhost:${port}`))
})()