import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    loginModal = false
    optionsPanelPosition = '0px'

    showLoginModal() {
        this.loginModal = true
    }
    closeLoginModal() {
        this.loginModal = false
    }
    slideOptionsPanel() {
        this.optionsPanelPosition === '0px' ?
            this.optionsPanelPosition = '-300px'
            :
            this.optionsPanelPosition = '0px'
    }
}

decorate(VisibilityStore, {
    loginModal: observable,
    optionsPanelPosition: observable,

    showLoginModal: action,
    closeLoginModal: action,
    slideOptionsPanel: action
})

export default new VisibilityStore()