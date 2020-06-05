const searchRouter = require('express').Router()
const searchController = require('../controllers/searchController')

searchRouter.get('/', searchController.getAll)

module.exports = searchRouter