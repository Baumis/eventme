import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SignUp.css'
import Spinner from '../../Spinner/Spinner'
import SignInput from '../components/SignInput/SignInput'
import { FaTimes } from 'react-icons/fa'


class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            name: '',
            username: '',
            email: '',
            password: ''
        }
    }

    changeStateValue = (name, event) => {
        this.setState({ [name]: event.target.value })
    }

    alert = (message) => {
        this.props.VisibilityStore.showAlert(
            'Sign up failed',
            message,
            'OK',
            () => this.props.VisibilityStore.closeAlert()
        )
    }

    validateInputData = () => {
        if (this.state.name.length < 3) {
            this.alert('Name must have a length of at least 3 characters.')
            return false
        }
        if (this.state.name.length > 70) {
            this.alert('Name can\'t be over 70 characters long')
            return false
        }
        if (this.state.password.length < 3) {
            this.alert('The password have to be at least 3 characters long.')
            return false
        }
        if (this.state.username.length < 3) {
            this.alert('Username must have a length of at least 3 characters.')
            return false
        }
        if (this.state.username.length > 70) {
            this.alert('Username can\'t be over 70 characters long')
            return false
        }
        if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            this.alert('Use a valid email.')
            return false
        }
        return true
    }

    signUp = async () => {
        if (!this.validateInputData()) {
            return
        }

        const userObject = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        this.setState({ loading: true })
        try {
            await this.props.UserStore.signUp(userObject)
            this.props.closeModal()
            this.props.VisibilityStore.showAlert(
                'Account created',
                'You will receive an verification email in 1-10 minutes.',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )

            if (this.props.VisibilityStore.onSignSuccess) {
                this.props.VisibilityStore.onSignSuccess()
            }

        } catch (error) {
            error.response.data.error === 'Username must be unique' ?
                this.alert('This username is already taken.')
                :
                this.alert('Sign Up failed. Check your connection and try again.')
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <div className="signin-content">
                <div className="signup-title">
                    Sign up
                    <div className="signup-exit-icon" onClick={() => this.props.VisibilityStore.closeSignModal()}>
                        <FaTimes />
                    </div>
                </div>
                <div className="signup-details">
                    <SignInput
                        label={'Full name / Company'}
                        change={(event) => this.changeStateValue('name', event)}
                        value={this.state.name}
                        type={'text'}
                    />
                    <SignInput
                        label={'Email'}
                        change={(event) => this.changeStateValue('email', event)}
                        value={this.state.email}
                        type={'email'}
                    />
                    <SignInput
                        label={'Username'}
                        change={(event) => this.changeStateValue('username', event)}
                        value={this.state.username}
                        type={'text'}
                    />
                    <SignInput
                        label={'Password'}
                        change={(event) => this.changeStateValue('password', event)}
                        value={this.state.password}
                        type={'password'}
                    />
                </div>
                <div
                    className="signup-button"
                    onClick={() => this.signUp()}>
                    {this.state.loading ?
                        <Spinner />
                        :
                        <div>
                            Sign up
                            </div>
                    }
                </div>
                <div className="signin-info-text">
                    Already have an account? <span onClick={() => this.props.changeTab('SignIn')} >Sign in.</span>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignUp))