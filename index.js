const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const eventRouter = require('./routes/eventRouter')
const userRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')
const logRouter = require('./routes/logRouter')

mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

// Middlewares
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

// Static files from react app
if ( process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')))
}

// More middlewares
app.use(middleware.extractToken)
app.use(middleware.logger)

// Routes & Controllers
app.use('/api/events', eventRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/log', logRouter)

// Rest of endpoints to react
if ( process.env.NODE_ENV === 'production') {
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, './client/build/index.html'))
    })
}

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