import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './EventInformation.css'
import moment from 'moment'
import CreateInput from '../CreateInput/CreateInput'
import CreateTextArea from '../CreateTextArea/CreateTextArea'
import DefaultButtons from '../../UniversalModal/DefaultButtons/DefaultButtons'

class EventInformation extends Component {

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
                <div className="event-information-button-row">
                    <div className="event-information-status">
                        {`1/2`}
                    </div>
                    <DefaultButtons
                        positiveLabel={'Next'}
                        negativeLabel={this.props.negativeLabel}
                        positiveAction={() => this.props.changePage(2)}
                        negativeAction={this.props.negativeAction}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(EventInformation)))