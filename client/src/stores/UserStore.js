import { Component } from 'react'
import { observable, decorate } from 'mobx'

class UserStore extends Component {
    currentUser = null
}

decorate(UserStore, {
    currentUser: observable
})

export default UserStore