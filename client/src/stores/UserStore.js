import { observable, decorate, action } from 'mobx'
import userService from '../services/users'
import loginService from '../services/login'

class UserStore {
    currentUser = null

    async signIn(username, password) {
        this.currentUser = await loginService.login({ username, password })
    }

    async googleSignIn(googleToken) {
        this.currentUser = await loginService.googleLogin(googleToken)
    }

    async refreshUser() {
        try {
            this.currentUser = await loginService.refresh()
            return this.currentUser
        } catch (error) {
            return null
        }
    }

    async signOut() {
        await loginService.logout()
        this.currentUser = null
    }


    async signUp(newUser) {
        this.currentUser = await userService.create(newUser)
    }

    async saveUser(user) {
        try {
            this.currentUser = await userService.update(user)
            return this.currentUser
        } catch (error) {
            return null
        }
    }

    async updatePassword(oldPassword, newPassword) {
        try {
            return await userService.updatePassword(this.currentUser._id, oldPassword, newPassword)
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