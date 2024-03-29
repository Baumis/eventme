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

eventRouter.post('/:id/discussion', middleware.requireAuthentication, eventController.addMessage)

eventRouter.post('/:id/discussion/:messageId/comments', middleware.requireAuthentication, eventController.addComment)

eventRouter.delete('/:id/discussion/:messageId', middleware.requireAuthentication, eventController.removeMessage)

eventRouter.delete('/:id/discussion/:messageId/comments/:commentId', middleware.requireAuthentication, eventController.removeComment)

eventRouter.post('/:id/registrations', eventController.addRegistration)

eventRouter.delete('/:id/registrations/:registrationId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.removeRegistration)

eventRouter.put('/:id/urlmodifier', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR), eventController.changeUrlmodifier)

eventRouter.put('/:id/registrations/:registrationId/answers/:questionId', middleware.requireAuthentication, middleware.requireRole(roles.CREATOR, roles.GUEST), eventController.updateAnswer)

module.exports = eventRouter