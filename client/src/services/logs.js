import http from './http'
const baseUrl = '/api/log'

const getAll = async () => {
    const response = await http.get(baseUrl)
    return response.data
}

const removeAll = async () => {
    const response = await http.delete(baseUrl)
    return response.data
}

const removeOne = async (id) => {
    const response = await http.delete(`${baseUrl}/${id}`)
    return response.data
}

export default { getAll, removeAll, removeOne }