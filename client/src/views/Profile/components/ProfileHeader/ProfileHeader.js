import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ProfileHeader.css'
import ProfileCard from './ProfileCard/ProfileCard'
import ProfileTabs from '../ProfileTabs/ProfileTabs'

class ProfileHeader extends Component {

    getCover = () => {
        if (!this.props.UserStore.currentUser.cover) {
            return null
        }
        return ({
            backgroundImage: `url(${this.props.user.cover})`
        })
    }

    render() {
        return (
            <div style={this.getCover()} className="profile-header">
                <ProfileTabs
                    changeActive={this.props.changeActive}
                    active={this.props.active}
                    isOwner={this.props.isOwner}
                />
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