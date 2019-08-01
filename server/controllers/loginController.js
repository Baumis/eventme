const loginService = require('../services/loginService')

exports.login = async (request, response) => {
    try {
        const loginObject = await loginService.login(request.body.email, request.body.password)

        response.status(200).send(loginObject)
    } catch(exception) {
        response.status(401).json({ error: exception.message })
    }
}