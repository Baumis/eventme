import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventModal.css'
import { FaTimes } from 'react-icons/fa'

class JoinEventModal extends Component {

    signIn = () => {
        this.props.VisibilityStore.showSignModal()
    }

    join = () => {
        this.props.EventStore.joinEvent(
            this.props.UserStore.currentUser._id,
            this.props.EventStore.event._id,
            this.props.inviteKey
        )
    }

    continue = () => {
    
    }

    render() {

        return (
            <div className="join-event-modal-bg">
                <div className="join-event-modal">
                    <div className="join-event-message">
                        <p>{'You have been invited to this event!'}</p>
                    </div>
                    {!this.props.UserStore.currentUser ?
                        <div className="join-event-signin">
                            <p>{'You have to sign in before joining.'}</p>
                            <p>{'The host wants to know who you are!'}</p>
                            <div id="join-event-signin-button" onClick={this.signIn}>
                                {'Sign In'}
                            </div>
                        </div>
                        : null
                    }
                    <div className="join-event-button-row">
                        {this.props.UserStore.currentUser ?
                            <div className="join-event-button" id="join-event-button-join" onClick={() => this.join()}>
                                {'Join event'}
                            </div>
                            : null
                        }
                        <div className="join-event-button" id="join-event-button-continue">
                            {'Continue without joining'}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(JoinEventModal))