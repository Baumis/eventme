import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './MyEventsContainer.css'
import EventCard from '../EventCard/EventCard'
import { FaCalendarTimes } from 'react-icons/fa'

class MyEventsContainer extends Component {

    render() {
        return (
            <div className="event-container">
                {this.props.user.description &&
                    <div className="about-profile">
                        <div className="events-title">About</div>
                        <div className="about-profile-content">
                            {this.props.user.description}
                        </div>
                    </div>
                }
                <div className="event-container-column">
                    {this.props.isOwner ?
                        <div className="event-container-new-button"
                            onClick={() => this.props.newEvent()}
                        >
                            Create event
                        </div>
                        : null
                    }
                    {this.props.user.myEvents.length === 0 && this.props.user.myPastEvents.length === 0 ?
                        <div className="no-events">
                            <div className="no-events-icon"> <FaCalendarTimes /> </div>
                            <div className="no-events-text">No events to display</div>
                        </div>
                        : null}
                    {this.props.user.myEvents.length > 0 &&
                        <div className="events-title">Active events</div>
                    }
                    {this.props.user.myEvents.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                    {this.props.user.myPastEvents.length > 0 &&
                        <div className="events-title">Past events</div>
                    }
                    {this.props.user.myPastEvents.map((event, i) => (
                        <EventCard key={i} event={event} />
                    ))}
                </div>
            </div >
        )
    }
}

export default inject('UserStore')(observer(MyEventsContainer))