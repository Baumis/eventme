import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewEventForm.css'
import NavBar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import Alert from '../../commonComponents/Alert/Alert'
import Footer from '../../commonComponents/Footer/Footer'
import moment from 'moment'
import GeneralInformation from './components/GeneralInformation/GeneralInformation'
import JoinQuestions from './components/JoinQuestions/JoinQuestions'

class NewEventForm extends Component {
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
        const tomorrow = moment(new Date()).add(1, "days")
        this.setState({
            information: {
                eventName: '',
                startDate: moment(tomorrow).format('YYYY-MM-DD'),
                startTime: '00:00',
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

    afterSign = () => {
        window.location.reload()
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
            this.props.history.push('/events/' + event.url)
            :
            this.props.VisibilityStore.showAlert(
                'Creation failed',
                'The event could not be created',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
    }

    render() {
        return (
            <div className="new-event-form">
                <NavBar
                    afterSign={this.afterSign}
                    staticColor={true}
                />
                <div className="new-event-form-content">
                    <div className="new-event-paper">
                        <div className="new-event-form-title">
                            {'General event information'}
                        </div>
                        <GeneralInformation
                            setEventInformation={this.setEventInformation}
                            information={this.state.information}
                        />
                        <JoinQuestions
                            setGuestQuestions={this.setGuestQuestions}
                            questions={this.state.questions}
                        />
                        <div className="new-event-form-create-button" onClick={this.create}>
                            Create event
                        </div>
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

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(NewEventForm))