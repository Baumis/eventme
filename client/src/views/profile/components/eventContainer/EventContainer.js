import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventContainer.css'

class EventContainer extends Component {

    render() {
        return (
            <div className="eventContainer">
                <div className="myEventsContainer">
                    {this.props.UserStore.myEvents.map((event, i) => (
                        <div key={i}> {event.title} </div>
                    ))}
                </div>
                <div className="myInvitesContainer">
                    {this.props.UserStore.myInvites.map((event, i) => (
                        <div key={i}> {event.title} </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(EventContainer))