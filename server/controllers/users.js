const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
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

module.exports = userRouter