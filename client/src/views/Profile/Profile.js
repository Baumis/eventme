import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import EventContainer from './components/EventContainer/EventContainer'

class Profile extends Component {

    async componentDidMount() {
        await this.props.UserStore.refreshUser()
    }

    render() {
        return (
            <div className="profileViewContainer">
                <ProfileHeader />
                <EventContainer history={this.props.history} />
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))