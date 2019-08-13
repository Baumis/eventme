import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ProfileHeader.css'
import ProfileCard from './ProfileCard'

class ProfileHeader extends Component {

    render() {
        return (
            <div className="profileHeaderContainer">
                <ProfileCard
                    user={this.props.user}
                    isOwner={this.props.isOwner}
                    toggleOptions={this.props.toggleOptions}
                />
            </div>
        )
    }
}

export default inject('UserStore')(observer(ProfileHeader))