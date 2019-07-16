import UserStore from './UserStore'
import EventStore from './EventStore'
import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    signModal = false
    skipOptions = true
    optionsPanelPosition = '-300px'
    componentEditor = false
    currentComponent = null
    creator = false

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
        if (UserStore.currentUser && EventStore.event.creator) {
            if (UserStore.currentUser._id === EventStore.event.creator._id) {
                this.creator = true
            } else {
                this.creator = false
            }
        } else {
            if (UserStore.currentUser && !EventStore.event.creator) {
                this.creator = true
            }
        }
    }
}

decorate(VisibilityStore, {
    signModal: observable,
    optionsPanelPosition: observable,
    componentEditor: observable,
    creator: observable,

    showSignModal: action,
    closeSignModal: action,
    showComponentEditor: action,
    closeComponentEditor: action,
    slideOptionsPanel: action,
    checkForRole: action,
})

export default new VisibilityStore()