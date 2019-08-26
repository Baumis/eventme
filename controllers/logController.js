const logService = require('../services/logService')

exports.getAll = async (request, response) => {
    try {
        return await logService.getAll(request.senderId)
    } catch (exception) {
        response.status(400).json({ error: 'Could not fetch logs' })
    }
}

exports.removeAll = async (request, response) => {
    try {
        return await logService.removeAll(request.senderId)
    } catch (exception) {
        response.status(400).json({ error: 'Could not remove logs' })
    }
}

exports.removeOne = async (request, response) => {
    try {
        return await logService.removeOne(request.senderId, request.params.id)
    } catch (exception) {
        response.status(400).json({ error: 'Could not remove log' })
    }
}