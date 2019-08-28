const logService = require('../services/logService')

exports.getAll = async (request, response) => {
    try {
        const logEntries = await logService.getAll(request.senderId)
        response.json(logEntries)
    } catch (exception) {
        response.status(400).json({ error: 'Could not fetch logs' })
    }
}

exports.removeAll = async (request, response) => {
    try {
        const updatedLogEntries = await logService.removeAll(request.senderId)
        response.json(updatedLogEntries)
    } catch (exception) {
        response.status(400).json({ error: 'Could not remove logs' })
    }
}

exports.removeOne = async (request, response) => {
    try {
        const updatedLogEntries = await logService.removeOne(request.senderId, request.params.id)
        response.json(updatedLogEntries)
    } catch (exception) {
        response.status(400).json({ error: 'Could not remove log' })
    }
}