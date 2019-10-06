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

    contents = {
        SignIn: SignIn,
        SignUp: SignUp
    }

    changeTab = (tab) => {
        this.setState({ content: tab })
    }

    render() {
        const TagName = this.contents[this.state.content]
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
                            className="sign-modal-tab"
                            id={this.state.content === 'SignIn' ? 'ActiveTab' : 'Normal'}
                            onClick={() => this.changeTab('SignIn')}
                        >
                            Sign in
                        </div>
                        <div
                            className="sign-modal-tab"
                            id={this.state.content === 'SignUp' ? 'ActiveTab' : 'Normal'}
                            onClick={() => this.changeTab('SignUp')}
                        >
                            Sign up
                        </div>
                    </div>
                    <TagName 
                        changeTab={this.changeTab}
                        closeModal={() => this.props.VisibilityStore.closeSignModal()}
                    />
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignModal))