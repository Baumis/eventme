import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ProfileHeader.css'
import ProfileCard from './ProfileCard'

class profileHeader extends Component {

    render() {
        console.log(this.props.UserStore.currentUser)
        return (
            <div className="profileHeaderContainer">
                <ProfileCard user={this.props.UserStore.currentUser} />
            </div>
        )
    }
}

export default inject('UserStore')(observer(profileHeader))