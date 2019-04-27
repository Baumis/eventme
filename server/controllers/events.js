const eventRouter = require('express').Router()
const Event = require('../models/event')

eventRouter.get('/', async (request, response) => {
    response.json('its done')
})

module.exports = eventRouter