const eventRouter = require('express').Router()
const middleware = require('../utils/middleware')
const eventController = require('../controllers/eventController')
const roles = require('../utils/roles')

// Router specific middlewares

eventRouter.use('/:id', middleware.extractEvent, middleware.extractRole)

// Routes

eventRouter.get('/', eventController.getAll)

eventRouter.get('/:id', middleware.requireAuthentication, eventController.getOne)

eventRouter.post('/', middleware.requireAuthentication, eventController.create)

eventRouter.put('/:id', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.update)

eventRouter.delete('/:id', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.delete)

eventRouter.post('/:id/guests', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.addGuest)

eventRouter.put('/:id/guests/:userId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.setStatus)

eventRouter.delete('/:id/guests/:userId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.removeGuest)

eventRouter.get('/:id/invitekey/:inviteKey', eventController.getOneWithInviteKey)

eventRouter.post('/:id/guests/invitekey', middleware.requireAuthentication, eventController.addGuestWithInviteKey)

eventRouter.put('/:id/invitekey', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.changeInviteKey)

module.exports = eventRouter