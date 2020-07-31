import React, { useState } from 'react'
import './EventFeed.css'
import { withRouter } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import EventCard from '../../views/Profile/components/EventCard/EventCard'
import moment from 'moment'
import FeedSplitter from './FeedSplitter'

const EventFeed = (props) => {

    const isDifferentDay = (index) => {
        if (!props.renderSplitter || props.events.length - 1 === index) {
            return
        }
        return !moment(props.events[index].startDate).isSame(props.events[index + 1].startDate)
    }

    return (
        <div className="event-feed">
            {props.events.length > 0 &&
                <div className="event-list">
                    {props.events.map((event, index) =>
                        <div key={event._id}>
                            <EventCard event={event} key={event._id} />
                            {isDifferentDay(index) &&
                                <FeedSplitter date={props.events[index + 1].startDate} />
                            }
                        </div>
                    )}
                </div>
            }
            {props.loading && <div className="event-feed-loader"> <Spinner /> </div>}
        </div>
    )
}

export default withRouter(EventFeed)