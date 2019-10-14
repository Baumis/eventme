import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './User.css'

class User extends Component {

    openSignModal = () => {
        this.props.VisibilityStore.showSignModal()
    }

    signOut = () => {
        this.props.UserStore.signOut()
        this.props.history.push('/')
    }

    getAvatar = () => {
        if (!this.props.UserStore.currentUser.avatar) {
            return null
        }
        return { backgroundImage: `url(${this.props.UserStore.currentUser.avatar})` }
    }

    parseFirstName = (name) => {
        const nameArray = name.split(' ')
        if (nameArray.length > 1) {
            return nameArray[0]
        }
        return name
    }

    render() {
        return (
            <div className="user">
                {this.props.UserStore.currentUser ?
                    <div className="user-signed-in">
                        <a className="user-username" href={`/profile/${this.props.UserStore.currentUser._id}`}>
                            <div style={this.getAvatar()} className="user-avatar"> </div>
                            {this.parseFirstName(this.props.UserStore.currentUser.name)}
                        </a>
                        <div className="user-section-devider"> </div>
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