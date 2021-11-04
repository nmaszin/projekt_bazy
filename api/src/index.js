import express, { json } from 'express'
import endpoints from '@/endpoints'
import { notFoundRoute, jsonParsingError } from '@/middlewares/errors'

const app = express()
app.use(express.json())
app.use(jsonParsingError)
app.use(express.urlencoded({ extended: false }))

app.use(endpoints)
app.use(notFoundRoute)

const port = process.env.PORT
app.listen(port, () => console.log(`Running on http://localhost:${port}`))
