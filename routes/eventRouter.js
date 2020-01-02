const eventRouter = require('express').Router()
const middleware = require('../utils/middleware')
const eventController = require('../controllers/eventController')
const roles = require('../utils/roles')

// Router specific middlewares

eventRouter.use('/:id', middleware.extractEvent, middleware.extractRole)

// Routes

eventRouter.get('/:id', eventController.getOne)

eventRouter.post('/', middleware.requireAuthentication, eventController.create)

eventRouter.put('/:id', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.update)

eventRouter.delete('/:id', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.delete)

eventRouter.post('/:id/guests', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.addGuest)

eventRouter.put('/:id/guests/:userId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.setStatus)

eventRouter.delete('/:id/guests/:userId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.removeGuest)

eventRouter.get('/:id/invitekey/:inviteKey', eventController.getOneWithInviteKey)

eventRouter.put('/:id/guests', middleware.requireAuthentication, eventController.joinEvent)

eventRouter.put('/:id/invitekey', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.changeInviteKey)

eventRouter.post('/:id/discussion', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.addMessage)

eventRouter.post('/:id/discussion/:messageId/comments', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.addComment)

eventRouter.delete('/:id/discussion/:messageId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.removeMessage)

eventRouter.delete('/:id/discussion/:messageId/comments/:commentId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.removeComment)

eventRouter.post('/:id/components/:componentId/data/options/:optionId/votes', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.addVoteToVoteComponent)

eventRouter.delete('/:id/components/:componentId/data/options/:optionId/votes/vote', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.removeVoteFromVoteComponent)

eventRouter.post('/:id/components/:componentId/data/questions', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.addAnswersToFormComponent)

eventRouter.post('/:id/registrations', eventController.addRegistration)

module.exports = eventRouter