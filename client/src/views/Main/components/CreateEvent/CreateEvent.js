import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './CreateEvent.css'
import ContentBook from '../ContentBook/ContentBook'

class CreateEvent extends Component {

    goToProfile = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal(this.goToProfile)
        } else {
            this.props.history.push(`/profile/${this.props.UserStore.currentUser._id}`)
        }
    }

    render() {
        return (
            <div className="create-event" id="create-event-section">
                <ContentBook />
            </div>
        )
    }
}

export default withRouter(inject('UserStore', 'VisibilityStore')(observer(CreateEvent)))