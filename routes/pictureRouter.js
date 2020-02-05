const pictureRouter = require('express').Router()
const middleware = require('../utils/middleware')
const roles = require('../utils/roles')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const pictureController = require('../controllers/pictureController')

// Middlewares

pictureRouter.use('/', middleware.requireAuthentication, upload.single('image'))

pictureRouter.use('/events/:id', middleware.extractEvent, middleware.extractRole, middleware.requireRole(roles.CREATOR))

pictureRouter.use('/users/:id', middleware.extractUser)

// Routes

pictureRouter.post('/events/:id/background', pictureController.uploadEventBackground)

pictureRouter.post('/users/:id/avatar', pictureController.uploadUserAvatar)

pictureRouter.post('/users/:id/cover', pictureController.uploadUserCover)

module.exports = pictureRouter