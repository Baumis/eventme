import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    loading = true
    loginModal = false
    optionsPanelPosition = '-300px'
    componentEditor = false
    currentComponent = null

    loadingOn() {
        this.loading = true
    }

    loadingOff() {
        this.loading = false
    }

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
    loading: observable,
    loginModal: observable,
    optionsPanelPosition: observable,
    componentEditor: observable,

    loadingOn: action,
    loadingOff: action,
    showLoginModal: action,
    closeLoginModal: action,
    showComponentEditor: action,
    closeComponentEditor: action,
    slideOptionsPanel: action
})

export default new VisibilityStore()