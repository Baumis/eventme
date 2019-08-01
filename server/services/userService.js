const bcrypt = require('bcrypt')
const User = require('../models/user')
const Event = require('../models/event')

exports.getAllPopulated = async () => {
    return await User
        .find({})
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
}

exports.getOnePopulated = async (id) => {
    return await User
        .findById(id)
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
}

exports.getOneByEmail = async (email) => {
    return await User.findOne({ email })
}

exports.create = async (userObject) => {
    const existingUser = await this.getOneByEmail(userObject.email)

    if (existingUser) {
        throw new Error('Email must be unique')
    }

    if (!userObject.password || userObject.password.length < 3) {
        throw new Error('Password too short')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userObject.password, saltRounds)

    const user = new User({
        username: userObject.username,
        name: userObject.name,
        email: userObject.email,
        passwordHash
    })

    const error = user.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    return await user.save()
}

exports.update = async (id, userObject) => {
    const user = await User.findById(id)

    if (!user) {
        throw new Error('Malformatted id')
    }

    user.username = userObject.username || user.username
    user.name = userObject.name || user.name
    user.email = userObject.email || user.email

    const error = user.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    const savedUser = await user.save()

    return await savedUser
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
        .execPopulate()
}

exports.delete = async (id) => {
    const user = await User.findById(id)

    if (!user) {
        throw new Error('Malformatted id')
    }

    const myEventsPromises = user.myEvents.map(eventId => Event.findById(eventId))
    const myEvents = await Promise.all(myEventsPromises)

    for (let myEvent of myEvents) {
        const myEventGuestsPromises = myEvent.guests.map(guest => User.findById(guest.user))
        const myEventGuests = await Promise.all(myEventGuestsPromises)

        for (let myEventGuest of myEventGuests) {
            myEventGuest.myInvites = myEventGuest.myInvites.filter(eventId => eventId !== myEvent._id)
            await myEventGuest.save()
        }
    }

    await Event.deleteMany({creator: user._id})

    const myInvitesPromises = user.myInvites.map(eventId => Event.findById(eventId))
    const myInvites = await Promise.all(myInvitesPromises)

    for (let myInvite of myInvites) {
        myInvite.guests = myInvite.guests.filter(guest => guest.user.toString() !== user._id.toString())
        await myInvite.save()
    }

    await user.remove()
}