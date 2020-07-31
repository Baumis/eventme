import http from './http'
const baseUrl = '/api/search'

const getAll = async (keyword, limit = 10) => {
    const response = await http.get(`${baseUrl}?keyword=${keyword}&limit=${limit}`)
    return response.data
}

const findEvents = async (label, startDate, endDate, page = 0, limit = 10) => {
    const response = await http.get(`${baseUrl}/events?label=${label}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`)
    return response.data
}

const findUpcomingEvents = async (page = 0, limit = 10) => {
    const response = await http.get(`${baseUrl}/events/upcoming?page=${page}&limit=${limit}`)
    return response.data
}

const findUsers = async (name, page = 0, limit = 10) => {
    const response = await http.get(`${baseUrl}/users?name=${name}&page=${page}&limit=${limit}`)
    return response.data
}

export default {
    getAll,
    findEvents,
    findUpcomingEvents,
    findUsers
}