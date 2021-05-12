import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import './OptionsPanel.css'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import moment from 'moment'
import InputBlock from './InputBlock/InputBlock'
import TogglerBlock from './TogglerBlock/TogglerBlock'
import Spinner from '../../../../commonComponents/Spinner/Spinner'

class OptionsPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            deleted: false,
            uploading: false
        }
    }

    setFile = async (event) => {
        if (this.state.uploading) {
            return
        }

        this.setState({ uploading: true })
        const picture = await this.props.EventStore.uploadEventBackground(event.target.files[0])
        this.setState({ uploading: false })

        if (!picture) {
            this.props.VisibilityStore.showAlert(
                'Fail',
                'Uploading photo failed',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
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

    changeStartTime = (event) => {
        const startTime = event.target.value.split(':')
        const startDate = new Date(this.props.EventStore.event.startDate).setHours(startTime[0], startTime[1])
        this.props.EventStore.setValue(startDate, 'startDate')
    }

    togglePublic = () => {
        const newValue = !this.props.EventStore.event.public
        this.props.EventStore.setValue(newValue, 'public')
    }

    togglePublicAnswers = () => {
        const newValue = !this.props.EventStore.event.publicAnswers
        this.props.EventStore.setValue(newValue, 'publicAnswers')
    }

    toggleAllowAlias = () => {
        const newValue = !this.props.EventStore.event.allowAlias
        this.props.EventStore.setValue(newValue, 'allowAlias')
    }

    changeRegistrationLimit = (event) => {
        let value = event.target.value

        if (event.target.value === '') {
            value = ''
        } else if (event.target.value < 1) {
            value = 1
        } else if (event.target.value > 10000) {
            value = 10000
        }

        this.props.EventStore.setValue(value, 'registrationLimit')
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
                    <TogglerBlock
                        label={'Public event'}
                        info={'Can be searched and found on profiles.'}
                        value={this.props.EventStore.event.public}
                        changeValue={this.togglePublic}
                    />
                    <InputBlock
                        type={'text'}
                        label={'Title'}
                        value={this.props.EventStore.event.label}
                        changeValue={this.changeLabel}
                    />
                    <InputBlock
                        type={'text'}
                        label={'Cover picture'}
                        value={this.props.EventStore.event.background}
                        changeValue={this.changeBackground}
                    />
                    <label htmlFor="upload" className="options-panel-upload">
                        {this.state.uploading ?
                            <Spinner />
                            :
                            <div>Browse</div>
                        }
                    </label>
                    <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        onChange={this.setFile}
                    />
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
                    <TogglerBlock
                        label={'Public answers'}
                        info={'Answers can be read by everyone.'}
                        value={this.props.EventStore.event.publicAnswers}
                        changeValue={this.togglePublicAnswers}
                    />
                    <TogglerBlock
                        label={'Require account'}
                        info={'Only allow users with accounts to join event.'}
                        value={!this.props.EventStore.event.allowAlias}
                        changeValue={this.toggleAllowAlias}
                    />
                    <InputBlock
                        type={'number'}
                        label={'Guest limit'}
                        min={0}
                        max={10000}
                        value={this.props.EventStore.event.registrationLimit}
                        changeValue={this.changeRegistrationLimit}
                    />
                </div>
            </div>
        )
    }
}
export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(OptionsPanel))