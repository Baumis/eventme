const mongoose = require('mongoose')

const Event = require('../models/event')
const User = require('../models/user')

exports.populate = async (event) => {
    return await event
        .populate('creator', { _id: 1, name: 1, avatar: 1 })
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()
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

    const updatedEvent = await event.save()

    return await updatedEvent
        .populate('creator', { _id: 1, name: 1, avatar: 1 })
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()
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
    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const guest = event.guests.find(guest => guest.user.toString() === guestId)

        if (guest) {
            throw new Error('User is already a guest')
        }

        const user = await User.findById(guestId)

        event.guests = event.guests.concat({
            user: user._id,
            status: 'PENDING'
        })

        user.myInvites = user.myInvites.concat(event._id)

        const savedEvent = await event.save(options)
        await user.save(options)

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
    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const user = await User.findById(guestId)

        event.guests = event.guests.filter(guest => guest.user.toString() !== guestId)
        user.myInvites = user.myInvites.filter(event => event !== user._id)

        const savedEvent = await event.save(options)
        await user.save(options)

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

    const updatedEvent = await event.save()

    return await updatedEvent
        .populate('creator', { _id: 1, name: 1, avatar: 1 })
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()
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

    return await savedEvent
        .populate('creator', { _id: 1, name: 1, avatar: 1 })
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()
}