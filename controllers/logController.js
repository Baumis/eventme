const logService = require('../services/logService')

exports.getAll = async (request, response) => {
    try {
        const log = await logService.getAll(request.senderId)
        response.json(log.entries)
    } catch (exception) {
        response.status(400).json({ error: 'Could not fetch logs' })
    }
}

exports.removeAll = async (request, response) => {
    try {
        const updatedLog = await logService.removeAll(request.senderId)
        response.json(updatedLog.entries)
    } catch (exception) {
        response.status(400).json({ error: 'Could not remove logs' })
    }
}

exports.removeOne = async (request, response) => {
    try {
        const updatedLog = await logService.removeOne(request.senderId, request.params.id)
        response.json(updatedLog.entries)
    } catch (exception) {
        response.status(400).json({ error: 'Could not remove log' })
    }
}