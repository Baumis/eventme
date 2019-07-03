import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class Profile extends Component {

    render() {
        return (
            <div>
                <div>
                    <h1>{this.props.UserStore.currentUser.username}</h1>
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))