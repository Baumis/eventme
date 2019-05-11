const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

userRouter.get('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)

        response.json(user)
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

        response.status(201).json(savedUser)
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
})

userRouter.put('/:id', async (request, response) => {
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

        const user = {
            username: body.username,
            name: body.name,
            email: body.email,
            passwordHash
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })

        response.json(updatedUser)
    } catch (exception) {
        response.status(500).json({ error: 'something went wrong...' })
    }
})

userRouter.delete('/:id', async (request, response) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        
        response.status(204).end()
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
})

module.exports = userRouter