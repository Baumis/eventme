const jwt = require('jsonwebtoken')

const extractToken = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

const verifyToken = (request, response, next) => {
    try {
        const token = request.token

        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        request.user = decodedToken.id
        next()
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
}

const logger = (request, response, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next()
    }
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

module.exports = {
    logger,
    extractToken,
    verifyToken
}