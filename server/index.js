const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const eventsRouter = require('./controllers/events')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/events', eventsRouter)

const server = http.createServer(app)

server.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

module.exports = {
    app, server
}