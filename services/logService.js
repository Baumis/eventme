const ActivityLog = require('../models/activityLog')

exports.getAll = async (userId) => {
    const log = await ActivityLog.findOne({ user: userId })

    return log.entries.reverse()
}

exports.delete = async (userId) => {
    await ActivityLog.findOneAndDelete({ user: userId })
}

exports.removeAll = async (userId) => {
    const log = await ActivityLog.findOneAndUpdate({ user: userId }, { entries: [] }, { new: true })

    return log.entries.reverse()
}

exports.removeOne = async (userId, entryId) => {
    const log = await ActivityLog.findOneAndUpdate({ user: userId }, { $pull: { entries: { _id: entryId } } }, { new: true })

    return log.entries.reverse()
}

exports.joinedEvent = async (userId, eventId, eventName) => {
    const event = {
        _id: eventId,
        label: eventName
    }
    await this.write(userId, 'JOINED_EVENT', { event })
}

exports.createdEvent = async (userId, eventId, eventName) => {
    const event = {
        _id: eventId,
        label: eventName
    }
    await this.write(userId, 'CREATED_EVENT', { event })
}

exports.wroteMessage = async (userId, eventId, eventName, messageId, content) => {
    const event = {
        _id: eventId,
        label: eventName
    }
    const message = {
        _id: messageId,
        content
    }
    await this.write(userId, 'WROTE_MESSAGE', { event, message })
}

exports.wroteComment = async (userId, eventId, eventName, messageId, commentId, content) => {
    const event = {
        _id: eventId,
        label: eventName
    }
    const message = {
        _id: messageId,
        content: ''
    }
    const comment = {
        _id: commentId,
        content
    }
    await this.write(userId, 'WROTE_COMMENT', { event, message, comment })
}

exports.create = async (userId) => {
    const newActivityLog = new ActivityLog({
        user: userId,
        entries: []
    })

    await newActivityLog.save()
}

exports.write = async (userId, type, data) => {
    const logEntry = {
        type,
        data,
        time: new Date()
    }

    await ActivityLog.findOneAndUpdate({ user: userId }, { $push: { entries: logEntry } })
}