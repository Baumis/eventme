import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import loginService from '../../services/login'

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

    login = async (username, password) => {
        try {
            const user = await loginService.login({ username, password })
            this.props.UserStore.setCurrentUser(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            this.setState({ password: '', username: '' })

            try {
                if (this.props.VisibilityStore.redirectTo) {
                    const route = this.props.VisibilityStore.redirectTo
                    this.props.history.push('/events/' + route)
                }
            } catch (error) {
                console.log(error)
            }

            this.props.VisibilityStore.closeLoginModal()

        } catch (error) {
            alert('Something went wrong, check your username and password!')
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
                        type={'password'}
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