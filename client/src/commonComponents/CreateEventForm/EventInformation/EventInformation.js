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
        const informationCopy = {... this.props.information}
        informationCopy.startDate = event.target.value
        if (moment(event.target.value).isAfter(informationCopy.endDate)) {
            informationCopy.endDate = event.target.value
        }
        this.props.setEventInformation(informationCopy)
    }

    changeEndDate = (event) => {
        const informationCopy = {... this.props.information}
        informationCopy.endDate = event.target.value
        if (moment(event.target.value).isBefore(informationCopy.startDate)) {
            informationCopy.startDate = event.target.value
        }
        this.props.setEventInformation(informationCopy)
    }

    changeValue = (field, event) => {
        const informationCopy = {... this.props.information}
        informationCopy[field] = event.target.value
        this.props.setEventInformation(informationCopy)
    }

    render() {
        return (
            <div className="event-information">
                <CreateInput
                    label={'EVENT NAME'}
                    type={'text'}
                    value={this.props.information.eventName}
                    onChange={(event) => this.changeValue('eventName', event)}
                />
                <div className="event-information-row">
                    <div className="event-information-row-left">
                        <CreateInput
                            label={'START DATE'}
                            type={'date'}
                            min={this.props.information.today}
                            value={this.props.information.startDate}
                            onChange={(event) => this.changeStartDate(event)}
                        />
                    </div>
                    <div className="event-information-row-right">
                        <CreateInput
                            label={'END DATE'}
                            type={'date'}
                            min={this.props.information.today}
                            value={this.props.information.endDate}
                            onChange={(event) => this.changeEndDate(event)}
                        />
                    </div>
                </div>
                <CreateTextArea
                    label={'DESCRIPTION'}
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