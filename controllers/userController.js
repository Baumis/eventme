const User = require('../models/user')
const userService = require('../services/userService')
const logService = require('../services/logService')
const emailService = require('../services/emailService')
const jwt = require('jsonwebtoken')

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

        await logService.create(createdUser._id)

        await emailService.sendEmailVerification(createdUser)

        const token = User.generateToken(createdUser)

        response.cookie('jwt', token, { expires: new Date(Date.now() + 86400000), httpOnly: true })
        response.status(201).json(User.formatForLogin(createdUser))
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

exports.updatePassword = async (request, response) => {
    try {
        if (request.senderId !== request.params.id) {
            return response.status(403).json({ error: 'Only user itself can update password' })
        }

        if (!request.body.oldPassword || !request.body.newPassword) {
            return response.status(400).json({ error: 'Old or new password not provided' })
        }

        const correctPassword = await userService.isPasswordCorrect(request.params.id, request.body.oldPassword)
        
        if (!correctPassword) {
            return response.status(401).json({ error: 'Password incorrect' })
        }

        const updatedUser = await userService.updatePassword(request.params.id, request.body.newPassword)

        response.json(User.format(updatedUser))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.verifyEmail = async (request, response) => {
    try {
        const { id, token } = request.params

        const decodedToken = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET)

        if (decodedToken.id !== id) {
            return response.status(400).json({ error: 'Invalid verify token or id' })
        }

        const updatedUser = await userService.verifyEmail(id)

        response.json(User.format(updatedUser))
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}

exports.sendEmailVerification = async (request, response) => {
    try {
        if (request.senderId !== request.params.id) {
            return response.status(403).json({ error: 'Only user itself can send email verification' })
        }

        const user = await userService.getOne(request.params.id)

        await emailService.sendEmailVerification(user)

        response.end()
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

        await logService.delete(request.params.id)

        response.status(204).end()
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}