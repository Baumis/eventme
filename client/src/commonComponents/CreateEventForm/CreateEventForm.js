import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './CreateEventForm.css'
import moment from 'moment'
import EventInformation from './EventInformation/EventInformation'
import GuestInformation from './GuestInformation/GuestInformation'

class CreateEventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            information: {
                eventName: '',
                startDate: '',
                endDate: '',
                today: '',
                description: ''
            },
            questions: []
        }
    }

    componentDidMount() {
        const today = moment(new Date()).format('YYYY-MM-DD')
        this.setState({
            information: {
                eventName: '',
                startDate: today,
                endDate: today,
                today: today,
                description: ''
            }
        })
    }

    setEventInformation = (information) => {
        this.setState({ information: information })
    }

    setGuestQuestions = (questions) => {
        this.setState({ questions: questions })
    }

    create = async () => {

        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal(this.create)
            return
        }

        this.setState({ loading: true })
        const event = await this.props.EventStore.create({
            label: this.state.eventName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description
        })
        this.setState({ loading: false })
        event ?
            this.props.history.push(`/events/${event._id}`)
            :
            this.props.VisibilityStore.showAlert(
                'Creation failed',
                'The event could not be created',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
    }

    changePage = (page) => {
        this.setState({ page: page })
    }

    getPage = () => {
        switch (this.state.page) {
            case 1:
                return <EventInformation
                    changePage={this.changePage}
                    setEventInformation={this.setEventInformation}
                    negativeAction={this.props.negativeAction}
                    negativeLabel={this.props.negativeLabel}
                    information={this.state.information}
                    setEventInformation={this.setEventInformation}
                />
            case 2:
                return <GuestInformation
                    changePage={this.changePage}
                    setGuestQuestions={this.setGuestQuestions}
                    create={this.create}
                    questions={this.state.questions}
                />
            default:
                return <EventInformation
                    changePage={this.changePage}
                    setEventInformation={this.setEventInformation}
                    negativeAction={this.props.negativeAction}
                    negativeLabel={this.props.negativeLabel}
                    information={this.state.information}
                    setEventInformation={this.setEventInformation}
                />
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