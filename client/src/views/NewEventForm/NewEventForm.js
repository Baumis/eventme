import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewEventForm.css'
import NavBar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import Alert from '../../commonComponents/Alert/Alert'
import Footer from '../../commonComponents/Footer/Footer'
import CreateEventForm from '../../commonComponents/CreateEventForm/CreateEventForm'

class NewEventForm extends Component {

    afterSign = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className="new-event-form">
                <NavBar
                    afterSign={this.afterSign}
                    staticColor={true}
                />
                <div className="new-event-form-content">
                    <div className="new-event-form-title">
                        New Event
                        </div>
                    <div className="new-event-form-wrapper">
                        <CreateEventForm />
                    </div>
                </div>
                <Footer />
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null
                }
                {this.props.VisibilityStore.alert ?
                    <Alert />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(NewEventForm))