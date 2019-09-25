import React from 'react'
import './ProfileContent.css'
import EventsContainer from '../EventsContainer/EventsContainer'
import SettingsContainer from '../SettingsContainer/SettingsConainer'

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
                    <SettingsContainer
                        activeTab={props.activeTab}
                        user={props.user}
                    />
                    :
                    null
            }
        </div>
    )
}
export default EventContent