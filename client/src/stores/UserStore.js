import { observable, decorate, action } from 'mobx'
import eventService from '../services/events'
import userService from '../services/users'

class UserStore {
    //currentUser = null
    //myEvents = null
    //myInvites = null

    currentUser = { name: 'Teuvo Hakkarainen', username: 'Teuppa78', email: 'teuppa@gmail.com' }
    myEvents = [{ title: 'Kesäjuhla', background: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Coppery-tailed_coucal_%28Centropus_cupreicaudus%29.jpg/1024px-Coppery-tailed_coucal_%28Centropus_cupreicaudus%29.jpg' }, { title: 'Rapujuhla', background: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/EarthRender_%28square%29.png' }, { title: 'Juhannus', background: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rubjerg_Knude_Fyr%2C_Hj%C3%B8rring%2C_Denmark%2C_1807072231%2C_ako.jpg/500px-Rubjerg_Knude_Fyr%2C_Hj%C3%B8rring%2C_Denmark%2C_1807072231%2C_ako.jpg' }]
    myInvites = [{ title: 'Regattan', background: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Zorzal_litsitsirupa_%28Turdus_litsitsirupa%29%2C_Santuario_de_Rinocerontes_Khama%2C_Botsuana%2C_2018-08-02%2C_DD_13.jpg/1024px-Zorzal_litsitsirupa_%28Turdus_litsitsirupa%29%2C_Santuario_de_Rinocerontes_Khama%2C_Botsuana%2C_2018-08-02%2C_DD_13.jpg' }, { title: 'Torille', background: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Speyer%2C_Retscher%2C_Gartenlaube%2C_2.png/1024px-Speyer%2C_Retscher%2C_Gartenlaube%2C_2.png' }]

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