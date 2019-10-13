import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Spinner from '../Spinner/Spinner'

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

    changeStateValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    validateInputData = () => {
        if (this.state.name.length < 3) {
            alert('Name must have a length of at least 3 characters.')
            return false
        }
        if (this.state.name.length > 70) {
            alert('Name can\'t be over 70 characters long')
            return false
        }
        if (this.state.password.length < 3) {
            alert('The password have to be at least 3 characters long.')
            return false
        }
        if (this.state.username.length < 3) {
            alert('Username must have a length of at least 3 characters.')
            return false
        }
        if (this.state.username.length > 70) {
            alert('Username can\'t be over 70 characters long')
            return false
        }
        if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            alert('Use a valid email.')
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
        } catch (error) {
            error.response.data.error === 'Username must be unique' ?
                alert('This username is already taken.')
                :
                alert('Sign Up failed. Check your connection and try again.')
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <div className="signModalContent">
                <div className="signDetails">
                    <div className="signInput">
                        <label>Name</label>
                        <input
                            name={'name'}
                            onChange={this.changeStateValue}
                            value={this.state.name}
                            placeholder={'Fredrik Miller'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Email</label>
                        <input
                            name={'email'}
                            type={'email'}
                            onChange={this.changeStateValue}
                            value={this.state.email}
                            placeholder={'miller@email.com'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Username</label>
                        <input
                            name={'username'}
                            onChange={this.changeStateValue}
                            value={this.state.username}
                            placeholder={'freda'}
                        >
                        </input>
                    </div>
                    <div className="signInput">
                        <label>Password</label>
                        <input
                            name={'password'}
                            type={'password'}
                            onChange={this.changeStateValue}
                            value={this.state.password}
                            placeholder={'****'}
                        >
                        </input>
                    </div>
                </div>
                <div className="signButtonRow">
                    <div
                        className="signButton"
                        onClick={() => this.signUp()}>
                        {this.state.loading ?
                            <Spinner />
                            :
                            <div>
                                Sign Up
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignUp))