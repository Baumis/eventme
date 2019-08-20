const loginRouter = require('express').Router()
const loginController = require('../controllers/loginController')

loginRouter.post('/', loginController.login)

loginRouter.post('/google', loginController.googleLogin)

loginRouter.post('/logout', loginController.logout)

module.exports = loginRouter