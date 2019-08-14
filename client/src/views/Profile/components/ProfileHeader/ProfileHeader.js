import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ProfileHeader.css'
import ProfileCard from './ProfileCard'

class ProfileHeader extends Component {

    cover = {
        backgroundImage: `url(${this.props.UserStore.currentUser.cover})`
    }

    render() {
        return (
            <div style={this.cover} className="profileHeaderContainer">
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