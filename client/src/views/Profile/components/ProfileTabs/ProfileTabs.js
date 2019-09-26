import React, { Component } from 'react'
import './ProfileTabs.css'

class ProfileTabs extends Component {

    render() {

        const getActivityClass = (tabName) => {
            return this.props.active === tabName ? ' profile-tabs-active' : ''
        }

        return (
            <div className="profile-tabs-row">
                <div className="profile-tabs-container">
                    <div className={'profile-tabs-tab' + getActivityClass('MyEvents')}
                        onClick={() => this.props.changeActive('MyEvents')}>
                        My Events
                    </div>
                    <div className={'profile-tabs-tab' + getActivityClass('Invites')}
                        onClick={() => this.props.changeActive('Invites')}>
                        Invites
                    </div>
                    <div className={'profile-tabs-tab' + getActivityClass('Settings')}
                        onClick={() => this.props.changeActive('Settings')}>
                        Settings
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTabs