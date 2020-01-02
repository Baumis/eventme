const Event = require('../models/event')

const eventService = require('../services/eventService')
const logService = require('../services/logService')
const emailService = require('../services/emailService')

const roles = require('../utils/roles')

exports.getOne = async (request, response) => {
    try {
        const event = await eventService.populate(request.event)

        const senderRole = request.senderRole

        if (senderRole === roles.CREATOR) {
            response.json(Event.format(event))
        } else {
            response.json(Event.formatForGuest(event, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: 'Malformatted id' })
    }
}

exports.create = async (request, response) => {
    try {
        const createdEvent = await eventService.create(request.senderId, request.body)

        logService.createdEvent(request.senderId, createdEvent._id, createdEvent.label)

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
        const userId = request.body.userId

        const updatedEvent = await eventService.addGuest(request.event, userId)

        logService.joinedEvent(userId, updatedEvent._id, updatedEvent.label)

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

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
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

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(event))
        } else {
            response.json(Event.formatForGuest(event, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.joinEvent = async (request, response) => {
    try {
        const updatedEvent = await eventService.addGuest(request.event, request.senderId)

        logService.joinedEvent(request.senderId, updatedEvent._id, updatedEvent.label)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
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
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addMessage = async (request, response) => {
    try {
        const updatedEvent = await eventService.addMessage(request.event, request.senderId, request.body.message)

        const message = updatedEvent.discussion.find(message => message.author._id.toString() === request.senderId && message.content === request.body.message)

        logService.wroteMessage(request.senderId, updatedEvent._id, updatedEvent.label, message._id, message.content)
        emailService.notifyAboutNewMessage(message, request.event)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addComment = async (request, response) => {
    try {
        const updatedEvent = await eventService.addComment(request.event, request.senderId, request.params.messageId, request.body.comment)

        const message = updatedEvent.discussion.find(message => message._id.toString() === request.params.messageId)

        const comment = message.comments.slice().reverse().find(comment => comment.author._id.toString() === request.senderId && comment.content === request.body.comment)

        logService.wroteComment(request.senderId, updatedEvent._id, updatedEvent.label, message._id, comment._id, comment.content)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
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

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
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

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addVoteToVoteComponent = async (request, response) => {
    try {
        const { componentId, optionId } = request.params
        const userId = request.senderId

        const updatedEvent = await eventService.addVoteToVoteComponent(request.event, componentId, optionId, userId)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.removeVoteFromVoteComponent = async (request, response) => {
    try {
        const { id, componentId, optionId } = request.params
        const userId = request.senderId

        const updatedEvent = await eventService.removeVoteFromVoteComponent(id, componentId, optionId, userId)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addAnswersToFormComponent = async (request, response) => {
    try {
        const { componentId } = request.params
        const userId = request.senderId
        const answers = request.body.answers

        const updatedEvent = await eventService.addAnswersToFormComponent(request.event, componentId, answers, userId)

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.addRegistration = async (request, response) => {
    try {
        const updatedEvent = await eventService.addRegistration(request.event, request.body.name, request.senderId)
        
        if (request.senderId) {
            logService.joinedEvent(request.senderId, updatedEvent._id, updatedEvent.label)
        }

        if (request.senderRole === roles.CREATOR) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent, request.senderId))
        }
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}