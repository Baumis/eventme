const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/user')
const Event = require('../models/event')
const eventService = require('./eventService')
const emailService = require('../services/emailService')

exports.getOne = async (id) => {
    return await User.findById(id)
}

exports.getOnePopulated = async (id) => {
    return await User
        .findById(id)
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
}

exports.create = async (userObject) => {
    const existingUser = await User.findOne({ userType: 'LOCAL', username: userObject.username })

    if (existingUser) {
        throw new Error('Username must be unique')
    }

    if (!userObject.username) {
        throw new Error('Username must be defined')
    }

    if (!userObject.password || userObject.password.length < 3) {
        throw new Error('Password too short')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userObject.password, saltRounds)

    const user = new User({
        userType: 'LOCAL',
        name: userObject.name,
        username: userObject.username,
        email: userObject.email,
        emailVerified: false,
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

    const updateObject = {
        name: userObject.name,
        email: userObject.email,
        avatar: userObject.avatar,
        cover: userObject.cover
    }

    const emailChanged = user.email !== updateObject.email

    if (emailChanged) {
        updateObject.emailVerified = false
    }

    const savedUser = await User.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })

    if (emailChanged) {
        emailService.sendEmailVerification(savedUser)
    }

    return await savedUser
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
        .execPopulate()
}

exports.verifyEmail = async (id) => {
    const updateObject = {
        emailVerified: true
    }

    const savedUser = await User.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })

    return await savedUser
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
        .execPopulate()
}

exports.delete = async (id) => {
    const session = await User.startSession()
    session.startTransaction()
    const options = { session }

    try {
        const user = await User.findById(id)

        if (!user) {
            throw new Error('Malformatted id')
        }

        const myEventsPromises = user.myEvents.map(eventId => Event.findById(eventId))
        const myEvents = await Promise.all(myEventsPromises)

        for (let myEvent of myEvents) {
            for (let myEventGuest of myEvent.guests) {
                await this.removeFromMyInvites(myEventGuest.user, myEvent._id, options)
            }
            await Event.findByIdAndDelete(myEvent._id, options)
        }

        for (let myInvite of user.myInvites) {
            await eventService.removeFromGuests(myInvite, user._id, options)
        }

        await User.findByIdAndDelete(user._id, options)

        await session.commitTransaction()
        session.endSession()
    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove user')
    }
}

exports.findByUsernameAndPassword = async (username, password) => {
    const user = await User.findOne({ userType: 'LOCAL', username })
    const passwordCorrect = user === null ?
        false :
        await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        throw new Error('Invalid email or password')
    }

    return user
}

exports.findOrCreateGoogleUser = async (googleToken) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
        idToken: googleToken
    })

    const googleUser = ticket.getPayload()

    const existingUser = await User.findOne({ userType: 'GOOGLE', externalId: googleUser.sub })

    if (existingUser) {
        return existingUser
    }

    const user = new User({
        userType: 'GOOGLE',
        externalId: googleUser.sub,
        name: googleUser.name,
        email: googleUser.email,
        emailVerified: true,
        avatar: googleUser.picture
    })

    const error = user.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    return await user.save()
}

exports.addToMyEvents = async (id, eventId, options = {}) => {
    const user = await User.findByIdAndUpdate(id, { $addToSet: { myEvents: eventId } }, options)

    if (!user) {
        throw Error('Malformatted id')
    }
}

exports.removeFromMyEvents = async (id, eventId, options = {}) => {
    const user = await User.findByIdAndUpdate(id, { $pull: { myEvents: eventId } }, options)

    if (!user) {
        throw Error('Malformatted id')
    }
}

exports.addToMyInvites = async (id, eventId, options = {}) => {
    const user = await User.findByIdAndUpdate(id, { $addToSet: { myInvites: eventId } }, options)

    if (!user) {
        throw Error('Malformatted id')
    }
}

exports.removeFromMyInvites = async (id, eventId, options = {}) => {
    const user = await User.findByIdAndUpdate(id, { $pull: { myInvites: eventId } }, options)

    if (!user) {
        throw Error('Malformatted id')
    }
}