import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InvitesContainer.css'
import EventCard from '../EventCard/EventCard'
import { FaCalendarTimes } from 'react-icons/fa'

class InvitesContainer extends Component {

    render() {
        return (
            <div className="event-container">
                <div className="event-container-column">
                    {this.props.user.myInvites.length === 0 && this.props.user.myPastInvites.length === 0 ?
                        <div className="no-events">
                            <div className="no-events-icon"> <FaCalendarTimes /> </div>
                            <div className="no-events-text">No invites to display</div>
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