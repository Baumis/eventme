import React, { Component } from 'react'
import './Options.css'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import InputBlock from './InputBlock'
import InfoBlock from './InfoBlock'
import GuestList from '../GuestList.js/GuestList'

class OptionsPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            background: props.background,
            label: props.label,
            phone: props.infoPanel.phone,
            contact: props.infoPanel.contact,
            date: props.infoPanel.date,
            address: props.infoPanel.address
        }
    }

    changeBackground = (event) => {
        this.setState({ background: event.target.value })
        this.props.changeBackground(event)
    }

    changeLabel = (event) => {
        this.setState({ label: event.target.value })
        this.props.changeLabel(event)
    }

    changePhone = (event) => {
        this.setState({ phone: event.target.value })
        this.props.changePhone(event)
    }

    changeContact = (event) => {
        this.setState({ contact: event.target.value })
        this.props.changeContact(event)
    }

    changeDate = (event) => {
        this.setState({ date: event.target.value })
        this.props.changeDate(event)
    }

    changeAddress = (event) => {
        this.setState({ address: event.target.value })
        this.props.changeAddress(event)
    }

    render() {
        return (
            <div style={{ left: this.props.left }} className="OptionsContainer">
                <div className="OptionsHeader">
                    <p>Options</p>
                    <button onClick={this.props.slidePanel}><FaAngleDoubleLeft /></button>
                </div>
                <div className="OptionsCanvas">
                    <div className="OptionsContent">
                        <InputBlock label={'Header'} value={this.state.label} changeValue={this.changeLabel} />
                    </div>
                    <div className="OptionsContent">
                        <InputBlock label={'Header background url'} value={this.state.background} changeValue={this.changeBackground} />
                    </div>
                    <div className="sectionDevider">
                        <label>Info panel</label>
                    </div>
                    <div className="OptionsContent">
                        <InfoBlock label={'Phone'} value={this.state.phone} changeValue={this.changePhone} />
                        <InfoBlock label={'Contact'} value={this.state.contact} changeValue={this.changeContact} />
                        <InfoBlock label={'Date'} value={this.state.date} changeValue={this.changeDate} />
                        <InfoBlock label={'Address'} value={this.state.address} changeValue={this.changeAddress} />
                    </div>
                    <div className="sectionDevider">
                        <label>Guests</label>
                    </div>
                    <div className="OptionsContent">
                        <InputBlock label={'Invite link'} />
                    </div>
                    <div className="OptionsContent">
                        <GuestList
                            guests={this.props.guests}
                            mod={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default OptionsPanel