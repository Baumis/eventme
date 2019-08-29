const logRouter = require('express').Router()
const middleware = require('../utils/middleware')
const logController = require('../controllers/logController')

logRouter.get('/', middleware.requireAuthentication, logController.getAll)

logRouter.delete('/', middleware.requireAuthentication, logController.removeAll)

logRouter.delete('/:id', middleware.requireAuthentication, logController.removeOne)

module.exports = logRouter