import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventButton.css'

class JoinEventModal extends Component {

    join = async () => {

        if (!this.props.UserStore.currentUser) {
            this.props.VisibilityStore.showSignModal()
            return
        }

        await this.props.EventStore.joinEvent(
            this.props.EventStore.event._id,
            this.props.inviteKey
        )
        this.props.closeInviteModal()
    }

    render() {
        return (
            <div className="join-event-button-container">
                <div className="join-event-button" onClick={() => this.join()}>
                    Join event
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(JoinEventModal))