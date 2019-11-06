// Core modules
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Security modules
const cors = require('cors')

// Helper modules
const path = require('path')

// Custom middleware
const middleware = require('./utils/middleware')
const extractToken = middleware.extractToken
const logger = middleware.logger
const error = middleware.error

// Initialize app
const app = express()

// Route modules
const eventRouter = require('./routes/eventRouter')
const userRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')
const logRouter = require('./routes/logRouter')

// Security middleware
app.use(cors())

// Core middleware
app.use(cookieParser())
app.use(bodyParser.json())

// Static files from react app
if ( process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')))
}

// Custom middleware
app.use(extractToken)
app.use(logger)

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

// Error handler
app.use(error)

module.exports = app