import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import loginService from '../../../../services/login'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    login = (username, password) => {
        let user = loginService.login(username, password)
        if (user) {
            this.props.UserStore.setCurrentUser(user)
            this.setState({ password: '', username: '' })
            this.props.VisibilityStore.closeLoginModal()
            this.props.create()
        } else {
            alert('Wrong username or password!')
            this.setState({ password: '' })
        }
    }

    render() {
        return (
            <div className="LoginModalContent">
                <div className="LoginInput">
                    <label>Username</label>
                    <input
                        onChange={this.changeUsername}
                        value={this.state.username}
                        placeholder={'user'}
                    >
                    </input>
                </div>
                <div className="LoginInput">
                    <label>Password</label>
                    <input
                        onChange={this.changePassword}
                        value={this.state.password}
                        placeholder={'****'}
                    >
                    </input>
                </div>
                <div className="LoginButtonRow">
                    <div
                        className="LoginButton"
                        onClick={() => this.login(this.state.username, this.state.password)}
                    >login
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Login))