import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './User.css'
import { FaUser } from 'react-icons/fa'

class User extends Component {

    openSignModal = () => {
        this.props.VisibilityStore.showSignModal()
    }

    signOut = () => {
        this.props.UserStore.signOut()
        this.props.history.push('/')
    }

    avatar = {
        backgroundImage: `url(${this.props.UserStore.currentUser.avatar})`
    }

    render() {
        return (
            <div className="user">
                {this.props.UserStore.currentUser ?
                    <div className="user-signed-in">
                        <a href={`/profile/${this.props.UserStore.currentUser._id}`} className="user-username">
                            <div style={this.avatar} className="user-avatar"> </div>
                            {this.props.UserStore.currentUser.name}
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

export default withRouter(inject('UserStore', 'VisibilityStore')(observer(User)))