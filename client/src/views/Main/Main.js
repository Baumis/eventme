import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import NewEventOptions from '../../commonComponents/NewEventOptions/NewEventOptions'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import ContentContainer from './components/ContentContainer/ContentContainer'
import MainHeader from './components/MainHeader/MainHeader'
import CreateEventForm from './components/CreateEventForm/CreateEventForm'

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newEventModal: false
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
                <MainHeader
                    displayEventModal={this.displayEventModal}
                />
                <CreateEventForm />
                <ContentContainer />
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null
                }
                {this.state.newEventModal ?
                    <UniversalModal
                        content={<NewEventOptions hide={this.hideEventModal} />}
                    />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))