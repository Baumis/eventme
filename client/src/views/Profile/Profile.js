import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import EventContainer from './components/EventContainer/EventContainer'

class Profile extends Component {

    render() {
        return (
            <div className="profileViewContainer">
                <ProfileHeader />
                <EventContainer />
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))