const Event = require('../models/event')

const eventService = require('../services/eventService')
const logService = require('../services/logService')

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
        
        await logService.createdEvent(request.senderId, createdEvent._id)

        response.status(201).json(Event.format(createdEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.update = async (request, response) => {
    try {
        const updatedEvent = await eventService.update(request.event, request.body)

        await logService.updatedEvent(request.senderId, updatedEvent._id)

        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.delete = async (request, response) => {
    try {
        await eventService.delete(request.event)

        await logService.deletedEvent(request.senderId, request.event._id)

        response.status(204).end()
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addGuest = async (request, response) => {
    try {
        const userId = request.params.userId

        const updatedEvent = await eventService.addGuest(request.event, userId)

        await logService.joinedEvent(userId, updatedEvent._id)

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

        await logService.leftEvent(userId, updatedEvent._id)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
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

        await logService.joinedEvent(request.senderId, updatedEvent._id)

        response.json(Event.formatForGuest(updatedEvent))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.changeInviteKey = async (request, response) => {
    try {
        const updatedEvent = await eventService.changeInviteKey(request.event)

        await logService.changedInviteKey(request.senderId, updatedEvent._id)
        
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

        await logService.changedStatus(userId, updatedEvent._id)

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

        const message = updatedEvent.discussion.find(message => message.author._id === request.senderId && message.content === request.body.message)

        await logService.wroteMessage(request.senderId, updatedEvent._id, message._id)

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

        const message = updatedEvent.discussion.find(message => message._id === request.params.messageId)

        const comment = message.comments.slice().reverse().find(comment => comment.author._id === request.senderId && comment.content === request.body.comment)

        await logService.wroteComment(request.senderId, updatedEvent._id, message._id, comment._id)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.removeMessage = async (request, response) => {
    try {
        const message = request.event.discussion.find(message => message._id.toString() === request.params.messageId)

        if (!message) {
            return response.status(400).json({ error: 'Malformatted message id' })
        }
        
        if (request.senderRole !== roles.CREATOR && request.senderId !== message.author.toString()) {
            return response.status(403).json({ error: 'User does not have required permission' })
        }

        const updatedEvent = await eventService.removeMessage(request.event, request.params.messageId)

        await logService.deletedMessage(message.author, updatedEvent._id, request.params.messageId)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.removeComment = async (request, response) => {
    try {
        const message = request.event.discussion.find(message => message._id.toString() === request.params.messageId)

        if (!message) {
            return response.status(400).json({ error: 'Malformatted message id' })
        }

        const comment = message.comments.find(comment => comment._id.toString() === request.params.commentId)

        if (!comment) {
            return response.status(400).json({ error: 'Malformatted comment id' })
        }
        
        if (request.senderRole !== roles.CREATOR && request.senderId !== comment.author.toString()) {
            return response.status(403).json({ error: 'User does not have required permission' })
        }

        const updatedEvent = await eventService.removeComment(request.event, request.params.messageId, request.params.commentId)

        await logService.deletedComment(comment.author, updatedEvent._id, request.params.messageId, request.params.commentId)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}
