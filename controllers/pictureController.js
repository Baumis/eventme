const pictureService = require('../services/pictureService')

exports.uploadEventBackground = async (request, response) => {
    try {
        const event = request.event
        let publicId = 'events/' + event._id
        const cloudinaryBaseUrl = 'https://res.cloudinary.com/inviteowl/image/upload/'
        const currentBackground = event.background || ''

        if (currentBackground.startsWith(cloudinaryBaseUrl) && currentBackground.includes(publicId + '/picture1')) {
            publicId = publicId + '/picture2'
        } else {
            publicId = publicId + '/picture1'
        }

        const picture = await pictureService.upload(publicId, request.file.buffer)
        response.json(picture)
    } catch (exception) {
        response.status(400).json({ error: 'Could not upload picture' })
    }
}

exports.uploadUserAvatar = async (request, response) => {
    try {
        if (request.senderId !== request.params.id) {
            return response.status(403).json({ error: 'Only user itself can update' })
        }

        const user = request.user
        let publicId = 'users/' + user._id + '/avatar'
        const cloudinaryBaseUrl = 'https://res.cloudinary.com/inviteowl/image/upload/'
        const currentAvatar = user.avatar

        if (currentAvatar.startsWith(cloudinaryBaseUrl) && currentAvatar.includes(publicId + '/picture1')) {
            publicId = publicId + '/picture2'
        } else {
            publicId = publicId + '/picture1'
        }

        const picture = await pictureService.upload(publicId, request.file.buffer)
        response.json(picture)
    } catch (exception) {
        response.status(400).json({ error: 'Could not upload picture' })
    }
}

exports.uploadUserCover = async (request, response) => {
    try {
        if (request.senderId !== request.params.id) {
            return response.status(403).json({ error: 'Only user itself can update' })
        }
        
        const user = request.user
        let publicId = 'users/' + user._id + '/cover'
        const cloudinaryBaseUrl = 'https://res.cloudinary.com/inviteowl/image/upload/'
        const currentCover = user.cover

        if (currentCover.startsWith(cloudinaryBaseUrl) && currentCover.includes(publicId + '/picture1')) {
            publicId = publicId + '/picture2'
        } else {
            publicId = publicId + '/picture1'
        }

        const picture = await pictureService.upload(publicId, request.file.buffer)
        response.json(picture)
    } catch (exception) {
        response.status(400).json({ error: 'Could not upload picture' })
    }
}