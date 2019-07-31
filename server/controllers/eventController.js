const Event = require('../models/event')
const User = require('../models/user')

exports.getAll = async (request, response) => {
    const events = await Event
        .find({})
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })

    response.json(events.map(Event.format))
}

exports.getOne = async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })

        const senderId = request.senderId

        if (senderId === event.creator._id.toString()) {
            response.json(Event.format(event))
        } else if (event.guests.find(guest => guest.user._id.toString() === senderId)) {
            response.json(Event.formatForGuest(event))
        } else {
            response.status(403).send({ error: 'Event is private' })
        }
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.create = async (request, response) => {
    try {
        const body = request.body
        const senderId = request.senderId

        const user = await User.findById(senderId)

        const newEvent = new Event({
            label: body.label,
            creator: user._id,
            inviteKey: body.inviteKey,
            background: body.background,
            infoPanel: body.infoPanel,
            guests: [{
                user: user._id,
                status: 'GOING'
            }],
            components: body.components
        })

        user.myEvents = user.myEvents.concat(newEvent._id)

        const savedEvent = await newEvent.save()
        await user.save()

        const populatedEvent = await savedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.status(201).json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
}

exports.update = async (request, response) => {
    try {
        const body = request.body

        const event = await Event.findById(request.params.id)

        const senderId = request.senderId

        if (senderId !== event.creator._id.toString()) {
            return response.status(403).send({ error: 'only creator can update event' })
        }

        event.label = body.label || event.label
        event.inviteKey = body.inviteKey || event.inviteKey,
        event.background = body.background || event.background,
        event.infoPanel = body.infoPanel || event.infoPanel,
        event.components = body.components || event.components

        const error = event.validateSync()

        if (error) {
            return response.status(400).send({ error: 'Malformatted event' })
        }

        const updatedEvent = await event.save()

        const populatedEvent = await updatedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.delete = async (request, response) => {
    try {

        const event = await Event.findById(request.params.id)

        const senderId = request.senderId

        if (senderId !== event.creator._id.toString()) {
            return response.status(403).send({ error: 'only creator can remove event' })
        }

        const creator = await User.findById(event.creator._id)

        creator.myEvents = creator.myEvents.filter(eventId => eventId !== event._id)

        await creator.save()

        const guestsPromises = event.guests.map(guest => User.findById(guest.user))
        const guests = await Promise.all(guestsPromises)

        for (guest of guests) {
            guest.myInvites = guest.myInvites.filter(eventId => eventId !== event._id)
            await guest.save()
        }

        await event.remove()

        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.addGuest = async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)

        const senderId = request.senderId

        if (senderId !== event.creator._id.toString()) {
            return response.status(403).send({ error: 'only creator can add guests' })
        }

        const user = await User.findById(request.params.userId)

        event.guests = event.guests.concat({
            user: user._id,
            status: 'PENDING'
        })

        user.myInvites = user.myInvites.concat(event._id)

        const savedEvent = await event.save()
        await user.save()

        const populatedEvent = await savedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.removeGuest = async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)

        const senderId = request.senderId

        if (senderId !== event.creator._id.toString() && senderId !== request.params.userId) {
            return response.status(403).send({ error: 'only creator or guest itself can remove guest' })
        }

        const user = await User.findById(request.params.userId)

        event.guests = event.guests.filter(guest => guest.user.toString() !== request.params.userId)
        user.myInvites = user.myInvites.filter(event => event.toString() !== request.params.id)

        const savedEvent = await event.save()
        await user.save()

        const populatedEvent = await savedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.validateInviteKey = async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)

        if (event.inviteKey !== request.params.inviteKey) {
            return response.status(400).send({ error: 'Malformatted inviteKey' })
        }

        const populatedEvent = await event
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.json(Event.formatForGuest(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.joinEvent =  async (request, response) => {
    try {
        const senderId = request.senderId

        const event = await Event.findById(request.params.id)
        const user = await User.findById(senderId)

        if (event.inviteKey !== request.params.inviteKey) {
            return response.status(400).send({ error: 'Malformatted inviteKey' })
        }

        event.guests = event.guests.concat({
            user: user._id,
            status: 'PENDING'
        })

        user.myInvites = user.myInvites.concat(event._id)

        const savedEvent = await event.save()
        await user.save()

        const populatedEvent = await savedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.json(Event.formatForGuest(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.setStatus = async (request, response) => {
    try {
        const status = request.body.status

        if (!status) {
            return response.status(400).send({ error: 'Status missing' })
        }

        const event = await Event.findById(request.params.id)

        const senderId = request.senderId

        if (senderId !== event.creator._id.toString() && senderId !== request.params.userId) {
            return response.status(403).send({ error: 'only creator or guest itself can change status' })
        }

        const user = await User.findById(request.params.userId)

        event.guests = event.guests.map(guest => {
            guest.status = guest.user.toString() === user._id.toString() ? status : guest.status
            return guest
        })

        const error = event.validateSync()

        if (error) {
            return response.status(400).send({ error: 'Malformatted status' })
        }

        const savedEvent = await event.save()

        const populatedEvent = await savedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        if (senderId === event.creator._id.toString()) {
            response.json(Event.format(populatedEvent))
        } else {
            response.json(Event.formatForGuest(populatedEvent))
        }
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}