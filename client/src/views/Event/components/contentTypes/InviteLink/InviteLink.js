import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './InviteLink.css'

class InviteLink extends Component {

    render() {
        return (
            <div className="InviteContainer">
                <div className="InviteTitle">
                    <h2>Public invite url</h2>
                    <p>Share this link to invite friends</p>
                </div>
                <div className="InviteContent">
                    <p>{`localhost:3000/events/${this.props.EventStore.event._id}/invite/${this.props.EventStore.event.inviteKey}`}</p>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(InviteLink))