const User = require('../models/user')
const Event = require('../models/event')

exports.getAll = async (keyword, limit) => {
    if (isNaN(limit)) {
        throw new Error('Limit is not valid')
    } else if (typeof keyword !== 'string') {
        throw new Error('Keyword is not valid')
    }

    keyword = keyword.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")

    const usersPromise = User
        .find({ name: new RegExp(keyword, 'i') })
        .limit(Number(limit))
    const eventsPromise = Event
        .find({ label: new RegExp(keyword, 'i'), public: true })
        .limit(Number(limit))

    const promises = await Promise.all([usersPromise, eventsPromise])

    const users = promises[0]
    const events = promises[1]

    return { users, events }
}

exports.findEvents = async (label, startDate, endDate, page, limit) => {
    if (isNaN(limit)) {
        throw new Error('Limit is not valid')
    } else if (isNaN(page)) {
        throw new Error('Page is not valid')
    }

    const keyword = label ? label.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") : null

    let events

    if (startDate && endDate && keyword) {
        events = await Event
            .find({ label: new RegExp(keyword, 'i'), public: true, startDate: { $gte: new Date(startDate), $lte: new Date(endDate) } })
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(Number(limit))
    } else if (startDate && endDate) {
        events = await Event
            .find({ public: true, startDate: { $gte: new Date(startDate), $lte: new Date(endDate) } })
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(Number(limit))
    } else if (keyword) {
        events = await Event
            .find({ label: new RegExp(keyword, 'i'), public: true })
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(Number(limit))
    } else {
        events = await Event
            .find({ public: true })
            .sort({ createdAt: -1 })
            .skip(page * limit)
            .limit(Number(limit))
    }

    return events
}

exports.findUpcomingEvents = async (page, limit) => {
    if (isNaN(limit)) {
        throw new Error('Limit is not valid')
    } else if (isNaN(page)) {
        throw new Error('Page is not valid')
    }

    const events = await Event
        .find({ public: true, startDate: { $gte: Date.now() } })
        .sort({ startDate: 1 })
        .skip(page * limit)
        .limit(Number(limit))

    return events
}

exports.findUsers = async (name, page, limit) => {
    if (isNaN(limit)) {
        throw new Error('Limit is not valid')
    } else if (isNaN(page)) {
        throw new Error('Page is not valid')
    } else if (typeof name !== 'string') {
        throw new Error('Name is not valid')
    }

    const keyword = name.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")

    const users = await User
        .find({ name: new RegExp(keyword, 'i') })
        .sort({ name: 1 })
        .skip(page * limit)
        .limit(Number(limit))

    return users
}