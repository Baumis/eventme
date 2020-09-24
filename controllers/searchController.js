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

exports.findEvents = async (request, response) => {
    try {
        const label = request.query.label
        const startDate = request.query.startDate
        const endDate = request.query.endDate
        const page =  request.query.page
        const limit =  request.query.limit

        const events = await searchService.findEvents(label, startDate, endDate, page, limit)

        response.json(events.map(Event.formatForGhost))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.findUpcomingEvents = async (request, response) => {
    try {
        const page =  request.query.page
        const limit =  request.query.limit

        const events = await searchService.findUpcomingEvents(page, limit)

        response.json(events.map(Event.formatForGhost))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.findUsers = async (request, response) => {
    try {
        const name = request.query.name
        const page =  request.query.page
        const limit =  request.query.limit

        const users = await searchService.findUsers(name, page, limit)

        response.json(users.map(User.formatForGhost))
    } catch (exception) {
        response.status(400).json({ error: exception.message })   
    }
}
