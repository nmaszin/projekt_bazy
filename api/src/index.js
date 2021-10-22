const express = require('express')

const port = 8080

const app = express()
app.get('/', (req, res) => {
    res.send({
        message: 'Hello world'
    })
})

app.listen(port, () => {
    console.log(`Running on https://localhost:${port}`)
})
