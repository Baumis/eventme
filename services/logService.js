const ActivityLog = require('../models/activityLog')

exports.getAll = async (userId) => {
    return await ActivityLog.findOne({ user: userId })
}

exports.delete = async (userId) => {
    await ActivityLog.findOneAndDelete({ user: userId })
}

exports.removeAll = async (userId) => {
    return await ActivityLog.findOneAndUpdate({ user: userId }, { entries: [] }, { new: true })
}

exports.removeOne = async (userId, entryId) => {
    return await ActivityLog.findOneAndUpdate({ user: userId }, { $pull: { entries: { _id: entryId } } }, { new: true })
}

exports.joinedEvent = async (userId, eventId) => {
    await this.write(userId, 'JOINED_EVENT', { event: eventId })
}

exports.leftEvent = async (userId, eventId) => {
    await this.write(userId, 'LEFT_EVENT', { event: eventId })
}

exports.createdEvent = async (userId, eventId) => {
    await this.write(userId, 'CREATED_EVENT', { event: eventId })
}

exports.updatedEvent = async (userId, eventId) => {
    await this.write(userId, 'UPDATED_EVENT', { event: eventId })
}

exports.changedInviteKey = async (userId, eventId) => {
    await this.write(userId, 'CHANGED_INVITEKEY', { event: eventId })
}

exports.changedStatus = async (userId, eventId) => {
    await this.write(userId, 'CHANGED_STATUS', { event: eventId })
}

exports.deletedEvent = async (userId, eventId) => {
    await this.write(userId, 'DELETED_EVENT', { event: eventId })
}

exports.wroteMessage = async (userId, eventId, messageId) => {
    await this.write(userId, 'WROTE_MESSAGE', { event: eventId, message: messageId })
}

exports.deletedMessage = async (userId, eventId, messageId) => {
    await this.write(userId, 'DELETED_MESSAGE', { event: eventId, message: messageId })
}

exports.wroteComment = async (userId, eventId, messageId, commentId) => {
    await this.write(userId, 'WROTE_COMMENT', { event: eventId, message: messageId, comment: commentId })
}

exports.deletedComment = async (userId, eventId, messageId, commentId) => {
    await this.write(userId, 'DELETED_COMMENT', { event: eventId, message: messageId, comment: commentId })
}

exports.updatedUser = async (userId) => {
    await this.write(userId, 'UPDATED_USER', {})
}

exports.createdUser = async (userId) => {
    const logEntry = {
        type: 'CREATED_USER',
        data: {},
        time: new Date()
    }

    const newActivityLog = new ActivityLog({
        user: userId,
        entries: [logEntry]
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