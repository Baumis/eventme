import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventModal.css'
import { Redirect } from 'react-router-dom'

class JoinEventModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirectToEvent: false
        }
    }

    signIn = () => {
        this.props.VisibilityStore.showSignModal()
    }

    join = async () => {
        await this.props.EventStore.joinEvent(
            this.props.EventStore.event._id,
            this.props.inviteKey
        )
        this.setState({ redirectToEvent: true })
    }

    render() {
        if (this.state.redirectToEvent) {
            return <Redirect to={`/events/${this.props.EventStore.event._id}`} />
        }

        return (
            <div className="join-event-modal-bg">
                <div className="join-event-modal">
                    <div className="join-event-message">
                        <p>You have been invited to this event!</p>
                    </div>
                    {!this.props.UserStore.currentUser ?
                        <div className="join-event-signin">
                            <p>You have to sign in before joining.</p>
                            <p>The host wants to know who you are!</p>
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