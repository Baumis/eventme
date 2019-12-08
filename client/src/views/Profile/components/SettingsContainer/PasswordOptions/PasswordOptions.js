import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './PasswordOptions.css'
import Spinner from '../../../../../commonComponents/Spinner/Spinner'

class PasswordOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: '',
            loading: false
        }
    }

    changeValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitChangeRequest = async () => {
        if (this.state.oldPassword.length < 1) {
            return
        }
        if (this.state.newPassword.length < 3) {
            alert('Password has to be over 3 character long')
            return
        }
        if (this.state.newPasswordAgain !== this.state.newPassword) {
            alert('Passwords are not matching')
            return
        }


        this.setState({ loading: true })
        try {
            await this.props.UserStore.updatePassword(this.state.oldPassword, this.state.newPassword)
            alert('password has been changed')
            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordAgain: ''
            })
        } catch (error) {
            error.response.data.error === 'Password incorrect' ?
                alert('Old password incorrect')
                :
                alert('password could not be saved')
        }
        this.setState({ loading: false })
    }

    render() {

        if (this.props.UserStore.currentUser.userType === 'GOOGLE') {
            return (
                <div className="password-options">
                    <h2>Change password</h2>
                    <div className="password-options-info-text">
                        This account is connected to a google account. Password can only be changed on a local account.
                    </div>
                </div>
            )
        }

        return (
            <div className="password-options">
                <h2>Change password</h2>
                <div className="password-options-input">
                    <label>Old password</label>
                    <input
                        name={'oldPassword'}
                        value={this.state.oldPassword}
                        onChange={this.changeValue}
                        type={'password'}
                    />
                </div>
                <div className="password-options-input">
                    <label>New password</label>
                    <input
                        name={'newPassword'}
                        value={this.state.newPassword}
                        onChange={this.changeValue}
                        type={'password'}
                    />
                </div>
                <div className="password-options-input">
                    <label>New password again</label>
                    <input
                        name={'newPasswordAgain'}
                        value={this.state.newPasswordAgain}
                        onChange={this.changeValue}
                        type={'password'}
                    />
                </div>
                <div className="password-options-button-row">
                    <div className="password-options-save-button" onClick={this.submitChangeRequest}>
                        {this.state.loading ?
                            <Spinner />
                            :
                            <div>Submit</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(PasswordOptions))