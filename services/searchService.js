const User = require('../models/user')
const Event = require('../models/event')

exports.getAll = async (keyword, limit) => {
    if (isNaN(limit)) {
        throw new Error('Limit is not valid')
    } else if (typeof keyword !== 'string') {
        throw new Error('Keyword is not valid')
    }

    const usersPromise = User
        .find({ name: new RegExp(keyword, 'i') })
        .limit(Number(limit))
    const eventsPromise = Event
        .find({ label: new RegExp(keyword, 'i') })
        .limit(Number(limit))

    const promises = await Promise.all([usersPromise, eventsPromise])

    const users = promises[0]
    const events = promises[1]

    return { users, events }
}