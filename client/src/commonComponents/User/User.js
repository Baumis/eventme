import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './User.css'
import { FaUser } from 'react-icons/fa'

class User extends Component {

    openLoginModal = () => {
        this.props.VisibilityStore.showLoginModal()
    }

    openProfile = () => {
        this.props.history.push('/profile')
    }

    signOut = () => {
        this.props.UserStore.signOut()
    }

    render() {
        return (
            <div className="UserPanel">
                {this.props.UserStore.currentUser ?
                    <div className="SignedIn">
                        <div>
                            <div className="UserIcon"><FaUser /></div>
                            <div onClick={this.openProfile} className="UserName">
                                {this.props.UserStore.currentUser.username}
                            </div>
                        </div>
                        <div className="signButton" onClick={this.signOut} >{'Sign Out'}</div>
                    </div>
                    :
                    <div>
                        <div className="signButton" onClick={this.openLoginModal}>{'Sign In'}</div>
                    </div>
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(User))