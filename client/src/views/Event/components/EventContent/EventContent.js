import React from 'react'
import './EventContent.css'
import ComponentContainer from '../ComponentContainer/ComponentContainer'
import DiscussionContainer from '../DiscussionContainer/DiscussionContainer'
import GuestContainer from '../GuestContainer/GuestContainer'
import JoinEventButton from '../JoinEventButton/JoinEventButton'
import EventControlPanel from '../EventControlPanel/EventControlPanel'

const EventContent = (props) => {
    return (
        <div className="event-content">
            <div className="event-content-status-row">
                {!props.isGuest() ?
                    <JoinEventButton
                        inviteKey={props.inviteKey}
                    /> : null}
            </div>
            <EventControlPanel
                activeTab={props.activeTab}
                changeActive={props.changeActive}
            />
            {props.activeTab === "Discussion" ?
                <DiscussionContainer
                    isCreator={props.isCreator}
                />
                :
                <GuestContainer
                    isCreator={props.isCreator}
                />
            }
        </div>
    )
}
export default EventContent
