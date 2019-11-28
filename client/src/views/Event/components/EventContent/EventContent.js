import React from 'react'
import './EventContent.css'
import ComponentContainer from '../ComponentContainer/ComponentContainer'
import DiscussionContainer from '../DiscussionContainer/DiscussionContainer'
import GuestContainer from '../GuestContainer/GuestContainer'
import Tabs from '../Tabs/Tabs'
import StatusBar from '../StatusBar/StatusBar'
import JoinEventModal from '../JoinEventButton/JoinEventButton'

const EventContent = (props) => {
    return (
        <div className="event-content">
            <div className="event-content-status-row">
                {props.isGuest() ?
                    <StatusBar />
                    :
                    <JoinEventModal
                        inviteKey={props.inviteKey}
                        closeInviteModal={props.closeInviteModal}
                    />
                }
            </div>
            <Tabs
                active={props.activeTab}
                changeActive={props.changeActive}
            />
            {props.activeTab === "Event" ?
                <ComponentContainer
                    isCreator={props.isCreator}
                    isGuest={props.isGuest}
                    toggleNewComponentModal={props.toggleNewComponentModal}
                />
                : props.activeTab === "Discussion" ?
                    <DiscussionContainer
                        isCreator={props.isCreator}
                    />
                    : props.activeTab === "Guests" ?
                        <GuestContainer
                            isCreator={props.isCreator}
                        />
                        : null
            }
        </div>
    )
}
export default EventContent
