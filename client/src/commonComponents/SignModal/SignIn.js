import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class SignIn extends Component {
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

    signIn = async (username, password) => {
        try {
            await this.props.UserStore.signIn(username, password)
            this.props.VisibilityStore.closeSignModal()
        } catch (error) {
            alert('Something went wrong, check your username and password!')
            this.setState({ password: '' })
        }
    }

    render() {
        return (
            <div className="signModalContent">
                <div className="signDetails">
                    <div className="signInput">
                        <label>Email</label>
                        <input
                            onChange={this.changeUsername}
                            value={this.state.username}
                            placeholder={'user@email.com'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Password</label>
                        <input
                            type={'password'}
                            onChange={this.changePassword}
                            value={this.state.password}
                            placeholder={'****'}
                        >
                        </input>
                    </div>
                </div>
                <div className="signButtonRow">
                    <div
                        className="signButton"
                        onClick={() => this.signIn(this.state.username, this.state.password)}>
                        Sign In
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignIn))