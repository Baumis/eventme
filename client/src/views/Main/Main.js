import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import CreateButton from './components/CreateButton/CreateButton'
import Navbar from './components/Navbar/Navbar'
import LoginModal from '../../commonComponents/LoginModal/LoginModal'

class Main extends Component {

    createEvent = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showLoginModal()
        } else {
            this.props.history.push('/events/template')
        }
    }

    render() {
        return (
            <div className="Main">
                <Navbar history={this.props.history} />
                <div className="MainContent">
                    <CreateButton click={this.createEvent} />
                </div>
                {this.props.VisibilityStore.loginModal ?
                    <LoginModal history={this.props.history} />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))