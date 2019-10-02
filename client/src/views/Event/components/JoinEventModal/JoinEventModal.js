import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventModal.css'

class JoinEventModal extends Component {

    signIn = () => {
        this.props.VisibilityStore.showSignModal()
    }

    join = async () => {
        await this.props.EventStore.joinEvent(
            this.props.EventStore.event._id,
            this.props.inviteKey
        )
        this.props.closeInviteModal()
    }

    render() {
        return (
            <div className="join-event-modal-bg">
                <div className="join-event-modal">
                    <div className="join-event-message">
                        <p>You have been invited to this event!</p>
                    </div>
                    {!this.props.UserStore.currentUser ?
                        <div className="join-event-signin">
                            <div id="join-event-signin-button" onClick={this.signIn}>
                                Sign in / Sign up
                            </div>
                        </div>
                        : null
                    }
                    <div className="join-event-button-row">
                        {this.props.UserStore.currentUser ?
                            <div className="join-event-button" id="join-event-button-join" onClick={() => this.join()}>
                                Join event
                            </div>
                            : null
                        }
                        <div className="join-event-button" id="join-event-button-continue" onClick={this.props.closeInviteModal}>
                            Continue without joining
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(JoinEventModal))