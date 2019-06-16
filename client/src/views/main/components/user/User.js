import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './User.css'
import { FaUser } from 'react-icons/fa'

class User extends Component {

    login = () => {
        this.props.VisibilityStore.showLoginModal()
    }
    render() {
        return (
            <div className="UserInfo">
                {this.props.UserStore.currentUser !== null
                    ? (
                        <div>
                            <div className="UserInfoIcon"><FaUser /></div>
                            <div className="UserInfoName">{this.props.UserStore.currentUser.username}</div>
                        </div>
                    ) : (
                        <div>
                            <div className="LoginButton" onClick={this.login}>Sign in</div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(User))