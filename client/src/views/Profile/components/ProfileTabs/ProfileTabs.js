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
                        {this.props.isOwner ?
                            <div>MY EVENTS</div>
                            :
                            <div>EVENTS</div>
                        }
                    </div>
                    <div className={'profile-tabs-tab' + getActivityClass('Invites')}
                        onClick={() => this.props.changeActive('Invites')}>
                        ATTENDING
                    </div>
                    {this.props.isOwner ?
                        <div className={'profile-tabs-tab' + getActivityClass('Settings')}
                            onClick={() => this.props.changeActive('Settings')}>
                            SETTINGS
                        </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default ProfileTabs