const User = require('../models/user')
const userService = require('../services/userService')

exports.getAll = async (request, response) => {
    const users = await userService.getAllPopulated()

    response.json(users.map(User.format))
}

exports.getOne = async (request, response) => {
    try {
        const user = await userService.getOnePopulated(request.params.id)

        if (request.senderId === request.params.id) {
            response.json(User.format(user))
        } else {
            response.json(User.formatForGuest(user))
        }
    } catch (exception) {
        response.status(400).send({ error: 'Malformatted id' })
    }
}

exports.create = async (request, response) => {
    try {
        const createdUser = await userService.create(request.body)
        response.status(201).json(User.format(createdUser))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.update = async (request, response) => {
    try {
        if (request.senderId !== request.params.id) {
            return response.status(403).json({ error: 'Only user itself can update' })
        }

        const updatedUser = await userService.update(request.params.id, request.body)

        response.json(User.format(updatedUser))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.delete = async (request, response) => {
    try {
        if (request.senderId !== request.params.id) {
            return response.status(403).json({ error: 'Only user itself can delete' })
        }

        await userService.delete(request.params.id)

        response.status(204).end()
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}