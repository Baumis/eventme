// Core modules
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Security modules
const helmet = require('helmet')
const cors = require('cors')

// Helper modules
const path = require('path')
const fs = require('fs')

// Custom middleware
const middleware = require('./utils/middleware')
const extractToken = middleware.extractToken
const logger = middleware.logger
const error = middleware.error
const redirectToHttps = middleware.redirectToHttps

// Initialize app
const app = express()

// Route modules
const eventRouter = require('./routes/eventRouter')
const userRouter = require('./routes/userRouter')
const searchRouter = require('./routes/searchRouter')
const loginRouter = require('./routes/loginRouter')
const logRouter = require('./routes/logRouter')
const pictureRouter = require('./routes/pictureRouter')
const htmlRouter = require('./routes/htmlRouter')

// Security middleware
app.enable('trust proxy')
app.use(helmet())
app.use(cors())
if (process.env.NODE_ENV === 'production') {
    app.use(redirectToHttps)
}

// Core middleware
app.use(cookieParser())
app.use(bodyParser.json())

// Static files from react app
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    app.use(htmlRouter)
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
app.use('/api/pictures', pictureRouter)
app.use('/api/search', searchRouter)

// Rest of endpoints to react
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    app.get('*', (request, response) => {
        fs.readFile(path.join(__dirname, './client/build/index.html'), 'utf8', function (err, data) {
            if (err) {
                return console.log(err)
            }

            // replace the special strings with server generated strings
            data = data.replace(/\$OG_TITLE/g, 'InviteOwl Events - Create, host and attend events')
            data = data.replace(/\$OG_DESCRIPTION/g, 'Create an event in 5 seconds with InviteOwl using local, Google or Facebook account. Invite guests by sharing a link. Manage all events in one place.')
            data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/')

            response.send(data)
        })
    })
}

// Error handler
app.use(error)

module.exports = app