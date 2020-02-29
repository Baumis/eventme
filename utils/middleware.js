const jwt = require('jsonwebtoken')
const Event = require('../models/event')
const User = require('../models/user')
const roles = require('./roles')

exports.extractToken = (request, response, next) => {
    delete request['senderId'] // Make sure request does not contain senderId

    const token = request.cookies['jwt']

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
        response.clearCookie('jwt')
        return response.status(401).json({ error: 'token missing or invalid' })
    }
}

exports.extractEvent = async (request, response, next) => {
    try {
        const id = request.params.id
        let event
        
        if (request.method === 'GET' && request.url === '/') {
            event = await Event.findOne({ _id: id.slice(0, -5) })
            event = event.urlmodifier === id.slice(-5) ? event : null
        } else {
            event = await Event.findById(id)
        }
            


        if (event === null) {
            return response.status(404).json({ error: 'Event not found' })
        }

        request.event = event
        next()
    } catch (exception) {
        return response.status(400).json({ error: 'Malformatted id' })
    }
}

exports.extractUser = async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)

        if (user === null) {
            return response.status(404).json({ error: 'User not found' })
        }

        request.user = user
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
    } else if (event.registrations.find(registration => registration.user ? registration.user.toString() === senderId : false)) {
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
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
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

exports.redirectToHttps = (request, response, next) => {
    if (request.protocol === 'https') {
        // request was via https, so do no special handling
        next()
    } else {
        // request was via http, so redirect to https
        response.redirect('https://' + request.headers.host + request.url)
    }
}