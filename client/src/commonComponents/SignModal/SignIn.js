import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Spinner from '../Spinner/Spinner'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            username: '',
            password: ''
        }
    }


    componentDidMount() {
        document.addEventListener('keydown', this.handleKey)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKey)
    }

    handleKey = (event) => {
        if (event.keyCode === 13) {
            this.signIn()
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

    signIn = async () => {
        try {
            this.setState({ loading: true })
            await this.props.UserStore.signIn(this.state.username, this.state.password)
            this.setState({ loading: false })
            this.props.VisibilityStore.closeSignModal()

            if (this.props.VisibilityStore.onSignSuccess) {
                this.props.VisibilityStore.onSignSuccess()
            }

        } catch (error) {
            this.setState({ loading: false })
            this.setState({ password: '' })
            this.onSignInFail('Could not sign in, check your username and password!')
        }
    }

    googleSignIn = async (response) => {
        try {
            await this.props.UserStore.googleSignIn(response.tokenId)
            this.props.VisibilityStore.closeSignModal()

            if (this.props.VisibilityStore.onSignSuccess) {
                this.props.VisibilityStore.onSignSuccess()
            }

        } catch (error) {
            this.onSignInFail('Could not sign in')
        }
    }

    facebookSignIn = async (response) => {
        try {
            await this.props.UserStore.facebookSignIn(response.id, response.accessToken)
            this.props.VisibilityStore.closeSignModal()

            if (this.props.VisibilityStore.onSignSuccess) {
                this.props.VisibilityStore.onSignSuccess()
            }

        } catch (error) {
            this.onSignInFail('Could not sign in')
        }
    }

    render() {
        return (
            <div className="signModalContent">
                <div className="signDetails">
                    <div className="signInput">
                        <label>Username</label>
                        <input
                            onChange={this.changeUsername}
                            value={this.state.username}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Password</label>
                        <input
                            type={'password'}
                            onChange={this.changePassword}
                            value={this.state.password}
                        >
                        </input>
                    </div>
                </div>
                <div className="signButtonRow">
                    <div
                        className="signButton"
                        onClick={() => this.signIn()}>
                        {this.state.loading ?
                            <Spinner />
                            :
                            <div>
                                Sign in
                            </div>
                        }
                    </div>
                </div>
                <div className="signButtonRow">
                    <GoogleLogin
                        className="googleSignButton"
                        clientId="911838998946-ofev1jb8srpg1qjaak4st5j6huablfvl.apps.googleusercontent.com"
                        buttonText="Google sign in"
                        onSuccess={this.googleSignIn}
                        onFailure={() => this.onSignInFail('Could not sign in')}
                    />
                    <FacebookLogin
                        cssClass="facebookSignButton"
                        icon="fa-facebook"
                        textButton="Facebook sign in"
                        appId="494414091444821"
                        fields="name,email,picture"
                        callback={this.facebookSignIn}
                        onFailure={() => this.onSignInFail('Could not sign in')} />
                </div>
            </div >
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignIn))