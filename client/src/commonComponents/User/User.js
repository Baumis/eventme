import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './User.css'
import { FaUser } from 'react-icons/fa'

class User extends Component {

    openSignModal = () => {
        this.props.VisibilityStore.showSignModal()
    }

    signOut = () => {
        this.props.UserStore.signOut()
        window.location.reload()
    }

    render() {
        return (
            <div className="userPanel">
                {this.props.UserStore.currentUser ?
                    <div className="signedIn">
                        <div>
                            <div className="userIcon"><FaUser /></div>
                            <a href={`/profile/${this.props.UserStore.currentUser._id}`} className="username">
                                {this.props.UserStore.currentUser.username}
                            </a>
                        </div>
                        <div className="signButton" onClick={this.signOut} >{'Sign Out'}</div>
                    </div>
                    :
                    <div>
                        <div className="signButton" onClick={this.openSignModal}>{'Sign In'}</div>
                    </div>
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(User))