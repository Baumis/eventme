const User = require('../models/user')
const userService = require('../services/userService')

exports.login = async (request, response) => {
    try {
        const user = await userService.findByUsernameAndPassword(request.body.username, request.body.password)

        const token = User.generateToken(user)

        response.cookie('jwt', token, { expires: new Date(Date.now() + 86400000), httpOnly: true })
        response.status(200).json(User.formatForLogin(user))
    } catch (exception) {
        response.status(401).json({ error: exception.message })
    }
}

exports.refresh = async (request, response) => {
    try {
        const user = await userService.getOne(request.senderId)

        response.json(User.formatForLogin(user))
    } catch (exception) {
        response.status(400).json({ error: 'Malformatted id' })
    }
}

exports.googleLogin = async (request, response) => {
    try {
        const user = await userService.findOrCreateGoogleUser(request.body.googleToken)

        const token = User.generateToken(user)

        response.cookie('jwt', token, { expires: new Date(Date.now() + 86400000), httpOnly: true })
        response.status(200).json(User.formatForLogin(user))
    } catch (exception) {
        response.status(401).json({ error: exception.message })
    }
}

exports.facebookLogin = async (request, response) => {
    try {
        const user = await userService.findOrCreateFacebookUser(request.body.userId, request.body.facebookToken)

        const token = User.generateToken(user)

        response.cookie('jwt', token, { expires: new Date(Date.now() + 86400000), httpOnly: true })
        response.status(200).json(User.formatForLogin(user))
    } catch (exception) {
        response.status(401).json({ error: exception.message })
    }
}

exports.logout = (request, response) => {
    response.clearCookie('jwt')
    response.status(204).end()
}