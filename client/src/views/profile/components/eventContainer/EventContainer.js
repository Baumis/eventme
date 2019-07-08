import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventContainer.css'
import EventCard from './EventCard'

class EventContainer extends Component {

    render() {
        return (
            <div className="eventContainer">
                <div className="sectionHeader">My events</div>
                <div className="eventsContainer">
                    {this.props.UserStore.myEvents.map((event, i) => (
                        <div key={i}>
                            <EventCard title={event.title} background={event.background} />
                        </div>
                    ))}
                </div>
                <div className="sectionHeader">invites</div>
                <div className="eventsContainer">
                    {this.props.UserStore.myInvites.map((event, i) => (
                        <div key={i}>
                            <EventCard title={event.title} background={event.background} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(EventContainer))