import React, { Component } from 'react'
import './LoginModal.css'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import Login from './Login'
import SignUp from './SignUp'


class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'Login'
        }
    }

    contents = {
        Login: Login,
        SignUp: SignUp
    }

    changeTab = (tab) => {
        this.setState({ content: tab })
    }

    render() {
        const TagName = this.contents[this.state.content]
        return (
            <div className="LoginBackground" >
                <div className="Login">
                    <div className="topRow">
                        <div className="ExitIcon" onClick={this.props.close}>
                            <FaTimes />
                        </div>
                    </div>
                    <div className="Tabs">
                        <div
                            className="Tab"
                            id={this.state.content === 'Login' ? 'ActiveTab' : 'Normal'}
                            onClick={() => this.changeTab('Login')}
                        >
                            Login
                        </div>
                        <div
                            className="Tab"
                            id={this.state.content === 'SignUp' ? 'ActiveTab' : 'Normal'}
                            onClick={() => this.changeTab('SignUp')}
                        >
                            Sing up
                        </div>
                    </div>
                    <TagName />
                    <div className="SkipRow">
                        <Link style={{ 'textDecoration': 'none', 'color': '#B2BFCB' }} to="/event">
                            {'skip'}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal