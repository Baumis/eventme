import axios from 'axios'

const http = axios.create()

http.interceptors.request.use(config => {
    const loggedUserJSON = window.localStorage.getItem('loggedEventAppUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        config.headers.Authorization = `bearer ${user.token}`
    }

    return config
})

export default http