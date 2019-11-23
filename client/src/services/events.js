import http from './http'
const baseUrl = '/api/events'

const getOne = async (id) => {
    const response = await http.get(`${baseUrl}/${id}`)
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

const addGuest = async (id, userId) => {
    const response = await http.post(`${baseUrl}/${id}/guests`, { userId })
    return response.data
}

const removeGuest = async (id, userId) => {
    const response = await http.delete(`${baseUrl}/${id}/guests/${userId}`)
    return response.data
}

const joinEvent = async (id, inviteKey) => {
    const response = await http.post(`${baseUrl}/${id}/guests/invitekey`, { inviteKey })
    return response.data
}

const getOneWithKey = async (id, inviteKey) => {
    const response = await http.get(`${baseUrl}/${id}/invitekey/${inviteKey}`)
    return response.data
}

const updateKey = async (id) => {
    const response = await http.put(`${baseUrl}/${id}/invitekey`)
    return response.data
}

const changeStatus = async (id, userId, newStatus) => {
    const response = await http.put(`${baseUrl}/${id}/guests/${userId}`, { newStatus })
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

const addAnswersToFormComponent = async (id, componentId, answers) => {
    const response = await http.post(`${baseUrl}/${id}/components/${componentId}/data/questions`, { answers })
    return response.data
}

export default {
    getOne,
    create,
    remove,
    update,
    addGuest,
    removeGuest,
    joinEvent,
    changeStatus,
    getOneWithKey,
    updateKey,
    addMessage,
    addComment,
    removeMessage,
    removeComment,
    addAnswersToFormComponent
}