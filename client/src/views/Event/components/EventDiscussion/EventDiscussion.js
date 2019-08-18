import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventDiscussion.css'

class EventDiscussion extends Component {
    render() {
        return(
            <div className="discussion-container">
                <div className="discussion-header">
                    <div className="discussion-input-row">
                        <input></input>
                        <div className="discussion-send-button"></div>
                    </div>
                <div className="discussion-content">

                </div>
                </div>

            </div>
        )
    }
}

export default inject('EventStore')(observer(EventDiscussion))