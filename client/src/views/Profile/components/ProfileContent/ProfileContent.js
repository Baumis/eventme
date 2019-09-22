import React from 'react'
import './ProfileContent.css'
import EventsContainer from '../EventsContainer/EventsContainer'
import UserOptions from '../UserOptions/UserOptions'

const EventContent = (props) => {
    return (
        <div className="profile-content">
            {props.activeTab === "Events" ?
                <EventsContainer
                    activeTab={props.activeTab}
                    user={props.user}
                    newEvent={props.toggleNewEventModal}
                />
                : props.activeTab === "Settings" ?
                    <UserOptions
                        activeTab={props.activeTab}
                        user={props.user}
                        newEvent={props.toggleNewEventModal}
                    />
                    :
                    null
            }
        </div>
    )
}
export default EventContent