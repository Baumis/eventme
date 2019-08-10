const eventRouter = require('express').Router()
const middleware = require('../utils/middleware')
const eventController = require('../controllers/eventController')

eventRouter.get('/', eventController.getAll)

eventRouter.get('/:id', middleware.requireAuthentication, eventController.getOne)

eventRouter.post('/', middleware.requireAuthentication, eventController.create)

eventRouter.put('/:id', middleware.requireAuthentication, eventController.update)

eventRouter.delete('/:id', middleware.requireAuthentication, eventController.delete)

eventRouter.post('/:id/guests', middleware.requireAuthentication, eventController.addGuest)

eventRouter.put('/:id/guests/:userId', middleware.requireAuthentication, eventController.setStatus)

eventRouter.delete('/:id/guests/:userId', middleware.requireAuthentication, eventController.removeGuest)

eventRouter.get('/:id/invitekey/:inviteKey', eventController.getOneWithInviteKey)

eventRouter.post('/:id/guests/invitekey', middleware.requireAuthentication, eventController.addGuestWithInviteKey)

eventRouter.put('/:id/invitekey', middleware.requireAuthentication, eventController.changeInviteKey)

module.exports = eventRouter