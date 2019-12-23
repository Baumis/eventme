import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Recover.css'
import Spinner from '../../Spinner/Spinner'
import userService from '../../../services/users'
import SignInput from '../components/SignInput/SignInput'

class Recover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            username: '',
            email: ''
        }
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    onRecoveryFail = (message) => {
        alert(message)
        this.setState({ username: '', email: '' })
    }

    resetPassword = async () => {

        if (this.state.username.length === 0) {
            alert('Username can\'t be empty.')
            return
        }

        if (this.state.email.length === 0) {
            alert('Email can\'t be empty.')
            return
        }

        try {
            this.setState({ loading: true })
            await userService.resetPassword(this.state.username, this.state.email)
            this.setState({ loading: false })
            this.props.VisibilityStore.closeSignModal()
            alert('Password reset successful. Check your email.')
        } catch (error) {
            this.setState({ loading: false })
            this.onRecoveryFail('Could not recover, try again!')
        }
    }

    render() {
        return (
            <div className="signin-content">
                <div className="recover-title">
                    Recover password
                </div>
                <div className="signDetails">
                    <SignInput
                        label={'Username'}
                        value={this.state.username}
                        change={this.changeUsername}
                    />
                    <SignInput
                        label={'Email'}
                        value={this.state.email}
                        change={this.changeEmail}
                    />
                </div>
                <div
                    className="recover-button"
                    onClick={() => this.resetPassword()}>
                    {this.state.loading ?
                        <Spinner />
                        :
                        <div>
                            Reset password
                        </div>
                    }
                </div>
                <div className="recover-info-text">
                    Back to <span onClick={() => this.props.changeTab('SignIn')} >Sign in</span>.
                </div>
            </div>
        )
    }
}

export default inject('VisibilityStore')(observer(Recover))