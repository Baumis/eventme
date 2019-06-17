const eventRouter = require('express').Router()
const Event = require('../models/event')
const User = require('../models/user')

eventRouter.get('/', async (request, response) => {
    const events = await Event
        .find({})
        .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
        .populate('guests.user', { _id: 1, name: 1 })

    response.json(events.map(Event.format))
})

eventRouter.get('/template', async (request, response) => {
    const eventTemplate = new Event().toObject()

    delete eventTemplate['_id']
    delete eventTemplate['guests']

    response.json(Event.format(eventTemplate))
})

eventRouter.get('/:id', async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)
            .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
            .populate('guests.user', { _id: 1, name: 1 })

        response.json(Event.format(event))
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const creator = '5cd445507c2a502a18cba5ca'

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
                .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
                .populate('guests.user', { _id: 1, name: 1 })
                .execPopulate()

        response.status(201).json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
})

eventRouter.post('/:id/guest', async (request, response) => {
    try {
        const body = request.body

        const event = await Event.findById(request.params.id)
        const user = await User.findById(body.userId)

        event.guests = event.guests.concat({
            user: user._id,
            status: 'PENDING'
        })

        const savedEvent = await event.save()

        const populatedEvent = await savedEvent
                .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
                .populate('guests.user', { _id: 1, name: 1 })
                .execPopulate()

        response.status(201).json(Event.format(populatedEvent))
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
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
                .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
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

module.exports = eventRouter