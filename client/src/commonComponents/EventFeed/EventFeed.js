import React, { useState } from 'react'
import './EventFeed.css'
import { withRouter } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import EventCard from '../../views/Profile/components/EventCard/EventCard'

const EventFeed = (props) => {

    if (props.loading) {
        return <div className="event-feed"> <Spinner /> </div>
    }

    return (
        <div className="event-feed">
                {props.events.length > 0 &&
                    <div className="event-list">
                        {props.events.map(event =>
                            <EventCard event={event} key={event._id} />
                        )}
                    </div>
                }
        </div>
    )
}

export default withRouter(EventFeed)