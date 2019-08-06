const eventRouter = require('express').Router()
const middleware = require('../utils/middleware')
const eventController = require('../controllers/eventController')

eventRouter.get('/', eventController.getAll)

eventRouter.get('/:id', middleware.requireAuthentication, eventController.getOne)

eventRouter.post('/', middleware.requireAuthentication, eventController.create)

eventRouter.put('/:id', middleware.requireAuthentication, eventController.update)

eventRouter.delete('/:id', middleware.requireAuthentication, eventController.delete)

eventRouter.post('/:id/addguest/:userId', middleware.requireAuthentication, eventController.addGuest)

eventRouter.post('/:id/removeguest/:userId', middleware.requireAuthentication, eventController.removeGuest)

eventRouter.post('/:id/validatekey/:inviteKey', eventController.validateInviteKey)

eventRouter.post('/:id/join/:inviteKey', middleware.requireAuthentication, eventController.joinEvent)

eventRouter.put('/:id/invitekey', middleware.requireAuthentication, eventController.changeInviteKey)

eventRouter.post('/:id/setstatus/:userId', middleware.requireAuthentication, eventController.setStatus)

module.exports = eventRouter