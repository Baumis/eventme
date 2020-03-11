import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './UnsignedUser.css'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebook } from 'react-icons/fa'
import { ReactComponent as GoogleLogo } from '../../../../../commonComponents/SignModal/SignIn/googleLogo.svg'
import AliasSection from './AliasSection'

class UnsignedUser extends Component {

    onSignInFail = (message) => {
        this.props.VisibilityStore.showAlert(
            'Sign in failed',
            message,
            'OK',
            () => this.props.VisibilityStore.closeAlert()
        )
        this.setState({ password: '' })
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

    inviteOwlSignIn = () => {
        this.props.VisibilityStore.showSignModal()
    }

    render() {
        return (
            <div className="unsigned-user">
                <div className="unsigned-user-title">
                    Join event with your preferable account
                </div>
                <div className="signin-social-accounts">
                    <div className="google-login-wrapper">
                        <GoogleLogin
                            clientId="629446459470-tm1sivu38dq611tlu5c4f9v9q54ijvgn.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            onSuccess={this.googleSignIn}
                            onFailure={() => this.onSignInFail('Could not sign in')}
                            render={renderProps => (
                                <div className="google-login" onClick={renderProps.onClick}>
                                    <GoogleLogo className="google-icon" />
                                    Google
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
                            disableMobileRedirect={true}
                            render={renderProps => (
                                <div className="facebook-login" onClick={renderProps.onClick}>
                                    <FaFacebook className="facebook-icon" />
                                    Facebook
                                </div>
                            )}
                        />
                    </div>
                    <div className="facebook-login-wrapper">
                        <div className="inviteowl-login" onClick={() => this.inviteOwlSignIn()}>
                            InviteOwl
                        </div>
                    </div>
                </div>
                {this.props.EventStore.event.allowAlias ?
                    <AliasSection
                        alias={this.props.alias}
                        changeAlias={this.props.changeAlias}
                    />
                    :
                    null}
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore', 'VisibilityStore')(observer(UnsignedUser))