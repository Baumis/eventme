const jwt = require('jsonwebtoken')
const eventRouter = require('express').Router()
const Event = require('../models/event')
const User = require('../models/user')

eventRouter.get('/', async (request, response) => {
    const events = await Event
        .find({})
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })

    response.json(events)
})

eventRouter.get('/template', async (request, response) => {
    const eventTemplate = new Event().toObject()

    delete eventTemplate['_id']

    response.json(Event.format(eventTemplate))
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

eventRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const token = request.token

        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const newEvent = new Event({
            label: body.label,
            creator: user._id,
            inviteKey: body.inviteKey,
            settings: body.settings,
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
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

eventRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const event = {
            label: body.label,
            inviteKey: body.inviteKey,
            settings: body.settings,
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

eventRouter.delete('/:id', async (request, response) => {
    try {
        await Event
            .findByIdAndDelete(request.params.id)

        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/:id/addguest/:guestId', async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)
        const user = await User.findById(request.params.guestId)

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

        response.status(201).json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/:id/removeguest/:guestId', async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)
        const user = await User.findById(request.params.guestId)

        event.guests = event.guests.filter(guest => guest.user.toString() !== request.params.guestId)
        user.myInvites = user.myInvites.filter(event => event.toString() !== request.params.id)

        const savedEvent = await event.save()
        await user.save()

        const populatedEvent = await savedEvent
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })
            .execPopulate()

        response.status(201).json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.get('/:id/:invitekey', async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)

        if (event.inviteKey !== request.params.invitekey) {
            return response.status(400).send({ error: 'Malformatted inviteKey' })
        }

        response.json('you can join')
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

module.exports = eventRouter