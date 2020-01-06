import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SignedUser.css'

class SignedUser extends Component {

    componentDidMount() {
        if(this.props.isGuest()){
            this.props.toggleRegisterModal()
        }
    }

    getAvatar = (avatar) => {
        if (!avatar) {
            return null
        }
        return { backgroundImage: `url(${avatar})` }
    }

    render() {
        return (
            <div className="signed-user">
                <div className="signed-user-avatar" style={this.getAvatar(this.props.UserStore.currentUser.avatar)}>
                </div>
                <div className="signed-user-name">
                    {this.props.UserStore.currentUser.name}
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(SignedUser))