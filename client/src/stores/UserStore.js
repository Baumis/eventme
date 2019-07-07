import { observable, decorate, action } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'

class UserStore {
    //currentUser = null
    //myEvents = null
    //myInvites = null

    currentUser = { name: 'Teuvo Hakkarainen', username: 'Teuppa78', email: 'teuppa@gmail.com' }
    myEvents = [{ title: 'Kesäjuhla' }, { title: 'Rapujuhla' }, { title: 'Juhannus' }]
    myInvites = [{ title: 'Regattan' }, { title: 'Torille' }]

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