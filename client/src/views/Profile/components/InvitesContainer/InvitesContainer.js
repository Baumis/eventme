import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InvitesContainer.css'
import EventCard from '../EventCard/EventCard'

class InvitesContainer extends Component {

    render() {
        return (
            <div className="event-container">
                <div className="event-container-column">
                    {this.props.user.myInvites.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                </div>
            </div >
        )
    }
}

export default inject('UserStore')(observer(InvitesContainer))