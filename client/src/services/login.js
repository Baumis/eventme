import http from './http'
const baseUrl = '/api/login'

const login = async (credentials) => {
    const response = await http.post(baseUrl, credentials)
    return response.data
}

const googleLogin = async (googleToken) => {
    const response = await http.post(`${baseUrl}/google`, { googleToken })
    return response.data
}

export default { login, googleLogin }