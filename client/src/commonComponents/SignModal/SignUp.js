import React, { Component } from 'react'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    changeStateValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className="signModalContent">
                <div className="signDetails">
                    <div className="signInput">
                        <label>Name</label>
                        <input
                            name={'name'}
                            onChange={this.changeStateValue}
                            value={this.state.name}
                            placeholder={'Fredrik Miller'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Username</label>
                        <input
                            name={'username'}
                            onChange={this.changeStateValue}
                            value={this.state.username}
                            placeholder={'user'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Email</label>
                        <input
                            name={'email'}
                            type={'email'}
                            onChange={this.changeStateValue}
                            value={this.state.email}
                            placeholder={'miller@email.com'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Password</label>
                        <input
                            name={'password'}
                            type={'password'}
                            onChange={this.changeStateValue}
                            value={this.state.password}
                            placeholder={'****'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Password again</label>
                        <input
                            name={'password2'}
                            type={'password'}
                            onChange={this.changeStateValue}
                            value={this.state.password2}
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