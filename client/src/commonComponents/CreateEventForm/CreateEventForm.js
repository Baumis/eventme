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
                startTime: '',
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
                startTime: '',
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

        const startTime = this.state.information.startTime.split(":")
        let startDate = new Date(this.state.information.startDate).setHours(startTime[0], startTime[1])

        const event = await this.props.EventStore.create({
            label: this.state.information.eventName,
            startDate: startDate,
            description: this.state.information.description,
            registrationQuestions: this.state.questions
        })

        this.setState({ loading: false })

        event ?
            this.props.history.push(event.url)
            :
            this.props.VisibilityStore.showAlert(
                'Creation failed',
                'The event could not be created',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
    }

    scrollPositionByPage = (page) => {
        const parentWidth = document.getElementById("scrollableBanner").offsetWidth
        document.getElementById("scrollableBanner").scrollLeft = parentWidth * page
    }

    changePage = (page) => {
        this.setState({ page: page })
        this.scrollPositionByPage(page)
    }

    render() {
        return (
            <div className="create-event-form" id="scrollableBanner">
                <EventInformation
                    changePage={this.changePage}
                    setEventInformation={this.setEventInformation}
                    negativeAction={this.props.negativeAction}
                    negativeLabel={this.props.negativeLabel}
                    information={this.state.information}
                    setEventInformation={this.setEventInformation}
                />
                <GuestInformation
                    changePage={this.changePage}
                    setGuestQuestions={this.setGuestQuestions}
                    create={this.create}
                    questions={this.state.questions}
                />
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(CreateEventForm)))