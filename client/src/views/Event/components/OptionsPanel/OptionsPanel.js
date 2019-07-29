import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import './Options.css'
import { FaAngleDoubleLeft } from 'react-icons/fa'
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

    changePhone = (event) => {
        this.props.EventStore.setInfoPanelValue(event.target.value, 'phone')
    }

    changeContact = (event) => {
        this.props.EventStore.setInfoPanelValue(event.target.value, 'contact')
    }

    changeDate = (event) => {
        this.props.EventStore.setInfoPanelValue(event.target.value, 'date')
    }

    changeAddress = (event) => {
        this.props.EventStore.setInfoPanelValue(event.target.value, 'address')
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
            <div style={{ left: this.props.VisibilityStore.optionsPanelPosition }} className="OptionsContainer">
                <div className="OptionsHeader">
                    <p>Options</p>
                    <button onClick={this.slidePanel}><FaAngleDoubleLeft /></button>
                </div>
                <div className="OptionsCanvas">
                    <div className="DeleteEventButton" onClick={() => this.deleteEvent()}>
                        {'Delete event'}
                    </div>
                    <div className="OptionsContent">
                        <InputBlock
                            label={'Header'}
                            value={this.props.EventStore.event.label}
                            changeValue={this.changeLabel}
                        />
                    </div>
                    <div className="OptionsContent">
                        <InputBlock
                            label={'Header background url'}
                            value={this.props.EventStore.event.background}
                            changeValue={this.changeBackground}
                        />
                    </div>
                    <div className="sectionDevider">
                        <label>Info panel</label>
                    </div>
                    <div className="OptionsContent">
                        <InfoBlock
                            label={'Phone'}
                            value={this.props.EventStore.event.infoPanel.phone}
                            changeValue={this.changePhone}
                        />
                        <InfoBlock
                            label={'Contact'}
                            value={this.props.EventStore.event.infoPanel.contact}
                            changeValue={this.changeContact}
                        />
                        <InfoBlock
                            label={'Date'}
                            value={this.props.EventStore.event.infoPanel.date}
                            changeValue={this.changeDate}
                        />
                        <InfoBlock
                            label={'Address'}
                            value={this.props.EventStore.event.infoPanel.address}
                            changeValue={this.changeAddress}
                        />
                    </div>
                    <div className="sectionDevider">
                        <label>Guests</label>
                    </div>
                    <div className="OptionsContent">
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
                    <div className="OptionsContent">
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