import http from './http'
const baseUrl = '/api/users'

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

const updatePassword = async (id, oldPassword, newPassword) => {
    const response = await http.put(`${baseUrl}/${id}/password`, { oldPassword, newPassword })
    return response.data
}

const resetPassword = async (username, email) => {
    const response = await http.post(`${baseUrl}/password/reset`, { username, email })
    return response.data
}

const verifyEmail = async (id, verificationToken) => {
    const response = await http.post(`${baseUrl}/${id}/verify/${verificationToken}`)
    return response.data
}

const sendVerificationToEmail = async (id) => {
    const response = await http.post(`${baseUrl}/${id}/verify`)
    return response.data
}

export default { getOne, create, remove, update, updatePassword, verifyEmail, sendVerificationToEmail, resetPassword }