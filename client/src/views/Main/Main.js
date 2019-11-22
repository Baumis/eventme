import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import NewEventModal from '../../commonComponents/NewEventModal/NewEventModal'
import ContentContainer from './components/ContentContainer/ContentContainer'
import MainHeader from './components/MainHeader/MainHeader'

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
                <Navbar />
                <MainHeader />
                <ContentContainer click={this.createEvent} />
                {this.props.VisibilityStore.signModal ?
                    <SignModal />
                    : null
                }
                {this.state.newEventModal ?
                    <NewEventModal hide={this.hideEventModal} />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))