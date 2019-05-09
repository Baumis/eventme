const eventRouter = require('express').Router()
const Event = require('../models/event')
const User = require('../models/user')

eventRouter.get('/', async (request, response) => {
    const events = await Event
        .find({})
        .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
        .populate('guests.user', { _id: 1, name: 1 })

    response.json(events)
})

eventRouter.get('/:id', async (request, response) => {
    try {
        const event = await Event
            .findById(request.params.id)
            .populate('creator', { _id: 1, username: 1, name: 1, email: 1 })
            .populate('guests.user', { _id: 1, name: 1 })

        response.json(event)
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

eventRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (!body.label) {
            return response.status(400).json({ error: 'label missing' })
        }

        const creator = '5cd445507c2a502a18cba5ca'

        const newEvent = new Event({
            label: body.label,
            creator: creator,
            settings: {
                background: 'https://picsum.photos/1440/550',
                theme: 'LIGHT'
            },
            infoPanel: {
                phone: '',
                email: '',
                contact: '',
                address: '',
                date: Date.now()
            },
            guests: [{
                user: creator,
                status: 'PENDING'
            }],
            components: []
        })

        const savedEvent = newEvent.save()

        response.status(201).json(savedEvent)
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
})

eventRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const updatedEvent = await Event.findByIdAndUpdate(request.params.id, body.event, { new: true })
        
        response.json(updatedEvent)
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