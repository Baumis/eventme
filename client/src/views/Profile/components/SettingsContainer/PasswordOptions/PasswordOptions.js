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
        const user = await this.props.UserStore.updatePassword(this.state.oldPassword, this.state.newPassword)
        this.setState({ loading: false })

        if (user) {
            alert('password has been changed')
            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordAgain: ''
            })
        } else {
            alert('password could not be saved')
        }
    }

    render() {
        return (
            <div className="password-options">
                <h2>Change password</h2>
                <div className="general-options-input">
                    <label>Old password</label>
                    <input
                        name={'oldPassword'}
                        value={this.state.oldPassword}
                        onChange={this.changeValue}
                        type={'password'}
                    />
                </div>
                <div className="general-options-input">
                    <label>New password</label>
                    <input
                        name={'newPassword'}
                        value={this.state.newPassword}
                        onChange={this.changeValue}
                        type={'password'}
                    />
                </div>
                <div className="general-options-input">
                    <label>New password again</label>
                    <input
                        name={'newPasswordAgain'}
                        value={this.state.newPasswordAgain}
                        onChange={this.changeValue}
                        type={'password'}
                    />
                </div>
                <div className="general-options-button-row">
                    <div className="general-options-save-button" onClick={this.submitChangeRequest}>
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