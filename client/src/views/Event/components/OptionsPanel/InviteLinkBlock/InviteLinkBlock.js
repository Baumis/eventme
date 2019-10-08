import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InviteLinkBlock.css'
import { FaCopy } from 'react-icons/fa'

class InviteLinkBlock extends Component {

    copyLink = () => {
        const urlInput = document.getElementById('optionsPanelInviteUrl')
        urlInput.select()
        urlInput.setSelectionRange(0, 9999)
        document.execCommand('copy')
    }

    render() {
        return (
            <div className="inputBlock">
                <div className="inputLabel">
                    <label>{'Invite link'}</label>
                </div>
                <div className="invite-link-block-row">
                    <input
                        id="optionsPanelInviteUrl"
                        value={`${window.location.origin}/events/${this.props.EventStore.event._id}/invite/${this.props.EventStore.event.inviteKey}`}
                        type="text"
                        readOnly
                    />
                    <div className="invite-link-block-copy-button" onClick={() => this.copyLink()}>
                        <FaCopy />
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(InviteLinkBlock))