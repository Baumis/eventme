const eventRouter = require('express').Router()
const Event = require('../models/event')

eventRouter.get('/', async (request, response) => {
    const events = await Event.find({})
    response.json(events)
})

eventRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (!body.label) {
            return response.status(400).json({ error: 'label missing' })
        }

        const creator = 'Mr Creator'

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
            guests: [creator],
            components: []
        })

        const savedEvent = newEvent.save()

        response.status(201).json(savedEvent)
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = eventRouter