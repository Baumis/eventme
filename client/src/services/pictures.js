import http from './http'
const baseUrl = '/api/pictures'
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

// Returns picture object with e.g. secure_url property for fetching
const uploadEventBackground = async (eventId, file) => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await http.post(`${baseUrl}/events/${eventId}/background`, formData, config)
    return response.data
}

const uploadUserAvatar = async (userId, file) => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await http.post(`${baseUrl}/users/${userId}/avatar`, formData, config)
    return response.data
}

const uploadUserCover = async (userId, file) => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await http.post(`${baseUrl}/users/${userId}/cover`, formData, config)
    return response.data
}

export default {
    uploadEventBackground,
    uploadUserAvatar,
    uploadUserCover
}