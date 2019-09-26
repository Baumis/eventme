import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './MyEventsContainer.css'
import EventCard from '../EventCard/EventCard'

class MyEventsContainer extends Component {

    render() {
        return (
            <div className="event-container">
                <div className="event-container-column">
                    <div className="event-container-new-button"
                        onClick={() => this.props.newEvent()}
                    >
                        New Event
                    </div>
                    {this.props.user.myEvents.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                </div>
            </div >
        )
    }
}

export default inject('UserStore')(observer(MyEventsContainer))