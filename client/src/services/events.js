import http from './http'
const baseUrl = '/api/events'

const getOne = async (url) => {
    const response = await http.get(`${baseUrl}/${url}`)
    return response.data
}

const create = async (newObject) => {
    const response = await http.post(baseUrl, newObject)
    return response.data
}

const remove = async (id) => {
    const response = await http.delete(`${baseUrl}/${id}`)
    return response.data
}

const update = async (updatedObject) => {
    const response = await http.put(`${baseUrl}/${updatedObject._id}`, updatedObject)
    return response.data
}

const addMessage = async (id, message) => {
    const response = await http.post(`${baseUrl}/${id}/discussion`, { message })
    return response.data
}

const addComment = async (id, messageId, comment) => {
    const response = await http.post(`${baseUrl}/${id}/discussion/${messageId}/comments`, { comment })
    return response.data
}

const removeMessage = async (id, messageId) => {
    const response = await http.delete(`${baseUrl}/${id}/discussion/${messageId}`)
    return response.data
}

const removeComment = async (id, messageId, commentId) => {
    const response = await http.delete(`${baseUrl}/${id}/discussion/${messageId}/comments/${commentId}`)
    return response.data
}

const addRegistration = async (id, name = undefined, answers) => {
    const response = await http.post(`${baseUrl}/${id}/registrations`, { name, answers })
    return response.data
}

const removeRegistration = async (id, registrationId) => {
    const response = await http.delete(`${baseUrl}/${id}/registrations/${registrationId}`)
    return response.data
}

const changeUrlmodifier = async (id) => {
    const response = await http.put(`${baseUrl}/${id}/urlmodifier`)
    return response.data
}

const updateAnswer = async (id, registrationId, questionId, content) => {
    const response = await http.put(`${baseUrl}/${id}/registrations/${registrationId}/answers/${questionId}`, { content })
    return response.data
}

export default {
    getOne,
    create,
    remove,
    update,
    addMessage,
    addComment,
    removeMessage,
    removeComment,
    addRegistration,
    removeRegistration,
    changeUrlmodifier,
    updateAnswer
}