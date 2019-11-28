import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    signModal = false
    optionsPanelPosition = '-300px'
    onSignSuccess = null


    showSignModal(onSuccess = null) {
        this.onSignSuccess = onSuccess
        this.signModal = true
    }

    closeSignModal() {
        this.signModal = false
    }

    slideOptionsPanel() {
        this.optionsPanelPosition === '0px' ?
            this.optionsPanelPosition = '-300px'
            :
            this.optionsPanelPosition = '0px'
    }
}

decorate(VisibilityStore, {
    signModal: observable,
    optionsPanelPosition: observable,
    componentEditor: observable,
    onSignSuccess: observable,

    showSignModal: action,
    closeSignModal: action,
    slideOptionsPanel: action
})

export default new VisibilityStore()