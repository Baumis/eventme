import { observable, decorate, action } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'

class UserStore {
    //currentUser = null
    currentUser = { name: 'Teuvo Hakkarainen', username: 'Teuppa78', email: 'teuppa@gmail.com' }

    setCurrentUser(user) {
        this.currentUser = user
        eventService.setToken(user.token)
        userService.setToken(user.token)
    }
}

decorate(UserStore, {
    currentUser: observable,

    setCurrentUser: action
})

export default new UserStore()