import React from 'react'
import './EventContainer.css'

const EventCard = ({ event }) => {

    const background = {
        backgroundImage: 'url(' + event.background + ')'
    }

    return (
        <a href={`/events/${event._id}`} style={background} className="eventCard">
            <div className="titlePanel">
                <p>{event.label}</p>
            </div>
        </a>
    )
}

export default EventCard