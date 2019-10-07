import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SignModal.css'
import { FaTimes } from 'react-icons/fa'
import SignIn from './SignIn'
import SignUp from './SignUp'

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

    render() {
        return (
            <div className="sign-modal-bg">
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
                    </div>
                    {this.state.content === 'SignIn' ?
                        <SignIn
                            changeTab={this.changeTab}
                            closeModal={() => this.props.VisibilityStore.closeSignModal()}
                        />
                        :
                        <SignUp
                            changeTab={this.changeTab}
                            closeModal={() => this.props.VisibilityStore.closeSignModal()}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignModal))