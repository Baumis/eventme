const eventRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Event = require('../models/event')
const User = require('../models/user')

eventRouter.get('/', async (request, response) => {
    const events = await Event
        .find({})
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })

    response.json(events)
})

eventRouter.get('/:id', async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })

        response.json(Event.format(event))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/', middleware.requireAuthentication, async (request, response) => {
    try {
        const body = request.body
        const userId = request.senderId

        const user = await User.findById(userId)

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
})

eventRouter.put('/:id', middleware.requireAuthentication, async (request, response) => {
    try {
        const body = request.body

        const event = {
            label: body.label,
            inviteKey: body.inviteKey,
            background: body.background,
            infoPanel: body.infoPanel,
            components: body.components
        }

        const updatedEvent = await Event.findByIdAndUpdate(request.params.id, event, { new: true })

        const populatedEvent = await updatedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.delete('/:id', middleware.requireAuthentication, async (request, response) => {
    try {
        await Event
            .findByIdAndDelete(request.params.id)

        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/:id/addguest/:userId', middleware.requireAuthentication, async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)
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
})

eventRouter.post('/:id/removeguest/:userId', middleware.requireAuthentication, async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)
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
})

eventRouter.post('/:id/validatekey/:inviteKey', async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)

        if (event.inviteKey !== request.params.inviteKey) {
            return response.status(400).send({ error: 'Malformatted inviteKey' })
        }

        response.json(request.params.inviteKey)
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/:id/join/:inviteKey', middleware.requireAuthentication, async (request, response) => {
    try {
        const userId = request.senderId

        const event = await Event.findById(request.params.id)
        const user = await User.findById(userId)

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

        response.json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/:id/setstatus/:userId', middleware.requireAuthentication, async (request, response) => {
    try {
        const status = request.body.status

        if (!status) {
            return response.status(400).send({ error: 'Status missing' })
        }

        const event = await Event.findById(request.params.id)
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

        response.status(201).json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

module.exports = eventRouter