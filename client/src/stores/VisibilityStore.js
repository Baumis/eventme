import { Component } from 'react'
import { observable, decorate, action } from 'mobx'

class VisibilityStore extends Component {
    loginModal = false

    showLoginModal() {
        this.loginModal = true
    }
    closeLoginModal() {
        this.loginModal = false
    }
}

decorate(VisibilityStore, {
    loginModal: observable,
    showLoginModal: action,
    closeLoginModal: action
})

export default new VisibilityStore()