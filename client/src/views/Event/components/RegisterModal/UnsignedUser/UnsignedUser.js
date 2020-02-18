import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './UnsignedUser.css'
import Spinner from '../../../../../commonComponents/Spinner/Spinner'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebook, FaMask, FaExclamationTriangle } from 'react-icons/fa'
import { ReactComponent as GoogleLogo } from '../../../../../commonComponents/SignModal/SignIn/googleLogo.svg'
import SignInput from '../../../../../commonComponents/SignModal/components/SignInput/SignInput'
import { FaUser } from 'react-icons/fa'

class UnsignedUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showAlias: false
        }
    }

    toggleAlias = () => {
        this.setState({ showAlias: !this.state.showAlias })
    }

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
                            clientId="911838998946-ofev1jb8srpg1qjaak4st5j6huablfvl.apps.googleusercontent.com"
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
                <div className="unsigned-user-title">
                    Or join with an alias.
                </div>
                {!this.state.showAlias ?
                    <div className="facebook-login-wrapper">
                        <div className="unsigned-user-alias-button" onClick={() => this.toggleAlias()}>
                            <div className="unsigned-user-alias-icon">
                                <FaMask />
                            </div>
                            Alias
                        </div>
                    </div>
                    :
                    <div>
                        <div className="unsigned-user-info">
                            <span>
                                <FaExclamationTriangle />
                            </span>
                            You can't post messages or get notified about new messages when using an alias. This name will just appear in the guestlist.
                        </div>
                        <SignInput
                            label={''}
                            secondLabel={''}
                            change={this.props.changeAlias}
                            value={this.props.alias}
                            placeholder={'Full name'}
                            type={'text'}
                            icon={<FaUser />}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(UnsignedUser))