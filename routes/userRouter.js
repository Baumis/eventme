const userRouter = require('express').Router()
const middleware = require('../utils/middleware')
const userController = require('../controllers/userController')

userRouter.get('/:id', middleware.requireAuthentication, userController.getOne)

userRouter.post('/', userController.create)

userRouter.put('/:id', middleware.requireAuthentication, userController.update)

userRouter.post('/:id/verify', userController.sendEmailVerification)

userRouter.post('/:id/verify/:token', userController.verifyEmail)

userRouter.delete('/:id', middleware.requireAuthentication, userController.delete)

module.exports = userRouter