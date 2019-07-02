const ObjectId = require('mongoose').Types.ObjectId
const jwt = require('jsonwebtoken')
const eventRouter = require('express').Router()
const Event = require('../models/event')
const User = require('../models/user')

eventRouter.get('/', async (request, response) => {
    const events = await Event
        .find({})
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })

    response.json(events.map(Event.format))
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

        const creator = decodedToken.id //'5cd445507c2a502a18cba5ca'

        const newEvent = new Event({
            label: body.label,
            creator: creator,
            settings: body.settings,
            infoPanel: body.infoPanel,
            guests: [{
                user: creator,
                status: 'GOING'
            }],
            components: body.components
        })

        const savedEvent = await newEvent.save()

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

eventRouter.post('/:id/add/:guestId', async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)
        const user = await User.findById(request.params.guestId)

        event.guests = event.guests.concat({
            user: user._id,
            status: 'PENDING'
        })

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

eventRouter.post('/:id/remove/:guestId', async (request, response) => {
    try {
        const event = await Event.findById(request.params.id)

        event.guests = event.guests.filter(guest => guest.user.toString() !== request.params.guestId)

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

eventRouter.get('/user/:userId', async (request, response) => {
    try {

        const events = await Event
            .find({ creator: ObjectId(request.params.userId) })
            .populate('creator', { _id: 1, name: 1 })
            .populate('guests.user', { _id: 1, name: 1 })

        response.json(events.map(Event.format))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

module.exports = eventRouter