import React from 'react'
import './EventCard.css'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

const EventCard = (props) => {

    const getCover = () => {
        if (!props.event.background) {
            return { backgroundImage: `url(${require('../../../../assets/event_cover.jpg')})` }
        }
        return ({
            backgroundImage: `url(${props.event.background})`
        })
    }

    const toEvent = () => {
        props.history.push('/events/' +  props.event.url)
    }

    return (
        <div className="event-card" onClick={() => toEvent()}>
            <div className="event-card-picture" style={getCover()}>
                <div className="event-card-content">
                    <div className="event-card-date">
                        <div className="event-card-month">
                            {moment(props.event.startDate).format('MMM')}
                        </div>
                        <div className="event-card-day">
                            {moment(props.event.startDate).format('DD')}
                        </div>
                    </div>
                    <div className="event-card-title-and-host">
                        <div className="event-card-title">
                            {props.event.label}
                        </div>
                        <div className="event-card-host">
                            {props.event.creator.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(EventCard)