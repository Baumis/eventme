import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ProfileHeader from './components/profileHeader/profileHeader'

class Profile extends Component {

    render() {
        return (
            <div className="profileViewContainer">
                <ProfileHeader />
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))