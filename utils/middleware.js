const jwt = require('jsonwebtoken')
const Event = require('../models/event')
const roles = require('./roles')

exports.extractToken = (request, response, next) => {
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

exports.requireAuthentication = (request, response, next) => {
    if (request.senderId && request.senderId.length !== 0) {
        next()
    } else {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
}

exports.extractEvent = async (request, response, next) => {
    try {
        const event = await Event.findById(request.params.id)

        if (event === null) {
            return response.status(404).json({ error: 'Event not found' })
        }

        request.event = event
        next()
    } catch (exception) {
        return response.status(400).json({ error: 'Malformatted id' })
    }
}

exports.extractRole = async (request, response, next) => {
    const senderId = request.senderId
    const event = request.event

    if (!senderId) {
        request.senderRole = roles.GHOST
        return next()
    }

    if (event.creator.toString() === senderId) {
        request.senderRole = roles.CREATOR
    } else if (event.guests.find(guest => guest.user.toString() === senderId)) {
        request.senderRole = roles.GUEST
    } else {
        request.senderRole = roles.GHOST
    }

    next()
}

exports.requireRole = (...roles) => {
    const isAllowed = role => roles.indexOf(role) > -1

    return (request, response, next) => {
        if (request.senderRole && isAllowed(request.senderRole))
            next()
        else {
            return response.status(403).json({ error: "User does not have required role" })
        }
    }
}

exports.logger = (request, response, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Method: ', request.method)
        console.log('Path:   ', request.path)
        console.log('Sender: ', request.senderId)
        console.log('Body:   ', request.body)
        console.log('---')
    }
    next()
}

exports.error = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}