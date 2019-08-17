const User = require('../models/user')
const userService = require('../services/userService')

exports.login = async (request, response) => {
    try {
        const user = await userService.findByEmailAndPassword(request.body.email, request.body.password)

        response.status(200).json(User.withToken(user))
    } catch(exception) {
        response.status(401).json({ error: exception.message })
    }
}

exports.googleLogin = async (request, response) => {
    try {
        const user = await userService.findOrCreateGoogleUser(request.body.googleToken)

        response.status(200).json(User.withToken(user))
    } catch (exception) {
        response.status(401).json({ error: exception.message })
    }
}