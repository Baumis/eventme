import React from 'react'
import './ProfileContent.css'
import MyEventsContainer from '../MyEventsContainer/MyEventsContainer'
import InvitesContainer from '../InvitesContainer/InvitesContainer'
import SettingsContainer from '../SettingsContainer/SettingsConainer'

const EventContent = (props) => {
    return (
        <div className="profile-content">
            {props.activeTab === "MyEvents" ?
                <MyEventsContainer
                    activeTab={props.activeTab}
                    user={props.user}
                    newEvent={props.newEvent}
                />
                : props.activeTab === "Invites" ?
                    <InvitesContainer
                        activeTab={props.activeTab}
                        user={props.user}
                        save={props.save}
                    />
                    : props.activeTab === "Settings" ?
                        <SettingsContainer
                            activeTab={props.activeTab}
                            user={props.user}
                            save={props.save}
                        />
                        :
                        null
            }
        </div>
    )
}
export default EventContent