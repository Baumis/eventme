import http from './http'
const baseUrl = '/api/events'

const getOne = async (id) => {
    const response = await http.get(`${baseUrl}/${id}`)
    return response.data
}

const getAll = async () => {
    const response = await http.get(baseUrl)
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
    const response = await http.post(`${baseUrl}/${id}/addguest/${userId}`)
    return response.data
}

const removeGuest = async (id, userId) => {
    const response = await http.post(`${baseUrl}/${id}/removeguest/${userId}`)
    return response.data
}

const joinEvent = async (id, inviteKey) => {
    const response = await http.post(`${baseUrl}/${id}/join/${inviteKey}`)
    return response.data
}

const validateKey = async (id, inviteKey) => {
    const response = await http.post(`${baseUrl}/${id}/validatekey/${inviteKey}`)
    return response.data
}

const changeStatus = async (id, userId, newStatus) => {
    const body = {
        status: newStatus
    }

    const response = await http.post(`${baseUrl}/${id}/setstatus/${userId}`, body)
    return response.data
}

export default {
    getOne,
    getAll,
    create,
    remove,
    update,
    addGuest,
    removeGuest,
    joinEvent,
    changeStatus,
    validateKey
}