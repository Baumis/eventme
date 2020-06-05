const searchService = require('../services/searchService')

exports.getAll = async (request, response) => {
    try {
        const responseObject = await searchService.getAll(request.query.keyword, request.query.limit)
        response.json(responseObject)
    } catch (exception) {
        response.status(400).json({ error: exception.message })
    }
}
