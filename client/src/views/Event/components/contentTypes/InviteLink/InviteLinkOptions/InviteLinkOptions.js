import React from 'react'
import './InviteLinkOptions.css'

const InviteLinkOptions = (props) => {

    return (
        <div className="invitelink-options">
            <div className="invitelink-options-header">InviteLink component</div>
            <div className="invitelink-options-container">
                This component provides a link that serves as an invitation to this event.
            </div>
            <div className="invitelink-options-button-row">
                <div className="invitelink-options-close-button" onClick={() => props.close()}>
                    Close
                </div>
            </div>
        </div>
    )
}

export default InviteLinkOptions