const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/user')
const Event = require('../models/event')
const emailService = require('./emailService')
const pictureService = require('./pictureService')
const axios = require('axios')

exports.getOne = async (id) => {
    return await User.findById(id)
}

exports.getOnePopulated = async (id) => {
    return await User
        .findById(id)
        .populate({
            path: 'myEvents',
            populate: { path: 'creator', select: '_id name avatar' },
        })
        .populate({
            path: 'myInvites',
            populate: { path: 'creator', select: '_id name avatar' },
        })
}

exports.populate = async (user) => {
    const populatedUser = await user
        .populate({
            path: 'myEvents',
            populate: { path: 'creator', select: '_id name avatar' },
        })
        .populate({
            path: 'myInvites',
            populate: { path: 'creator', select: '_id name avatar' },
        })
        .execPopulate()

    return populatedUser
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
        cover: userObject.cover,
        description: userObject.description
    }

    const emailChanged = user.email !== updateObject.email

    if (emailChanged) {
        updateObject.emailVerified = false
    }

    const savedUser = await User.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })

    if (emailChanged) {
        emailService.sendEmailVerification(savedUser)
    }

    return await this.populate(savedUser)
}

exports.updatePassword = async (id, newPassword) => {

    const user = await User.findById(id)

    if (user.userType !== 'LOCAL') {
        throw new Error('You can only change password of local accounts')
    }

    if (!newPassword || newPassword.length < 3) {
        throw new Error('Password too short')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    const savedUser = await User.findByIdAndUpdate(id, { passwordHash }, { new: true, runValidators: true })

    return await this.populate(savedUser)
}

exports.verifyEmail = async (id) => {
    const updateObject = {
        emailVerified: true
    }

    const savedUser = await User.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })

    return await this.populate(savedUser)
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
            for (let myEventRegistration of myEvent.registrations) {
                if (myEventRegistration.user) {
                    await this.removeFromMyInvites(myEventRegistration.user, myEvent._id, options)
                }
            }
            await Event.findByIdAndDelete(myEvent._id, options)
        }

        for (let myInvite of user.myInvites) {
            await Event.findByIdAndUpdate(myInvite,
                { $pull: { registrations: { _id: user._id } } }, options)
        }

        await User.findByIdAndDelete(user._id, options)

        await pictureService.deleteAllByUser(user._id)

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
        throw new Error('Invalid username or password')
    }

    return user
}

exports.resetPassword = async (username, email) => {
    const user = await User.findOne({ userType: 'LOCAL', username, email })

    if (!user || !user.emailVerified) {
        return
    }

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const passwordLength = Math.floor(Math.random() * 5) + 8
    let newPassword = ''
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        newPassword += chars.substring(randomNumber, randomNumber + 1)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    const updatedUser = await User.findByIdAndUpdate(user._id, { passwordHash }, { new: true, runValidators: true })

    await emailService.sendNewPassword(updatedUser, newPassword)
}

exports.isPasswordCorrect = async (id, password) => {
    const user = await User.findById(id)
    const passwordCorrect = user === null ?
        false :
        await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        return false
    }

    return true
}

exports.findOrCreateGoogleUser = async (googleToken) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
        idToken: googleToken
    })

    const googleUser = ticket.getPayload()

    const existingUser = await User.findOne({ userType: 'GOOGLE', externalId: googleUser.sub })

    if (existingUser) {
        const newPicture = googleUser.picture.slice(0, googleUser.picture.lastIndexOf('=')) + '=s200-c'

        if (existingUser.avatar !== newPicture) {
            return await User.findByIdAndUpdate(existingUser._id, { avatar: newPicture })
        } else {
            return existingUser
        }
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

exports.findOrCreateFacebookUser = async (userId, facebookToken) => {
    const response = await axios.get(`https://graph.facebook.com/${userId}?fields=id,name,email,picture.width(720).height(720)&access_token=${facebookToken}`)
    const facebookUser = response.data

    const existingUser = await User.findOne({ userType: 'FACEBOOK', externalId: facebookUser.id })

    if (existingUser) {
        if (existingUser.avatar !== facebookUser.picture.data.url) {
            return await User.findByIdAndUpdate(existingUser._id, { avatar: facebookUser.picture.data.url })
        } else {
            return existingUser
        }
    }

    const user = new User({
        userType: 'FACEBOOK',
        externalId: facebookUser.id,
        name: facebookUser.name,
        email: facebookUser.email,
        emailVerified: true,
        avatar: facebookUser.picture.data.url
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