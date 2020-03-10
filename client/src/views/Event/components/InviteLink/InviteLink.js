import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './InviteLink.css'
import { FaCopy } from 'react-icons/fa'
import DefaultButtons from '../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

class InviteLinkBlock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    copyLink = () => {
        const urlInput = document.getElementById('optionsPanelInviteUrl')
        urlInput.select()
        urlInput.setSelectionRange(0, 9999)
        document.execCommand('copy')
    }

    confirmUrlChange = (guest) => {
        this.props.VisibilityStore.showAlert(
            'Confirm',
            `Changeing the url will make the old url invalid.`,
            'Change',
            () => this.changeUrlmodifier(),
            'Cancel',
            () => this.props.VisibilityStore.closeAlert()
        )
    }

    changeUrlmodifier = async () => {
        this.props.VisibilityStore.closeAlert()
        if (!this.props.EventStore.saved) {
            this.props.VisibilityStore.showAlert(
                'Unsaved changes',
                'Please save your event before changing the url.',
                'OK',
                () => this.props.VisibilityStore.closeAlert(),
            )
            return
        }
        this.setState({ loading: true })
        const event = await this.props.EventStore.changeUrlmodifier()
        this.props.history.push('/events/' + event.url)
        this.props.VisibilityStore.showAlert(
            'Success',
            'The event url has been changed.',
            'OK',
            () => this.props.VisibilityStore.closeAlert(),
        )
        this.setState({ loading: false })
    }

    render() {
        return (
            <div className="invite-link">
                <div className="invite-link-info">
                    Invite guests by shareing this link to the event.
                </div>
                <div className="invite-link-row">
                    <input
                        id="optionsPanelInviteUrl"
                        value={window.location.origin + '/events/' + this.props.EventStore.event.url}
                        type="text"
                        readOnly
                    />
                    <div className="invite-link-copy-button" onClick={() => this.copyLink()}>
                        <FaCopy />
                    </div>
                </div>
                <div className="invite-link-button-row">
                    <DefaultButtons
                        showSpinner={this.state.loading}
                        positiveLabel={'change'}
                        positiveAction={this.confirmUrlChange}
                        negativeLabel={'close'}
                        negativeAction={this.props.toggleInviteLink}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'VisibilityStore')(observer(InviteLinkBlock)))