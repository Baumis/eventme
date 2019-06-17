import { Component } from 'react'
import { observable, decorate, action } from 'mobx'

class UserStore extends Component {
    currentUser = null

    setCurrentUser(user) {
        this.currentUser = user
    }
}

decorate(UserStore, {
    currentUser: observable,
    setCurrentUser: action
})

export default new UserStore()