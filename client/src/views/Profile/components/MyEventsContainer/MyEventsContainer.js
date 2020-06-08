import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './MyEventsContainer.css'
import EventCard from '../EventCard/EventCard'

class MyEventsContainer extends Component {

    render() {
        return (
            <div className="event-container">
                <div className="event-container-column">
                    {this.props.isOwner ?
                        <div className="event-container-new-button"
                            onClick={() => this.props.newEvent()}
                        >
                            Create event
                        </div>
                        : null
                    }
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