import React from 'react'
import './EventContent.css'
import ComponentContainer from '../ComponentContainer/ComponentContainer'
import DiscussionContainer from '../DiscussionContainer/DiscussionContainer'
import GuestContainer from '../GuestContainer/GuestContainer'

const EventContent = (props) => {
    return (
        <div className="event-content">
            {props.activeTab === "Event" ?
                <ComponentContainer
                    isCreator={props.isCreator}
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
