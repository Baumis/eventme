import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './CreateEventForm.css'
import moment from 'moment'
import Spinner from '../Spinner/Spinner'
import CreateInput from './CreateInput/CreateInput'
import CreateTextArea from './CreateTextArea/CreateTextArea'
import DefaultButtons from '../UniversalModal/DefaultButtons/DefaultButtons'

class CreateEventForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: '',
            startDate: '',
            endDate: '',
            today: '',
            description: '',
            loading: false
        }
    }

    componentDidMount() {
        const today = moment(new Date()).format('YYYY-MM-DD')
        this.setState({
            startDate: today,
            endDate: today,
            today: today
        })
    }

    changeStartDate = (event) => {
        this.setState({ startDate: event.target.value })
        if (moment(event.target.value).isAfter(this.state.endDate)) {
            this.setState({ endDate: event.target.value })
        }
    }

    changeEndDate = (event) => {
        this.setState({ endDate: event.target.value })
        if (moment(event.target.value).isBefore(this.state.startDate)) {
            this.setState({ startDate: event.target.value })
        } else {

        }
    }

    changeValue = (field, event) => {
        this.setState({ [field]: event.target.value })
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
            : alert('The event could not be created')
    }

    render() {
        return (
            <div className="create-event-form">
                <div className="create-event-content">
                    <CreateInput
                        label={'EVENT NAME'}
                        type={'text'}
                        value={this.state.eventName}
                        onChange={(event) => this.changeValue('eventName', event)}
                    />
                    <div className="create-event-row">
                        <div className="create-event-row-left">
                            <CreateInput
                                label={'START DATE'}
                                type={'date'}
                                min={this.state.today}
                                value={this.state.startDate}
                                onChange={(event) => this.changeStartDate(event)}
                            />
                        </div>
                        <div className="create-event-row-right">
                            <CreateInput
                                label={'END DATE'}
                                type={'date'}
                                min={this.state.today}
                                value={this.state.endDate}
                                onChange={(event) => this.changeEndDate(event)}
                            />
                        </div>
                    </div>
                    <CreateTextArea
                        label={'DESCRIPTION'}
                        value={this.state.description}
                        onChange={(event) => this.changeValue('description', event)}
                    />
                    <DefaultButtons
                        positiveLabel={'Create'}
                        negativeLabel={this.props.negativeLabel}
                        positiveAction={() => this.props.create()}
                        negativeAction={this.props.negativeAction}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(CreateEventForm)))