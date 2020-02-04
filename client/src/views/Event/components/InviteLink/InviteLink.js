import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InviteLink.css'
import { FaCopy } from 'react-icons/fa'
import DefaultButtons from '../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

class InviteLinkBlock extends Component {

    copyLink = () => {
        const urlInput = document.getElementById('optionsPanelInviteUrl')
        urlInput.select()
        urlInput.setSelectionRange(0, 9999)
        document.execCommand('copy')
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
                        value={`${window.location.origin}/events/${this.props.EventStore.event._id}`}
                        type="text"
                        readOnly
                    />
                    <div className="invite-link-copy-button" onClick={() => this.copyLink()}>
                        <FaCopy />
                    </div>
                </div>
                <div className="invite-link-button-row">
                    <DefaultButtons
                        negativeLabel={'close'}
                        negativeAction={this.props.toggleInviteLink}
                    />
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(InviteLinkBlock))