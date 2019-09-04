import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InviteLink.css'

class InviteLink extends Component {

    copyLink = () => {
        const urlInput = document.getElementById('inviteUrlField')
        urlInput.select()
        urlInput.setSelectionRange(0,9999)
        document.execCommand('copy')
    }

    render() {
        return (
            <div className="invite-component">
                <div className="invite-component-title">
                    <h2>Public invite url</h2>
                    <p>Share this link to invite friends</p>
                </div>
                <div className="invite-component-copy" onClick={() => this.copyLink()}>
                    copy url
                </div>
                <div className="invite-component-url-field">
                    <input
                        id="inviteUrlField"
                        value={`${window.location.origin}/events/${this.props.EventStore.event._id}/invite/${this.props.data.inviteKey}`}
                        type="text"
                        readOnly
                    ></input>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(InviteLink))