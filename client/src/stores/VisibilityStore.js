import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    loginModal = false
    optionsPanelPosition = '0px'
    componentEditor = false
    currentComponent = null

    showLoginModal() {
        this.loginModal = true
    }
    closeLoginModal() {
        this.loginModal = false
    }
    showComponentEditor(order) {
        this.currentComponent = order 
        this.componentEditor = true
    }
    closeComponentEditor() {
        this.componentEditor = false
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
    componentEditor: observable,

    showLoginModal: action,
    closeLoginModal: action,
    showComponentEditor: action,
    closeComponentEditor: action,
    slideOptionsPanel: action
})

export default new VisibilityStore()