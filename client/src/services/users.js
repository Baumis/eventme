import http from './http'
const baseUrl = '/api/users'

const getOne = async (id) => {
    const response = await http.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async (newObject) => {
    try {
        const response = await http.post(baseUrl, newObject)
        return response.data
    } catch (error) {
        return error.response
    }
}

const remove = async (id) => {
    const response = await http.delete(`${baseUrl}/${id}`)
    return response.data
}

const update = async (updatedObject) => {
    const response = await http.put(`${baseUrl}/${updatedObject._id}`, updatedObject)
    return response.data
}

export default { getOne, create, remove, update }