import { observable, decorate, action } from 'mobx'
import userService from '../services/users'
import loginService from '../services/login'

class UserStore {
    currentUser = null

    async signIn(email, password) {
        const user = await loginService.login({ email, password })
        console.log(user)
        this.currentUser = user
        window.localStorage.setItem('loggedEventAppUser', JSON.stringify(user))
    }

    async googleSignIn(googleToken) {
        const user = await loginService.googleLogin(googleToken)
        console.log(user)
        this.currentUser = user
        window.localStorage.setItem('loggedEventAppUser', JSON.stringify(user))
    }

    async refreshUser(user) {
        try {
            this.currentUser = await userService.getOne(user._id)
        } catch (error) {
            this.signOut()
        }
    }

    signOut() {
        this.currentUser = null
        window.localStorage.removeItem('loggedEventAppUser')
    }


    async signUp(newUser) {
        await userService.create(newUser)
    }

    async saveUser(user) {
        try {
            const savedUser = await userService.update(user)
            this.currentUser = savedUser
            return savedUser
        } catch (error) {
            return null
        }
    }
}

decorate(UserStore, {
    currentUser: observable,

    signUp: action,
    setCurrentUser: action,
    signOut: action
})

export default new UserStore()