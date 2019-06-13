const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const eventRouter = require('./controllers/events')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.mongodbUri, { useNewUrlParser: true })

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.extractToken)
app.use(middleware.logger)

// Routes & Controllers
app.use('/api/events', eventRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}