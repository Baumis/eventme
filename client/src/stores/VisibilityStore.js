import UserStore from './UserStore'
import EventStore from './EventStore'
import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    signModal = false
    optionsPanelPosition = '-300px'
    componentEditor = false
    currentComponent = null
    creator = false

    showSignModal() {
        this.signModal = true
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
    isCreator = () => {
        if (UserStore.currentUser && EventStore.event.creator) {
            if (UserStore.currentUser._id === EventStore.event.creator._id) {
                this.creator = true
            } else {
                this.creator = false
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
    isCreator: action,
})

export default new VisibilityStore()