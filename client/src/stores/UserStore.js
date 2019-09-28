import { observable, decorate, action } from 'mobx'
import userService from '../services/users'
import loginService from '../services/login'

class UserStore {
    currentUser = null

    async signIn(username, password) {
        const user = await loginService.login({ username, password })
        this.currentUser = user
        window.localStorage.setItem('loggedEventAppUser', JSON.stringify(user))
    }

    async googleSignIn(googleToken) {
        const user = await loginService.googleLogin(googleToken)
        this.currentUser = user
        window.localStorage.setItem('loggedEventAppUser', JSON.stringify(user))
    }

    async refreshUser(user) {
        try {
            this.currentUser = await userService.getOne(user._id)
        } catch (error) {
            window.localStorage.removeItem('loggedEventAppUser')
        }
    }

    async signOut() {
        await loginService.logout()
        this.currentUser = null
        window.localStorage.removeItem('loggedEventAppUser')
    }


    async signUp(newUser) {
        try {
            const user = await userService.create(newUser)
            this.currentUser = user
            return user
        } catch (error) {
            return null
        }
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