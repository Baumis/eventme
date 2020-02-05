import { observable, decorate, action } from 'mobx'
import userService from '../services/users'
import loginService from '../services/login'
import pictureService from '../services/pictures'

class UserStore {
    currentUser = null

    async signIn(username, password) {
        this.currentUser = await loginService.login({ username, password })
    }

    async googleSignIn(googleToken) {
        this.currentUser = await loginService.googleLogin(googleToken)
    }

    async facebookSignIn(userId, facebookToken) {
        this.currentUser = await loginService.facebookLogin(userId, facebookToken)
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
        await userService.updatePassword(this.currentUser._id, oldPassword, newPassword)
    }

    async uploadUserAvatar(file) {
        try {
            const picture = await pictureService.uploadUserAvatar(this.currentUser._id, file)
            return picture.secure_url
        } catch {
            return null
        }
    }
    async uploadUserCover(file) {
        try {
            const picture = await pictureService.uploadUserCover(this.currentUser._id, file)
            return picture.secure_url
        } catch {
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