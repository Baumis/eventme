const searchService = require('../services/searchService')
const User = require('../models/user')
const Event = require('../models/event')

exports.getAll = async (request, response) => {
    try {
        const searchObject = await searchService.getAll(request.query.keyword, request.query.limit)
        const responseObject = {
            events: searchObject.events.map(Event.formatForGhost),
            users: searchObject.users.map(User.formatForGhost)
        }
        response.json(responseObject)
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}
