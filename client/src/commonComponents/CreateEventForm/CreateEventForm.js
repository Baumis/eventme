import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './CreateEventForm.css'
import EventInformation from './EventInformation/EventInformation'
import GuestInformation from './GuestInformation/GuestInformation'

class CreateEventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
    }

    changePage = (page) => {
        this.setState({ page: page })
    }

    getPage = () => {
        switch (this.state.page) {
            case 1:
                return <EventInformation changePage={this.changePage} />
            case 2:
                return <GuestInformation changePage={this.changePage}/>
            default:
                return <EventInformation changePage={this.changePage} />
        }
    }

    render() {
        return (
            <div className="create-event-form">
                {this.getPage()}
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(CreateEventForm)))