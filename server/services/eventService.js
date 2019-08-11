const mongoose = require('mongoose')

const Event = require('../models/event')
const User = require('../models/user')

exports.getAllPopulated = async () => {
    return await Event
        .find({})
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
}

exports.getOnePopulated = async (id) => {
    return await Event
        .findById(id)
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
}

exports.populate = async (event) => {
    return await event
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
}

exports.create = async (creatorId, eventObject) => {
    const user = await User.findById(creatorId)

    const startDate = eventObject.startDate ? new Date(eventObject.startDate) : new Date()
    const endDate = eventObject.endDate ? new Date(eventObject.endDate) : new Date(startDate.getDate() + 1)

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

    const savedEvent = await newEvent.save()
    await user.save()

    return await savedEvent
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
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
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
}

exports.delete = async (event) => {
    const creator = await User.findById(event.creator._id)

    creator.myEvents = creator.myEvents.filter(eventId => eventId !== event._id)

    await creator.save()

    const guestsPromises = event.guests.map(guest => User.findById(guest.user))
    const guests = await Promise.all(guestsPromises)

    for (guest of guests) {
        guest.myInvites = guest.myInvites.filter(eventId => eventId !== event._id)
        await guest.save()
    }

    await event.remove()
}

exports.addGuest = async (event, guestId) => {
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

    const savedEvent = await event.save()
    await user.save()

    return await savedEvent
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
}

exports.removeGuest = async (event, guestId) => {
    const user = await User.findById(guestId)

    event.guests = event.guests.filter(guest => guest.user.toString() !== guestId)
    user.myInvites = user.myInvites.filter(event => event !== user._id)

    const savedEvent = await event.save()
    await user.save()

    return await savedEvent
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
}

exports.changeInviteKey = async (event) => {
    event.inviteKey = mongoose.Types.ObjectId().toHexString()

    const updatedEvent = await event.save()

    return await updatedEvent
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
}

exports.setStatus = async (event, guestId, status) => {
    event.guests = event.guests.map(guest => {
        guest.status = guest.user.toString() === guestId.toString() ? status : guest.status
        return guest
    })

    const error = event.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    const savedEvent = await event.save()

    return await savedEvent
        .populate('creator', { _id: 1, name: 1 })
        .populate('guests.user', { _id: 1, name: 1 })
        .execPopulate()
}