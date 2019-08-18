const mongoose = require('mongoose')

const Event = require('../models/event')
const User = require('../models/user')

exports.populate = async (event) => {

    const populatedEvent = await event
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()

    const getUser = async userId => {
        if (userId === null) {
            return null
        }
        const guest = populatedEvent.guests.find(guest => guest.user._id.toString() === userId.toString())
        return guest ? guest.user : await User.findOne({ _id: userId }, { _id: 1, name: 1, avatar: 1 })
    }

    populatedEvent.creator = await getUser(populatedEvent.creator)

    const discussionPromises = populatedEvent.discussion.map(async message => {
        message.author = await getUser(message.author)
        if (message.author === null) {
            message.content = null
        }
        const commentPromises = message.comments.map(async comment => {
            comment.author = await getUser(comment.author)
            if (comment.author === null) {
                comment.content = null
            }
            return comment
        })

        message.comments = await Promise.all(commentPromises)
        return message
    })

    populatedEvent.discussion = await Promise.all(discussionPromises)

    return populatedEvent
}

exports.create = async (creatorId, eventObject) => {
    await Event.createCollection()
    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const user = await User.findById(creatorId)

        const startDate = eventObject.startDate ? new Date(eventObject.startDate) : new Date()
        const endDate = eventObject.endDate ? new Date(eventObject.endDate) : new Date(startDate.getTime() + 1000 * 60 * 60 * 24)

        if (startDate > endDate) {
            throw new Error('End Date must be greater than Start Date')
        }

        const newEvent = new Event({
            label: eventObject.label,
            startDate: startDate,
            endDate: endDate,
            creator: user._id,
            background: eventObject.background,
            infoPanel: eventObject.infoPanel,
            guests: [{
                user: user._id,
                status: 'GOING'
            }],
            components: eventObject.components
        })

        const error = newEvent.validateSync()

        if (error) {
            const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
            throw new Error(errorMessages.join(', '))
        }

        user.myEvents = user.myEvents.concat(newEvent._id)

        await user.save(options)
        const savedEvent = await newEvent.save(options)

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not create event')
    }
}

exports.update = async (event, eventObject) => {

    const startDate = new Date(eventObject.startDate)
    const endDate = new Date(eventObject.endDate)

    if (startDate > endDate) {
        throw new Error('End Date must be greater than Start Date')
    }

    event.label = eventObject.label
    event.startDate = startDate
    event.endDate = endDate
    event.background = eventObject.background
    event.infoPanel = eventObject.infoPanel
    event.components = eventObject.components

    const error = event.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    const savedEvent = await event.save()

    const populatedEvent = await this.populate(savedEvent)

    return populatedEvent
}

exports.delete = async (event) => {
    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const creator = await User.findById(event.creator._id)

        creator.myEvents = creator.myEvents.filter(eventId => eventId.toString() !== event._id.toString())

        await creator.save(options)

        const guestsPromises = event.guests.map(guest => User.findById(guest.user))
        const guests = await Promise.all(guestsPromises)

        for (guest of guests) {
            guest.myInvites = guest.myInvites.filter(eventId => eventId.toString() !== event._id.toString())
            await guest.save(options)
        }

        await event.remove(options)

        await session.commitTransaction()
        session.endSession()

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove event')
    }
}

exports.addGuest = async (event, guestId) => {
    const guest = event.guests.find(guest => guest.user.toString() === guestId)

    if (guest) {
        throw new Error('User is already a guest')
    }

    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const user = await User.findById(guestId)

        event.guests = event.guests.concat({
            user: user._id,
            status: 'PENDING'
        })

        user.myInvites = user.myInvites.concat(event._id)

        await user.save(options)
        const savedEvent = await event.save(options)

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not add guest')
    }
}

exports.removeGuest = async (event, guestId) => {

    if (event.creator.toString() === guestId) {
        throw new Error('Creator can not be removed')
    }

    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const user = await User.findById(guestId)

        event.guests = event.guests.filter(guest => guest.user.toString() !== guestId)
        user.myInvites = user.myInvites.filter(event => event !== user._id)

        await user.save(options)
        const savedEvent = await event.save(options)

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove guest')
    }
}

exports.changeInviteKey = async (event) => {
    event.inviteKey = mongoose.Types.ObjectId().toHexString()

    const savedEvent = await event.save()

    return await this.populate(savedEvent)
}

exports.setStatus = async (event, guestId, status) => {
    event.guests = event.guests.map(guest => {
        guest.status = guest.user.toString() === guestId ? status : guest.status
        return guest
    })

    const error = event.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    const savedEvent = await event.save()

    return await this.populate(savedEvent)
}

exports.addMessage = async (event, author, message) => {

    if (!message) {
        throw new Error('Message required')
    }

    const newMessage = {
        content: message,
        author: author
    }
    event.discussion = event.discussion.concat(newMessage)

    const error = event.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    const savedEvent = await event.save()

    return await this.populate(savedEvent)
}

exports.addComment = async (event, author, messageId, comment) => {
    
    if (!comment) {
        throw new Error('Comment required')
    }

    const newComment = {
        content: comment,
        author: author
    }

    event.discussion = event.discussion.map(message => {
        if (message._id.toString() === messageId) {
            message.comments = message.comments.concat(newComment)
        }
        return message
    })

    const error = event.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    const savedEvent = await event.save()

    return await this.populate(savedEvent)
}

exports.removeMessage = async (event, messageId) => {
    event.discussion = event.discussion.map(message => {
        if (message._id.toString() === messageId) {
            message.author = null
            message.content = null
        }
        return message
    })

    const savedEvent = await event.save()

    return await this.populate(savedEvent)
}

exports.removeComment = async (event, messageId, commentId) => {
    event.discussion = event.discussion.map(message => {
        if (message._id.toString() === messageId) {
            message.comments = message.comments.map(comment => {
                if (comment._id.toString() === commentId) {
                    comment.author = null
                    comment.content = null
                }
                return comment
            })
        }
        return message
    })

    const savedEvent = await event.save()

    return await this.populate(savedEvent)
}