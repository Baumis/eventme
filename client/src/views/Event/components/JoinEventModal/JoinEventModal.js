import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventModal.css'

class JoinEventModal extends Component {

    join = async () => {

        if(!this.props.UserStore.currentUser){
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
                <div className="join-event-modal">
                    <div className="join-event-button-row">
                            <div className="join-event-button" onClick={() => this.join()}>
                                Join event
                            </div>
                    </div>
                </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(JoinEventModal))