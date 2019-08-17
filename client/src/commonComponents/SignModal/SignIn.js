import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import GoogleLogin from 'react-google-login'

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

    onSignInFail = (message) => {
        alert(message)
        this.setState({ password: '' })
    }

    signIn = async (username, password) => {
        try {
            await this.props.UserStore.signIn(username, password)
            this.props.VisibilityStore.closeSignModal()
        } catch (error) {
            this.onSignInFail('Could not sign in, check your username and password!')
        }
    }

    googleSignIn = async (response) => {
        try {
            await this.props.UserStore.googleSignIn(response.tokenId)
            this.props.VisibilityStore.closeSignModal()
        } catch (error) {
            this.onSignInFail('Could not sign in')
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
                    <GoogleLogin
                        clientId="911838998946-ofev1jb8srpg1qjaak4st5j6huablfvl.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={this.googleSignIn}
                        onFailure={()  => this.onSignInFail('Could not sign in')}
                    />
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignIn))