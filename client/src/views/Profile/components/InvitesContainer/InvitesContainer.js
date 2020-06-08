import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InvitesContainer.css'
import EventCard from '../EventCard/EventCard'

class InvitesContainer extends Component {

    render() {
        return (
            <div className="event-container">
                <div className="event-container-column">
                    {this.props.user.myInvites.length === 0 && this.props.user.myPastInvites === 0 ?
                        <div className="event-container-no-invites">
                            No invites
                        </div>
                        : null}
                    {this.props.user.myInvites.length > 0 &&
                        <div className="events-title">Active invites</div>
                    }
                    {this.props.user.myInvites.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                    {this.props.user.myPastInvites.length > 0 &&
                        <div className="events-title">Past invites</div>
                    }
                    {this.props.user.myPastInvites.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                </div>
            </div >
        )
    }
}

export default inject('UserStore')(observer(InvitesContainer))