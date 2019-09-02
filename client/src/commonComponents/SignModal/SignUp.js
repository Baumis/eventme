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

    signUp = async () => {
        const userObject = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ loading: true })
        try {
            await this.props.UserStore.signUp(userObject)
            this.setState({ loading: false })
            alert('Your account has been saved. Continue by signing in.')
            this.props.changeTab('SignIn')
        } catch (error) {
            this.setState({ loading: false })
            alert('Something went wrong...')
        }

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