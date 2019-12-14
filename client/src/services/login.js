import http from './http'
const baseUrl = '/api/login'

const login = async (credentials) => {
    const response = await http.post(baseUrl, credentials)
    return response.data
}

const refresh = async () => {
    const response = await http.post(`${baseUrl}/refresh`)
    return response.data
}

const googleLogin = async (googleToken) => {
    const response = await http.post(`${baseUrl}/google`, { googleToken })
    return response.data
}

const facebookLogin = async (userId, facebookToken) => {
    const response = await http.post(`${baseUrl}/facebook`, { userId, facebookToken })
    return response.data
}

const logout = async () => {
    const response = await http.post(`${baseUrl}/logout`)
    return response.data
}

export default { login, googleLogin, logout, refresh, facebookLogin }