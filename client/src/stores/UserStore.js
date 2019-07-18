import { observable, decorate, action } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'
import loginService from '../services/login'

class UserStore {
    currentUser = null

    async signIn(username, password) {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedEventAppUser', JSON.stringify(user))
        window.location.reload()
    }

    async refreshUser(user) {
        this.currentUser = await userService.getOne(user._id)
        eventService.setToken(user.token)
        userService.setToken(user.token)
    }

    signOut() {
        this.currentUser = null
        window.localStorage.removeItem('loggedEventAppUser')
        window.location.reload()
    }


    async signUp(newUser) {
        await userService.create(newUser)
    }
}

decorate(UserStore, {
    currentUser: observable,

    signUp: action,
    setCurrentUser: action,
    signOut: action
})

export default new UserStore()