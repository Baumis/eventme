import React from 'react'
import './EventCard.css'
import { withRouter } from 'react-router-dom'

const EventCard = (props) => {

    const background = {
        backgroundImage: 'url(' + props.event.background + ')'
    }

    const toEvent = (id) => {
        props.history.push(`/events/${props.event._id}`)
    }

    return (
        <div className="event-card" onClick={() => toEvent()}>
            <div className="event-card-picture-container" style={background}>
                <div className="event-card-title">
                    <p>{props.event.label}</p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(EventCard)