import React from 'react'
import './EventContainer.css'

const EventCard = ({ event, history }) => {

    const background = {
        backgroundImage: 'url(' + event.settings.background + ')'
    }

    const goToEvent = () => {
        history.push(`/events/${event._id}`)
    }

    return (
        <div style={background} className="eventCard" onClick={() => goToEvent()}>
            <div className="titlePanel">
                <p>{event.label}</p>
            </div>
        </div>
    )
}

export default EventCard