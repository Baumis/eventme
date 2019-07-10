import React, { Component } from 'react'

class SignUp extends Component {
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

    render() {
        return (
            <div className="signModalContent">
                <div className="signDetails">
                    <div className="signInput">
                        <label>Name</label>
                        <input
                            onChange={this.changeUsername}
                            value={this.state.username}
                            placeholder={'user'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Username</label>
                        <input
                            onChange={this.changeUsername}
                            value={this.state.username}
                            placeholder={'user'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Email</label>
                        <input
                            onChange={this.changePassword}
                            value={this.state.password}
                            placeholder={'****'}
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
                    <div className="signInput">
                        <label>Password again</label>
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
                        onClick={() => this.login(this.state.username, this.state.password)}>
                        Sign Up
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp