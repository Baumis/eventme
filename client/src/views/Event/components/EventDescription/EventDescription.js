import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventDescription.css'

class EventDescription extends Component {
    render() {
        return (
            <div className="event-description">
                <div className="event-description-content">
                    <div className="description-title">
                        Description
                    </div>
                    <div className="event-description-text">
                        {this.props.EventStore.event.description}
                    </div>
                </div>
            </div>
        )
    }

}

export default inject('EventStore')(observer(EventDescription))