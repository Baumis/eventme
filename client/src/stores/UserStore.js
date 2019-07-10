import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'

class UserStore {
    currentUser = null
    myEvents = null
    //myInvites = null
    myInvites = [{ label: 'Regattan', settings: { background: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Zorzal_litsitsirupa_%28Turdus_litsitsirupa%29%2C_Santuario_de_Rinocerontes_Khama%2C_Botsuana%2C_2018-08-02%2C_DD_13.jpg/1024px-Zorzal_litsitsirupa_%28Turdus_litsitsirupa%29%2C_Santuario_de_Rinocerontes_Khama%2C_Botsuana%2C_2018-08-02%2C_DD_13.jpg' } }, { label: 'Torille', settings: { background: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Speyer%2C_Retscher%2C_Gartenlaube%2C_2.png/1024px-Speyer%2C_Retscher%2C_Gartenlaube%2C_2.png' } }]

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
}

decorate(UserStore, {
    currentUser: observable,

    setCurrentUser: action,
    initializeMyEvents: action,
    initializeMyInvites: action,
    signOut: action
})

export default new UserStore()