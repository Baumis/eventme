import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Options.css'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import InputBlock from './InputBlock'
import InfoBlock from './InfoBlock'
import GuestList from '../GuestList/GuestList'

class OptionsPanel extends Component {

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

    render() {
        return (
            <div style={{ left: this.props.VisibilityStore.optionsPanelPosition }} className="OptionsContainer">
                <div className="OptionsHeader">
                    <p>Options</p>
                    <button onClick={this.slidePanel}><FaAngleDoubleLeft /></button>
                </div>
                <div className="OptionsCanvas">
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
                        <InputBlock label={'Invite link'} />
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

export default inject('EventStore', 'VisibilityStore')(observer(OptionsPanel))