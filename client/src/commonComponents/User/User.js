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
            <div className="user">
                {this.props.UserStore.currentUser ?
                    <div className="user-signed-in">
                        <a href={`/profile/${this.props.UserStore.currentUser._id}`} className="user-username">
                            <div className="user-icon"><FaUser /></div>
                            {this.props.UserStore.currentUser.username}
                        </a>
                        <div className="user-sign-button" onClick={this.signOut} >{'Sign out'}</div>
                    </div>
                    :
                    <div>
                        <div className="user-sign-button" onClick={this.openSignModal}>{'Sign in'}</div>
                    </div>
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(User))