import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SignIn.css'
import Spinner from '../../Spinner/Spinner'
import SignInput from '../components/SignInput/SignInput'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { ReactComponent as GoogleLogo } from './googleLogo.svg';


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
            <div className="signin-content">
                <div className="signin-title">
                    Sign in
                </div>
                <div className="signin-social-accounts">
                    <div className="google-login-wrapper">
                        <GoogleLogin
                            clientId="911838998946-ofev1jb8srpg1qjaak4st5j6huablfvl.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={this.googleSignIn}
                            onFailure={() => this.onSignInFail('Could not sign in')}
                            render={renderProps => (
                                <div className="google-login" onClick={renderProps.onClick}>
                                    <GoogleLogo className="google-icon"/>
                                    Sign in with Google
                                </div>
                            )}
                        />
                    </div>
                    <div className="facebook-login-wrapper">
                        <FacebookLogin
                            appId="494414091444821"
                            fields="name,email,picture"
                            callback={this.facebookSignIn}
                            onFailure={() => this.onSignInFail('Could not sign in')}
                            render={renderProps => (
                                <div className="facebook-login" onClick={renderProps.onClick}>
                                    <FaFacebook className="facebook-icon"/>
                                    Sign in with Facebook
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="signin-local-accounts">
                    <SignInput
                        label={'Username'}
                        change={this.changeUsername}
                        value={this.state.username}
                        type={'text'}
                    />
                    <SignInput
                        label={'Password'}
                        secondLabel={'Forgot password?'}
                        labelAction={() => this.props.changeTab('Recovery')}
                        change={this.changePassword}
                        value={this.state.password}
                        type={'password'}
                    />
                    <div
                        className="signin-button"
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
                <div className="signin-info-text">
                        Don't have an account? <a onClick={() => this.props.changeTab('SignUp')} >Create one.</a>
                </div>
            </div >
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignIn))