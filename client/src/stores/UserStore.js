import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'

class UserStore {
    currentUser = null
    myEvents = []
    myInvites = []

    setCurrentUser(user) {
        this.currentUser = user
        eventService.setToken(user.token)
        userService.setToken(user.token)
    }

    async initializeMyEvents() {
        const events = await eventService.getAllByUser(this.currentUser._id)
        runInAction(() => {
            this.myEvents = events
        })
    }

    initializeMyInvites() {

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
    initializeMyEvents: action,
    initializeMyInvites: action,
    signOut: action
})

export default new UserStore()