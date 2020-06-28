import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './GeneralInformation.css'
import moment from 'moment'
import CreateInput from '../../../../commonComponents/CreateEventForm/CreateInput/CreateInput'
import CreateTextArea from '../../../../commonComponents/CreateEventForm/CreateTextArea/CreateTextArea'

class GeneralInformation extends Component {

    changeStartDate = (event) => {
        const informationCopy = { ...this.props.information }
        informationCopy.startDate = event.target.value
        if (moment(event.target.value).isAfter(informationCopy.endDate)) {
            informationCopy.endDate = event.target.value
        }
        this.props.setEventInformation(informationCopy)
    }

    changeStartTime = (event) => {
        const informationCopy = { ...this.props.information }
        informationCopy.startTime = event.target.value
        this.props.setEventInformation(informationCopy)
    }

    changeValue = (field, event) => {
        const informationCopy = { ...this.props.information }
        informationCopy[field] = event.target.value
        this.props.setEventInformation(informationCopy)
    }

    render() {
        return (
            <div className="event-information">
                <CreateInput
                    label={'Event name'}
                    type={'text'}
                    value={this.props.information.eventName}
                    onChange={(event) => this.changeValue('eventName', event)}
                />
                <div className="event-information-row">
                    <div className="event-information-row-left">
                        <CreateInput
                            label={'Start date'}
                            type={'date'}
                            min={this.props.information.today}
                            value={this.props.information.startDate}
                            onChange={(event) => this.changeStartDate(event)}
                        />
                    </div>
                    <div className="event-information-row-right">
                        <CreateInput
                            label={'Start time'}
                            type={'time'}
                            min={this.props.information.today}
                            value={this.props.information.startTime}
                            onChange={(event) => this.changeStartTime(event)}
                        />
                    </div>
                </div>
                <CreateTextArea
                    label={'Description'}
                    value={this.props.information.description}
                    onChange={(event) => this.changeValue('description', event)}
                />
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(GeneralInformation)))