import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './NewEventModal.css'
import moment from 'moment'
import Spinner from '../Spinner/Spinner'

class NewEventModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: '',
            startDate: '',
            endDate: '',
            today: '',
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

    changeStartdate = (event) => {
        this.setState({ startDate: event.target.value })
        if (moment(event.target.value).isAfter(this.state.endDate)) {
            this.setState({ endDate: event.target.value })
        }
    }

    changeEndDate = (event) => {
        this.setState({ endDate: event.target.value })
        if (moment(event.target.value).isBefore(this.state.startDate)) {
            this.setState({ startDate: event.target.value })
        }
    }

    changeStateValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    create = async () => {
        this.setState({ loading: true })
        const event = await this.props.EventStore.create({
            label: this.state.eventName,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        })
        this.setState({ loading: false })
        event ?
            this.props.history.push(`/events/${event._id}`)
            : alert('The event could not be created')
    }

    render() {

        return (
            <div className="event-options-modal-bg">
                <div className="event-options-surface">
                    <div className="event-options-content">
                        <div className="event-options-top">
                            <h2>New event</h2>
                        </div>
                        <div className="event-options-input">
                            <p>Event title</p>
                            <input
                                name={'eventName'}
                                onChange={this.changeStateValue}
                                value={this.state.eventName}
                                placeholder={'my event'}
                            ></input>
                        </div>
                        <div className="event-options-date-section">
                            <div className="event-options-input event-options-date-input">
                                <p>Start date</p>
                                <input
                                    name={'startDate'}
                                    type={'date'}
                                    value={this.state.startDate}
                                    onChange={this.changeStartdate}
                                    min={this.state.today}
                                ></input>
                            </div>
                            <div className="event-options-input event-options-date-input">
                                <p>End date</p>
                                <input
                                    name={'endDate'}
                                    type={'date'}
                                    value={this.state.endDate}
                                    onChange={this.changeEndDate}
                                    min={this.state.startDate}
                                ></input>
                            </div>
                        </div>
                        <div className="event-options-button-row">
                            <div onClick={() => this.props.hide()} className="event-options-button event-options-close">
                                close
                            </div>
                            <div onClick={() => this.create()} className="event-options-button">
                                {this.state.loading ?
                                    <Spinner />
                                    :
                                    <div>create</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore')(observer(NewEventModal)))