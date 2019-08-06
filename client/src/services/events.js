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
    console.log(response.data)
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
    getOneWithKey,
    updateKey
}