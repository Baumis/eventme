const loginRouter = require('express').Router()
const loginController = require('../controllers/loginController')

loginRouter.post('/', loginController.login)

loginRouter.post('/google', loginController.googleLogin)

module.exports = loginRouter