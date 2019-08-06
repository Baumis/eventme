const Event = require('../models/event')

const eventService = require('../services/eventService')

exports.getAll = async (request, response) => {
    const events = await eventService.getAllPopulated()

    response.json(events.map(Event.format))
}

exports.getOne = async (request, response) => {
    try {
        const event = await eventService.getOnePopulated(request.params.id)
        const senderId = request.senderId

        if (senderId === event.creator._id.toString()) {
            response.json(Event.format(event))
        } else if (event.guests.find(guest => guest.user._id.toString() === senderId)) {
            response.json(Event.formatForGuest(event))
        } else {
            response.status(403).send({ error: 'Event is private' })
        }
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
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
        const updatedEvent = await eventService.update(request.params.id, request.body, request.senderId)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.delete = async (request, response) => {
    try {
        await eventService.delete(request.params.id, request.senderId)
        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.addGuest = async (request, response) => {
    try {
        const updatedEvent = await eventService.addGuest(request.params.id, request.params.userId, request.senderId)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.removeGuest = async (request, response) => {
    try {
        const updatedEvent = await eventService.removeGuest(request.params.id, request.params.userId, request.senderId)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.validateInviteKey = async (request, response) => {
    try {
        const event = await eventService.validateInviteKeyAndGetEvent(request.params.id, request.params.inviteKey)
        response.json(Event.formatForGuest(event))
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.joinEvent =  async (request, response) => {
    try {
        const updatedEvent = await eventService.addGuestWithInviteKey(request.params.id, request.params.inviteKey, request.senderId)
        response.json(Event.formatForGuest(updatedEvent))
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.changeInviteKey = async (request, response) => {
    try {
        const updatedEvent = await eventService.changeInviteKey(request.params.id, request.senderId)
        response.json(Event.format(updatedEvent))
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}

exports.setStatus = async (request, response) => {
    try {
        const updatedEvent = await eventService.setStatus(request.params.id, request.params.userId, request.body.status, request.senderId)

        if (request.senderId === updatedEvent.creator._id.toString()) {
            response.json(Event.format(updatedEvent))
        } else {
            response.json(Event.formatForGuest(updatedEvent))
        }
    } catch (exception) {
        response.status(400).send({ error: exception.message })
    }
}