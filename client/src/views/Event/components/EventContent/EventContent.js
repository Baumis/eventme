import React from 'react'
import './EventContent.css'
import GeneralContainer from '../GeneralContainer/GeneralContainer'
import GuestContainer from '../GuestContainer/GuestContainer'

const EventContent = (props) => {
    return (
        <div className="event-content">
            {props.activeTab === 'Discussion' ?
                <GeneralContainer
                    isCreator={props.isCreator}
                />
                :
                <GuestContainer
                    isCreator={props.isCreator}
                    isGuest={props.isGuest}
                    toggleGuestModal={props.toggleGuestModal}
                    toggleAnswerModal={props.toggleAnswerModal}
                />
            }
        </div>
    )
}
export default EventContent
