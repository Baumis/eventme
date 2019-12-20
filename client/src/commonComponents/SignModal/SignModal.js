import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SignModal.css'
import { FaTimes } from 'react-icons/fa'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Recover from './Recover'

class SignModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'SignIn'
        }
    }

    changeTab = (tab) => {
        this.setState({ content: tab })
    }

    getActivityClass = (tabName) => {
        return this.state.content === tabName ? ' active-sign-tab' : ''
    }

    getContent = () => {
        if (this.state.content === 'SignIn') {
            return (
                <SignIn
                    changeTab={this.changeTab}
                    closeModal={() => this.props.VisibilityStore.closeSignModal()}
                />
            )
        } else if (this.state.content === 'SignUp') {
            return (
                <SignUp
                    changeTab={this.changeTab}
                    closeModal={() => this.props.VisibilityStore.closeSignModal()}
                />
            )
        } else if (this.state.content === 'Recover') {
            return (
                <Recover />
            )
        }
    }

    render() {
        return (
            <div className="sign-modal">
                <div className="sign-modal-top-row">
                    <div className="sign-modal-exit-icon" onClick={() => this.props.VisibilityStore.closeSignModal()}>
                        <FaTimes />
                    </div>
                </div>
                <div className="sign-modal-tabs">
                    <div
                        className={"sign-modal-tab" + this.getActivityClass('SignIn')}
                        onClick={() => this.changeTab('SignIn')}
                    >
                        Sign in
                        </div>
                    <div
                        className={"sign-modal-tab" + this.getActivityClass('SignUp')}
                        onClick={() => this.changeTab('SignUp')}
                    >
                        Sign up
                        </div>
                    <div
                        className={"sign-modal-tab" + this.getActivityClass('Recover')}
                        onClick={() => this.changeTab('Recover')}
                    >
                        Recover
                        </div>
                </div>
                {this.getContent()}
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignModal))