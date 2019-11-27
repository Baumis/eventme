import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './MainHeader.css'

class MainHeader extends Component {

    goToProfile = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal()
        } else {
            this.props.history.push(`/profile/${this.props.UserStore.UserStore.currentUser._id}`)
        }
    }

    createEvent = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal()
        } else {
            this.props.displayEventModal()
        }
    }

    render() {
        return (
            <div className="main-header">
                <div className="main-header-content">
                    <div className="main-header-title">
                        Create and manage your events
                </div>
                    <div className="main-header-button-row">
                        <div onClick={() => this.createEvent()} className="main-header-button-create">
                            Create event
                    </div>
                        <div onClick={() => this.goToProfile()} className="main-header-button-events">
                            My events
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('UserStore', 'VisibilityStore')(observer(MainHeader)))