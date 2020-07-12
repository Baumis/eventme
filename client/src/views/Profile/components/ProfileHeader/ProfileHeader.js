import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ProfileHeader.css'
import ProfileCard from './ProfileCard/ProfileCard'
import ProfileTabs from '../ProfileTabs/ProfileTabs'

class ProfileHeader extends Component {

    getCover = () => {
        if (!this.props.user.cover) {
            return { backgroundImage: `url(${require('../../../../assets/cover.jpg')})` }
        }
        return ({
            backgroundImage: `url(${this.props.user.cover})`
        })
    }

    render() {
        return (
            <div className="profile-header-container">
                <div className="profile-header">
                    <div style={this.getCover()} className="profile-header-cover">
                        <ProfileCard
                            user={this.props.user}
                            isOwner={this.props.isOwner}
                            toggleOptions={this.props.toggleOptions}
                        />
                    </div>
                    <ProfileTabs
                        changeActive={this.props.changeActive}
                        active={this.props.active}
                        isOwner={this.props.isOwner}
                    />
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(ProfileHeader))