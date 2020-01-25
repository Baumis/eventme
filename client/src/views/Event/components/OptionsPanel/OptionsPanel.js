import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import './OptionsPanel.css'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import moment from 'moment'
import InputBlock from './InputBlock/InputBlock'

class OptionsPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deleted: false
        }
    }

    changeBackground = (event) => {
        this.props.EventStore.setValue(event.target.value, 'background')
    }

    changeLabel = (event) => {
        this.props.EventStore.setValue(event.target.value, 'label')
    }

    changeStartDate = (event) => {

        const currentHours = new Date(this.props.EventStore.event.startDate).getHours()
        const currentMinutes = new Date(this.props.EventStore.event.startDate).getMinutes()
        const dateWithTime = new Date(event.target.value).setHours(currentHours, currentMinutes)

        this.props.EventStore.setValue(dateWithTime, 'startDate')
        if (moment(dateWithTime).isAfter(this.props.EventStore.event.endDate)) {
            this.props.EventStore.setValue(dateWithTime, 'endDate')
        }
    }

    changeEndDate = (event) => {

        const currentHours = new Date(this.props.EventStore.event.endDate).getHours()
        const currentMinutes = new Date(this.props.EventStore.event.endDate).getMinutes()
        const dateWithTime = new Date(event.target.value).setHours(currentHours, currentMinutes)

        this.props.EventStore.setValue(dateWithTime, 'endDate')
        if (moment(dateWithTime).isBefore(this.props.EventStore.event.startDate)) {
            this.props.EventStore.setValue(moment(dateWithTime), 'startDate')
        }
    }

    changeStartTime = (event) => {
        const startTime = event.target.value.split(":")
        const startDate = new Date(this.props.EventStore.event.startDate).setHours(startTime[0], startTime[1])
        this.props.EventStore.setValue(startDate, 'startDate')

        if (moment(startDate).isAfter(this.props.EventStore.event.endDate)) {
            this.props.EventStore.setValue(startDate, 'endDate')
        }
    }

    changeEndTime = (event) => {
        const endTime = event.target.value.split(":")
        const endDate = new Date(this.props.EventStore.event.endDate).setHours(endTime[0], endTime[1])
        this.props.EventStore.setValue(endDate, 'endDate')

        if (moment(endDate).isBefore(this.props.EventStore.event.startDate)) {
            this.props.EventStore.setValue(moment(endDate), 'startDate')
        }
    }

    addInfoField = () => {
        this.props.EventStore.addInfoPanelValue()
    }

    deleteInfoField = (index) => {
        this.props.EventStore.deleteInfoPanelValue(index)
    }

    changeFieldText = (event) => {
        this.props.EventStore.changeInfoPanelText(event.target.value, event.target.name)
    }

    changeIcon = (icon, index) => {
        this.props.EventStore.changeInfoPanelIcon(icon, index)
    }

    slidePanel = () => {
        this.props.VisibilityStore.slideOptionsPanel()
    }

    deleteEvent = () => {
        this.props.VisibilityStore.showAlert(
            'Confirm',
            `Do you want to delete event: "${this.props.EventStore.event.label}"?`,
            'Delete',
            () => this.deleteProcess(),
            'Cancel',
            () => this.props.VisibilityStore.closeAlert()
        )
    }

    deleteProcess = async () => {
        const response = await this.props.EventStore.deleteEvent()
        if (response) {
            this.setState({ deleted: true })
        }
        this.props.VisibilityStore.closeAlert()
    }

    render() {
        if (this.state.deleted) {
            return <Redirect to={`/profile/${this.props.UserStore.currentUser._id}`} />
        }

        return (
            <div style={{ left: this.props.VisibilityStore.optionsPanelPosition }} className="options-panel-container">
                <div className="options-panel-header">
                    <p>Event editor</p>
                    <button onClick={this.slidePanel}><FaAngleDoubleLeft /></button>
                </div>
                <div className="options-panel-canvas">
                    <div className="DeleteEventButton" onClick={() => this.deleteEvent()}>
                        {'Delete event'}
                    </div>
                    <InputBlock
                        type={'text'}
                        label={'Title'}
                        value={this.props.EventStore.event.label}
                        changeValue={this.changeLabel}
                    />
                    <InputBlock
                        type={'text'}
                        label={'Header background'}
                        value={this.props.EventStore.event.background}
                        changeValue={this.changeBackground}
                    />
                    <div className="dateBlock">
                        <InputBlock
                            type={'date'}
                            label={'Start date'}
                            value={moment(this.props.EventStore.event.startDate).format('YYYY-MM-DD')}
                            changeValue={this.changeStartDate}
                        />
                        <InputBlock
                            type={'time'}
                            label={'Start time'}
                            value={moment(this.props.EventStore.event.startDate).format('HH:mm')}
                            changeValue={this.changeStartTime}
                        />
                    </div>
                    <div className="dateBlock">
                        <InputBlock
                            type={'date'}
                            label={'End date'}
                            value={moment(this.props.EventStore.event.endDate).format('YYYY-MM-DD')}
                            changeValue={this.changeEndDate}
                        />
                        <InputBlock
                            type={'time'}
                            label={'End Time'}
                            value={moment(this.props.EventStore.event.endDate).format('HH:mm')}
                            changeValue={this.changeEndTime}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(OptionsPanel))