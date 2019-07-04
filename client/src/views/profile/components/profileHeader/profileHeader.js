import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './profileHeader.css'
import ProfileCard from './profileCard'

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