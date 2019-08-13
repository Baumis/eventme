import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventContainer.css'
import EventCard from './EventCard'

class EventContainer extends Component {

    render() {
        return (
            <div className="event-container">
                <div className="event-container-header">
                    <p>Created events</p>
                </div >
                <div className="event-container-row">
                    <div className="eventCard event-container-new-button"
                        onClick={() => this.props.newEvent()}
                    >
                        {'+'}
                    </div>
                    {this.props.user.myEvents.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                </div>
                <div className="event-container-header">
                    <p>Invites</p>
                </div>
                <div className="event-container-row">
                    {this.props.user.myInvites.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                </div>
            </div >
        )
    }
}

export default inject('UserStore')(observer(EventContainer))