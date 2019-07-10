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
                    {this.props.UserStore.currentUser.myEvents.map((event, i) => (
                        <EventCard key={i} event={event} history={this.props.history} />
                    ))}
                </div>
                <div className="sectionHeader">Invites</div>
                <div className="eventsContainer">
                    {this.props.UserStore.currentUser.myInvites.map((event, i) => (
                        <EventCard key={i} event={event} history={this.props.history} />
                    ))}
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(EventContainer))