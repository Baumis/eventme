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
            firstPageHeight: null,
            information: {
                eventName: '',
                startDate: '',
                startTime: '',
                today: '',
                public: false
            },
            questions: []
        }
    }

    componentDidMount() {
        const today = moment(new Date()).format('YYYY-MM-DD')
        const tomorrow = moment(new Date()).add(1, 'days')
        this.setState({
            information: {
                eventName: '',
                startDate: moment(tomorrow).format('YYYY-MM-DD'),
                startTime: '00:00',
                today: today,
                public: false
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

        const startTime = this.state.information.startTime.split(':')
        let startDate = new Date(this.state.information.startDate).setHours(startTime[0], startTime[1])

        const event = await this.props.EventStore.create({
            label: this.state.information.eventName,
            startDate: startDate,
            public: this.state.information.public,
            registrationQuestions: this.state.questions.filter(question => question.data.content.length > 0)
        })

        this.setState({ loading: false })

        event ?
            this.props.history.push('/events/' + event.url)
            :
            this.props.VisibilityStore.showAlert(
                'Creation failed',
                'The event could not be created',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
    }

    changePage = (page) => {
        const pageHeight = page === 2 ? document.getElementById('create-event-form-body').clientHeight : 'auto'
        this.setState({ page: page, firstPageHeight: pageHeight })
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
                />
        }
    }

    render() {
        return (
            <div id="create-event-form-body" className="create-event-form" style={{ minHeight: this.state.firstPageHeight }}>
                {this.getPage()}
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(CreateEventForm)))