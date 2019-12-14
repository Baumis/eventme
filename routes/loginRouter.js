const loginRouter = require('express').Router()
const middleware = require('../utils/middleware')
const loginController = require('../controllers/loginController')

loginRouter.post('/', loginController.login)

loginRouter.post('/refresh', middleware.requireAuthentication, loginController.refresh)

loginRouter.post('/google', loginController.googleLogin)

loginRouter.post('/facebook', loginController.facebookLogin)

loginRouter.post('/logout', loginController.logout)

module.exports = loginRouter