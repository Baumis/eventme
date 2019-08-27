const User = require('../models/user')
const userService = require('../services/userService')
const logService = require('../services/logService')

exports.getOne = async (request, response) => {
    try {
        const user = await userService.getOnePopulated(request.params.id)

        if (request.senderId === request.params.id) {
            response.json(User.format(user))
        } else {
            response.json(User.formatForGuest(user))
        }
    } catch (exception) {
        response.status(400).json({ error: 'Malformatted id' })
    }
}

exports.create = async (request, response) => {
    try {
        const createdUser = await userService.create(request.body)

        logService.create(createdUser._id)

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

        logService.delete(request.params.id)

        response.status(204).end()
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}