import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SignModal.css'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Recover from './Recover/Recover'

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
        switch (this.state.content) {
            case 'SignIn':
                return <SignIn
                    changeTab={this.changeTab}
                    closeModal={() => this.props.VisibilityStore.closeSignModal()}
                />
            case 'SignUp':
                return <SignUp
                    changeTab={this.changeTab}
                    closeModal={() => this.props.VisibilityStore.closeSignModal()}
                />
            case 'Recover':
                return <Recover
                    changeTab={this.changeTab} />
            default:
                return <Recover
                    changeTab={this.changeTab} />
        }
    }

    render() {
        return (
            <div className="sign-modal">
                {this.getContent()}
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(SignModal))