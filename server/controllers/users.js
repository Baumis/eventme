const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')
const Event = require('../models/event')

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })

    response.json(users.map(User.format))
})

userRouter.get('/:id', middleware.requireAuthentication, async (request, response) => {
    try {
        const user = await User
            .findById(request.params.id)
            .populate('myEvents', { _id: 1, label: 1, background: 1 })
            .populate('myInvites', { _id: 1, label: 1, background: 1 })

        const senderId = request.senderId

        if (senderId === request.params.id) {
            response.json(User.format(user))
        } else {
            response.json(User.formatForGuest(user))
        }
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})


userRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        if (!body.username || !body.name || !body.email) {
            return response.status(400).json({ error: 'you must enter a username, name and email' })
        }

        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must have a length of at least 3' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash
        })

        const savedUser = await user.save()

        const populatedUser = await savedUser
            .populate('myEvents', { _id: 1, label: 1, background: 1 })
            .populate('myInvites', { _id: 1, label: 1, background: 1 })
            .execPopulate()

        response.status(201).json(User.format(populatedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

userRouter.put('/:id', middleware.requireAuthentication, async (request, response) => {
    try {
        const body = request.body

        const senderId = request.senderId

        if (senderId !== request.params.id) {
            return response.status(403).send({ error: 'only user itself can update' })
        }

        const existingUser = await User.find({ username: body.username })
        if (existingUser.length > 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        if (!body.username || !body.name || !body.email) {
            return response.status(400).json({ error: 'you must enter a username, name and email' })
        }

        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must have a length of at least 3' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = {
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })

        const populatedUser = await updatedUser
            .populate('myEvents', { _id: 1, label: 1, background: 1 })
            .populate('myInvites', { _id: 1, label: 1, background: 1 })
            .execPopulate()

        response.json(User.format(populatedUser))
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
})

userRouter.delete('/:id', middleware.requireAuthentication, async (request, response) => {
    try {
        const senderId = request.senderId
        const userId = request.params.id

        if (senderId !== userId) {
            return response.status(403).send({ error: 'only user itself can delete' })
        }

        const user = await User.findById(userId)

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
        
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'Malformatted id' })
    }
})

module.exports = userRouter