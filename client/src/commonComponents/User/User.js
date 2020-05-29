import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './User.css'

class User extends Component {

    openSignModal = () => {
        this.props.VisibilityStore.showSignModal(this.props.afterSign)
    }

    signOut = () => {
        this.props.UserStore.signOut()
        this.props.history.push('/')
    }

    getAvatar = () => {
        if (!this.props.UserStore.currentUser.avatar) {
            return { backgroundImage: `url(${require('../../assets/avatar.png')})` }
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

    goToProfile = () => {
        this.props.history.push(`/profile/${this.props.UserStore.currentUser._id}`)
    }

    render() {
        return (
            <div className="user">
                {this.props.UserStore.currentUser ?
                    <div className="user-signed-in">
                        <div className="user-username" onClick={this.goToProfile}>
                            <div style={this.getAvatar()} className="user-avatar"> </div>
                            {this.parseFirstName(this.props.UserStore.currentUser.name)}
                        </div>
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