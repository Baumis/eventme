const htmlRouter = require('express').Router()
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../client/build/index.html')
const eventService = require('../services/eventService')
const userService = require('../services/userService')

htmlRouter.get('/', (request, response) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'InviteOwl Events - Create, host and attend events')
        data = data.replace(/\$OG_DESCRIPTION/g, 'Create an event in 5 seconds with InviteOwl using local, Google or Facebook account. Invite guests by sharing a link. Manage all events in one place.')
        data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/')
        data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

        response.send(data)
    })
})

htmlRouter.get('/search', (request, response) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Search')
        data = data.replace(/\$OG_DESCRIPTION/g, 'This is a search engine for events and profiles listed on InviteOwl.')
        data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/search')
        data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

        response.send(data)
    })
})

htmlRouter.get('/create', (request, response) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Create Event')
        data = data.replace(/\$OG_DESCRIPTION/g, 'Create your event and invite your friends using various accounts.')
        data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/create')
        data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

        response.send(data)
    })
})

htmlRouter.get('/privacy', (request, response) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Privacy Policy')
        data = data.replace(/\$OG_DESCRIPTION/g, 'This privacy policy explains how InviteOwl uses the personal data we collect from you when you use our website.')
        data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/privacy')
        data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

        response.send(data)
    })
})

htmlRouter.get('/events/:id', async (request, response, next) => {
    try {
        let event = await eventService.getOne(request.params.id.slice(0, -5))

        event = event.urlmodifier === request.params.id.slice(-5) ? event : null

        if (!event) {
            return next()
        }

        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err)
            }

            // replace the special strings with server generated strings
            data = data.replace(/\$OG_TITLE/g, event.label)
            data = data.replace(/\$OG_DESCRIPTION/g, event.description)
            data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/events/' + request.params.id)
            if (event.background) {
                data = data.replace(/\$OG_IMAGE/g, event.background)
            } else {
                data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')
            }

            response.send(data)
        })
    } catch {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err)
            }

            // replace the special strings with server generated strings
            data = data.replace(/\$OG_TITLE/g, 'Event not found')
            data = data.replace(/\$OG_DESCRIPTION/g, 'The event you are looking for is removed or you don\'t have permission to view it.')
            data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/')
            data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

            response.send(data)
        })
    }
})

htmlRouter.get('/profile/:id', async (request, response, next) => {
    try {
        const user = await userService.getOne(request.params.id)

        if (!user) {
            return next()
        }

        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err)
            }

            // replace the special strings with server generated strings
            data = data.replace(/\$OG_TITLE/g, user.name)
            data = data.replace(/\$OG_DESCRIPTION/g, user.description)
            data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/profile/' + request.params.id)
            data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

            response.send(data)
        })
    } catch {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err)
            }

            // replace the special strings with server generated strings
            data = data.replace(/\$OG_TITLE/g, 'Profile not found')
            data = data.replace(/\$OG_DESCRIPTION/g, 'The profile you are looking for is removed or you don\'t have permission to view it.')
            data = data.replace(/\$OG_URL/g, 'https://www.inviteowl.com/')
            data = data.replace(/\$OG_IMAGE/g, 'https://www.inviteowl.com/owl_382x200_green.png')

            response.send(data)
        })
    }
})

module.exports = htmlRouter