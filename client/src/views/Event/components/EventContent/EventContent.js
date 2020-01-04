import React from 'react'
import './EventContent.css'
import ComponentContainer from '../ComponentContainer/ComponentContainer'
import DiscussionContainer from '../DiscussionContainer/DiscussionContainer'
import GuestContainer from '../GuestContainer/GuestContainer'

const EventContent = (props) => {
    return (
        <div className="event-content">
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
