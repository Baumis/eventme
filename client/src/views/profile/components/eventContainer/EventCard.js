import React from 'react'
import './EventContainer.css'

const EventCard = (props) => {

    const background = {
        backgroundImage: 'url(' + props.background + ')'
    }

    return (
        <div style={background} className="eventCard">

            <div className="titlePanel">
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default EventCard