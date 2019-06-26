import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import CreateButton from './components/createButton/CreateButton'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/loginModal/LoginModal'

class Main extends Component {

    createEvent = () => {
        this.props.UserStore.currentUser === null ?
            this.props.VisibilityStore.showLoginModal()
            : this.props.history.push('/events')
    }

    render() {
        return (
            <div className="Main">
                <Navbar />
                <div className="MainContent">
                    <CreateButton click={this.createEvent} />
                </div>
                {this.props.VisibilityStore.loginModal ?
                    <LoginModal create={this.createEvent}/>
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))