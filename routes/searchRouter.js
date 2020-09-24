const searchRouter = require('express').Router()
const searchController = require('../controllers/searchController')

searchRouter.get('/', searchController.getAll)

searchRouter.get('/events', searchController.findEvents)

searchRouter.get('/events/upcoming', searchController.findUpcomingEvents)

searchRouter.get('/users', searchController.findUsers)

module.exports = searchRouter