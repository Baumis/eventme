import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Spinner from '../../Spinner/Spinner'
import userService from '../../../services/users'

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
                        <label>Email</label>
                        <input
                            onChange={this.changeEmail}
                            value={this.state.email}
                        >
                        </input>
                    </div>
                </div>
                <div className="signButtonRow">
                    <div
                        className="signButton"
                        onClick={() => this.resetPassword()}>
                        {this.state.loading ?
                            <Spinner />
                            :
                            <div>
                                Reset password
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('VisibilityStore')(observer(Recover))