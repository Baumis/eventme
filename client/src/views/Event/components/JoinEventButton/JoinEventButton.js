import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventButton.css'
import Spinner from '../../../../commonComponents/Spinner/Spinner'

class JoinEventModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    join = async () => {

        if (!this.props.UserStore.currentUser) {
            this.props.VisibilityStore.showSignModal()
            return
        }

        this.setState({ loading: true })
        const response = await this.props.EventStore.joinEvent(
            this.props.EventStore.event._id,
            this.props.inviteKey
        )
        this.setState({ loading: false })
        if(!response){
            alert('Could not join, try again.')
        }
    }

    render() {
        return (
            <div className="join-event-button-container">
                <div className="join-event-button" onClick={() => this.join()}>
                {this.state.loading ? <Spinner /> : 'Join event'}
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(JoinEventModal))