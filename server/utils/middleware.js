const jwt = require('jsonwebtoken')
const Event = require('../models/event')

const extractToken = (request, response, next) => {
    delete request['senderId'] // Make sure request does not contain senderId

    let token = null

    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return next()
        }

        request.senderId = decodedToken.id

        next()
    } catch (exception) {
        next()
    }
}

const requireAuthentication = (request, response, next) => {
    if (request.senderId && request.senderId.length !== 0) {
        next()
    } else {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
}

const logger = (request, response, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next()
    }
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

module.exports = {
    logger,
    extractToken,
    requireAuthentication
}