import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import CreateButton from './components/CreateButton/CreateButton'
import Navbar from './components/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import EventOptions from './components/EventOptions/EventOptions';

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayEventOptions: false
        }
    }

    createEvent = () => {
        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal()
        } else {
            this.displayOptions()
        }
    }

    displayOptions = () => {
        this.setState({ displayEventOptions: true })
    }

    hideOptions = () => {
        this.setState({ displayEventOptions: false })
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
                {this.state.displayEventOptions ?
                    <EventOptions history={this.props.history} hide={this.hideOptions} />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))