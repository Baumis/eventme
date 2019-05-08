import React, { Component } from 'react'
import './Options.css'
import { FaBars } from 'react-icons/fa'
import InputBlock from './InputBlock'
import InfoBlock from './InfoBlock'

class OptionsPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            left: 0,
            background: props.background,
            label: props.label,
            slug: props.slug,
            phone: props.infoPanel.phone,
            contact: props.infoPanel.contact,
            date: props.infoPanel.date,
            address: props.infoPanel.address
        }
    }

    slidePanel = () => {
        if (this.state.display) {
            this.setState({ display: false, left: '-300px' })
        } else {
            this.setState({ display: true, left: '0px' })
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

    changeSlug = (event) => {
        this.setState({ slug: event.target.value })
        this.props.changeSlug(event)
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
            <div style={{ left: this.state.left }} className="OptionsContainer">
                <div className="OptionsHeader">
                    <p>Options</p>
                    <button onClick={this.slidePanel}><FaBars /></button>
                </div>
                <div className="OptionsContent">
                    <InputBlock label={'Slug'} value={this.state.slug} changeValue={this.changeSlug} />
                </div>
                <div className="OptionsContent">
                    <InputBlock label={'Header'} value={this.state.label} changeValue={this.changeLabel} />
                </div>
                <div className="OptionsContent">
                    <InputBlock label={'Header background'} value={this.state.background} changeValue={this.changeBackground} />
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
            </div>
        )
    }
}

export default OptionsPanel