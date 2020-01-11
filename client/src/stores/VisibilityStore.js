import { observable, decorate, action } from 'mobx'

class VisibilityStore {
    signModal = false
    onSignSuccess = null
    alert = false
    alertTitle = null
    alertMessage = null
    alertPositiveLabel = null
    alertNegativeLabel = null
    alertPositiveAction = null
    alertNegativeAction = null
    optionsPanelPosition = '-300px'


    showSignModal(onSuccess = null) {
        this.onSignSuccess = onSuccess
        this.signModal = true
    }

    closeSignModal() {
        this.signModal = false
    }

    showAlert(
        title = null,
        message = null,
        positiveLabel = null,
        positiveAction = null,
        negativeLabel = null,
        negativeAction = null
    ) {
        this.alertTitle = title
        this.alertMessage = message
        this.alertPositiveLabel = positiveLabel
        this.alertPositiveAction = positiveAction
        this.alertNegativeLabel = negativeLabel
        this.alertNegativeAction = negativeAction
        this.alert = true
    }

    closeAlert = () => {
        this.alert = false
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
    onSignSuccess: observable,
    alert: observable,
    alertMessage: observable,
    alertTitle: observable,
    alertNegativeAction: observable,
    alertNegativeLabel: observable,
    alertPositiveAction: observable,
    alertPositiveLabel: observable,

    showSignModal: action,
    closeSignModal: action,
    closeAlert: action,
    showAlert: action,
    slideOptionsPanel: action
})

export default new VisibilityStore()