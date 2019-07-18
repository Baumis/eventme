import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import CreateButton from './components/CreateButton/CreateButton'
import Navbar from './components/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import EventOptions from './components/NewEventModal/NewEventModal';

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newEventModal: false
        }
    }

    createEvent = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal()
        } else {
            this.displayEventModal()
        }
    }

    displayEventModal = () => {
        this.setState({ newEventModal: true })
    }

    hideEventModal = () => {
        this.setState({ newEventModal: false })
    }


    render() {
        return (
            <div className="Main">
                <Navbar history={this.props.history} />
                <div className="MainContent">
                    <CreateButton click={this.createEvent} />
                </div>
                {this.props.VisibilityStore.signModal ?
                    <SignModal history={this.props.history} />
                    : null
                }
                {this.state.newEventModal ?
                    <EventOptions history={this.props.history} hide={this.hideEventModal} />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))