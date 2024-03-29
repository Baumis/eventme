const userRouter = require('express').Router()
const middleware = require('../utils/middleware')
const userController = require('../controllers/userController')

userRouter.get('/:id', userController.getOne)

userRouter.post('/', userController.create)

userRouter.put('/:id', middleware.requireAuthentication, userController.update)

userRouter.put('/:id/password', middleware.requireAuthentication, userController.updatePassword)

userRouter.post('/password/reset', userController.resetPassword)

userRouter.post('/:id/verify', middleware.requireAuthentication, userController.sendEmailVerification)

userRouter.post('/:id/verify/:token', userController.verifyEmail)

userRouter.delete('/:id', middleware.requireAuthentication, userController.delete)

module.exports = userRouter