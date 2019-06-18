import axios from 'axios'
const baseUrl = '/api/events'

let token = null

const config = () => {
    return {
        headers: { 'Authorization': token }
    }
}

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, config())
    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, config())
    return response.data
}

const update = async (updatedObject) => {
    const response = await axios.put(`${baseUrl}/${updatedObject._id}`, updatedObject, config())
    return response.data
}

const addGuest = async (id, userId) => {
    const response = await axios.post(`${baseUrl}/${id}/guest`, { userId }, config())
    return response.data
}

export default { getOne, getAll, create, remove, update, addGuest, setToken }