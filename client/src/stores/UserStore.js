import { observable, decorate, action } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'

class UserStore {
    currentUser = null

    setCurrentUser(user) {
        this.currentUser = user
        eventService.setToken(user.token)
        userService.setToken(user.token)
    }

    async refreshUser() {
        this.currentUser = await userService.getOne(this.currentUser._id)
    }

    signOut() {
        this.currentUser = null
        window.localStorage.removeItem('loggedEventAppUser')
    }


    async signUp(newUser) {
        return await userService.create(newUser)
    }
}

decorate(UserStore, {
    currentUser: observable,

    signUp: action,
    setCurrentUser: action,
    signOut: action
})

export default new UserStore()