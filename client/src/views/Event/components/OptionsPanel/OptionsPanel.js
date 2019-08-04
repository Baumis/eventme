import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import './Options.css'
import { FaAngleDoubleLeft, FaPlusCircle } from 'react-icons/fa'
import InputBlock from './InputBlock'
import InfoBlock from './InfoBlock'
import GuestList from './GuestList/GuestList'

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

    addInfoField = () => {
        this.props.EventStore.addInfoPanelValue()
    }

    deleteInfoField = (index) => {
        this.props.EventStore.deleteInfoPanelValue(index)
    }

    changeFieldText = (event) => {
        this.props.EventStore.changeInfoPanelText(event.target.value, event.target.name)
    }

    slidePanel = () => {
        this.props.VisibilityStore.slideOptionsPanel()
    }

    deleteEvent = async () => {
        const confirmation = window.confirm(`Do you want to delete this event?`)
        if (confirmation) {
            const response = await this.props.EventStore.deleteEvent()
            if (response) {
                this.setState({ deleted: true })
            }
        }
    }

    render() {

        if (this.state.deleted) {
            return <Redirect to={`/profile/${this.props.UserStore.currentUser._id}`} />
        }

        return (
            <div style={{ left: this.props.VisibilityStore.optionsPanelPosition }} className="options-panel-container">
                <div className="options-panel-header">
                    <p>Options</p>
                    <button onClick={this.slidePanel}><FaAngleDoubleLeft /></button>
                </div>
                <div className="options-panel-canvas">
                    <div className="DeleteEventButton" onClick={() => this.deleteEvent()}>
                        {'Delete event'}
                    </div>
                    <div className="options-panel-content">
                        <InputBlock
                            label={'Header'}
                            value={this.props.EventStore.event.label}
                            changeValue={this.changeLabel}
                        />
                    </div>
                    <div className="options-panel-content">
                        <InputBlock
                            label={'Header background url'}
                            value={this.props.EventStore.event.background}
                            changeValue={this.changeBackground}
                        />
                    </div>
                    <div className="options-panel-section-devider">
                        <label>Info panel</label>
                    </div>
                    <div className="options-panel-content">
                        {this.props.EventStore.event.infoPanel.map( (info, i) =>
                            <InfoBlock
                                label={'Example'}
                                index={i}
                                key={i}
                                value={info.text}
                                changeValue={this.changeFieldText}
                                deleteInfoField={() => this.deleteInfoField(i)}
                            />
                        )}
                    </div>
                    <div className="options-panel-add-field-row">
                        <div className="options-panel-add-field-button" onClick={() => this.addInfoField()}>
                            <p>add field</p>
                            <FaPlusCircle />
                        </div>
                    </div>
                    <div className="options-panel-section-devider">
                        <label>Guests</label>
                    </div>
                    <div className="options-panel-content">
                        <div className="inputBlock">
                            <div className="inputLabel">
                                <label>{'Invite link'}</label>
                            </div>
                            <input
                                id="readOnly"
                                value={`localhost:3000/events/${this.props.EventStore.event._id}/invite/${this.props.EventStore.event.inviteKey}`}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="options-panel-content">
                        <GuestList
                            guests={this.props.EventStore.event.guests}
                            mod={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(OptionsPanel))