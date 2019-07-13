import UserStore from './UserStore'
import EventStore from './EventStore'
import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    loading = true
    signModal = false
    skipOptions = true
    optionsPanelPosition = '-300px'
    componentEditor = false
    currentComponent = null
    creator = false

    loadingOn() {
        this.loading = true
    }

    loadingOff() {
        this.loading = false
    }

    showSignModal(skipOptions) {
        this.signModal = true
        skipOptions ?
            this.skipOptions = true
            : this.skipOptions = false
    }
    closeSignModal() {
        this.signModal = false
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
    checkForRole = () => {
        if (UserStore.currentUser) {
            if (UserStore.currentUser._id === EventStore.event.creator._id) {
                this.creator = true
            } else {
                this.creator = false
            }
        }
    }
}

decorate(VisibilityStore, {
    loading: observable,
    signModal: observable,
    optionsPanelPosition: observable,
    componentEditor: observable,
    creator: observable,

    loadingOn: action,
    loadingOff: action,
    showSignModal: action,
    closeSignModal: action,
    showComponentEditor: action,
    closeComponentEditor: action,
    slideOptionsPanel: action,
    checkForRole: action,
})

export default new VisibilityStore()