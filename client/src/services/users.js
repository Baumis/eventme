import axios from 'axios'
const baseUrl = '/api/users'

axios.interceptors.request.use(config => {
    config.headers.Authorization = token
    return config
})

let token = null

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
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const update = async (updatedObject) => {
    const response = await axios.put(`${baseUrl}/${updatedObject._id}`, updatedObject)
    return response.data
}

export default { getOne, getAll, create, remove, update, setToken }