import React from 'react'
import './InviteLinkOptions.css'
import DefaultButtons from '../../../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

const InviteLinkOptions = (props) => {

    return (
        <div className="invitelink-options">
            <div className="invitelink-options-header">InviteLink component</div>
            <div className="invitelink-options-container">
                This component provides a link that serves as an invitation to this event.
            </div>
            <DefaultButtons
                    negativeLabel={props.negativeLabel}
                    negativeAction={props.negativeAction}
            />
        </div>
    )
}

export default InviteLinkOptions