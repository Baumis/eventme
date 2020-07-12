import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewEventForm.css'
import NavBar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import Alert from '../../commonComponents/Alert/Alert'
import Footer from '../../commonComponents/Footer/Footer'
import CreateEventForm from '../../commonComponents/CreateEventForm/CreateEventForm'
import { Helmet } from 'react-helmet'

class NewEventForm extends Component {

    afterSign = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className="new-event-form">
                <Helmet>
                    <title>Create Event</title>
                    <meta property="og:title" content="Create Event"/>
                    <meta name="description"
                        content="Create an event in 5 seconds with InviteOwl using local, Google or Facebook account. Invite guests by sharing a link. Manage all events in one place."/>
                    <meta property="og:description" content="Create your event and invite your friends using various accounts."/>
                    <meta property="og:url" content="https://www.inviteowl.com/create"/>
                    <meta property="og:image" content="https://www.inviteowl.com/owl_382x200_green.png"/>
                </Helmet>
                <NavBar
                    afterSign={this.afterSign}
                    staticColor={true}
                />
                <div className="new-event-form-content">
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