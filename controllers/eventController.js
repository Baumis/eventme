const Event = require('../models/event')

const eventService = require('../services/eventService')
const roles = require('../utils/roles')

exports.getOne = async (request, response) => {
    try {
        const event = await eventService.populate(request.event)
        const senderRole = request.senderRole

        if (senderRole === roles.CREATOR) {
            response.json(Event.format(event))
        } else if (senderRole === roles.GUEST) {
            response.json(Event.formatForGuest(event))
        } else {
            response.status(403).json({ error: 'Event is private' })
        }
    } catch (exception) {
        response.status(400).json({ error: 'Malformatted id' })
    }
}

exports.create = async (request, response) => {
    try {
        const createdEvent = await eventService.create(request.senderId, request.body)
        response.status(201).json(Event.format(createdEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.update = async (request, response) => {
    try {
        const updatedEvent = await eventService.update(request.event, request.body)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.delete = async (request, response) => {
    try {
        await eventService.delete(request.event)
        response.status(204).end()
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addGuest = async (request, response) => {
    try {
        const updatedEvent = await eventService.addGuest(request.event, request.body.userId)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.removeGuest = async (request, response) => {
    try {
        const userId = request.params.userId

        if (request.senderRole !== roles.CREATOR && request.senderId !== userId) {
            return response.status(403).json({ error: 'User does not have required permission' })
        }

        const updatedEvent = await eventService.removeGuest(request.event, userId)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.getOneWithInviteKey = async (request, response) => {
    try {
        if (request.event.inviteKey !== request.params.inviteKey) {
            return response.status(400).json({ error: 'Malformatted inviteKey' })
        }

        const event = await eventService.populate(request.event)
        response.json(Event.formatForGuest(event))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addGuestWithInviteKey = async (request, response) => {
    try {
        if (request.event.inviteKey !== request.body.inviteKey) {
            return response.status(400).json({ error: 'Malformatted inviteKey' })
        }

        const updatedEvent = await eventService.addGuest(request.event, request.senderId)
        response.json(Event.formatForGuest(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.changeInviteKey = async (request, response) => {
    try {
        const updatedEvent = await eventService.changeInviteKey(request.event)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.setStatus = async (request, response) => {
    try {
        const userId = request.params.userId

        if (request.senderRole !== roles.CREATOR && request.senderId !== userId) {
            return response.status(403).json({ error: 'User does not have required permission' })
        }

        const updatedEvent = await eventService.setStatus(request.event, userId, request.body.newStatus)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addMessage = async (request, response) => {
    try {
        const updatedEvent = await eventService.addMessage(request.event, request.senderId, request.body.message)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addComment = async (request, response) => {
    try {
        const updatedEvent = await eventService.addComment(request.event, request.senderId, request.params.messageId, request.body.comment)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}