import http from './http'
const baseUrl = '/api/search'

const getAll = async (keyword, limit) => {
    const response = await http.get(`${baseUrl}?keyword=${keyword}&limit=${limit}`)
    return response.data
}

export default {
    getAll
}