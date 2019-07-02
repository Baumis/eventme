import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './User.css'
import { FaUser } from 'react-icons/fa'

class User extends Component {

    render() {
        return (
            <div className="UserPanel">
                {this.props.UserStore.currentUser ?
                    <div>
                        <div className="UserIcon"><FaUser /></div>
                        <div className="UserName">
                            {this.props.UserStore.currentUser.username}
                        </div>
                    </div>
                    :
                    <div>
                        <div className="LoginButton">{'Sign In'}</div>
                    </div>
                }
            </div>
        )
    }
}

export default inject('UserStore')(observer(User))