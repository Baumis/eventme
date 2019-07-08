import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './LoginModal.css'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import SignIn from './SignIn'
import SignUp from './SignUp'


class LoginModal extends Component {
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

    createUser = () => {
    }

    render() {
        const TagName = this.contents[this.state.content]
        return (
            <div className="LoginBackground" >
                <div className="Login">
                    <div className="topRow">
                        <div className="ExitIcon" onClick={() => this.props.VisibilityStore.closeLoginModal()}>
                            <FaTimes />
                        </div>
                    </div>
                    <div className="Tabs">
                        <div
                            className="Tab"
                            id={this.state.content === 'SignIn' ? 'ActiveTab' : 'Normal'}
                            onClick={() => this.changeTab('SignIn')}
                        >
                            Sign in
                        </div>
                        <div
                            className="Tab"
                            id={this.state.content === 'SignUp' ? 'ActiveTab' : 'Normal'}
                            onClick={() => this.changeTab('SignUp')}
                        >
                            Sign up
                        </div>
                    </div>
                    <TagName history={this.props.history} />
                    <div className="SkipRow">
                        <Link style={{ 'textDecoration': 'none', 'color': '#B2BFCB' }} to="/events/template">
                            skip
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(LoginModal))