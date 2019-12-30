import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './MainHeader.css'

class MainHeader extends Component {

    goToProfile = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal(this.goToProfile)
        } else {
            this.props.history.push(`/profile/${this.props.UserStore.currentUser._id}`)
        }
    }

    render() {
        return (
            <div className="main-header">
                <h1>Create and manage events in one place</h1>
            </div>
        )
    }
}

export default withRouter(inject('UserStore', 'VisibilityStore')(observer(MainHeader)))