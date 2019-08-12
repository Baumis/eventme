const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const eventRouter = require('./routes/eventRouter')
const userRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')

mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useCreateIndex: true })

// Static files from react app
app.use(express.static('../client/build'))

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.extractToken)
app.use(middleware.logger)

// Routes & Controllers
app.use('/api/events', eventRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// Catches unknown endpoints
app.use(middleware.error)

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