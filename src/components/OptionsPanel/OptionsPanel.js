import React, { Component } from 'react'
import './Options.css'
import { FaBars } from 'react-icons/fa'

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
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Slug</label>
                        </div>
                        <input value={this.state.slug} onChange={this.changeSlug}></input>
                    </div>
                </div>
                <div className="OptionsContent">
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Header</label>
                        </div>
                        <input value={this.state.label} onChange={this.changeLabel}></input>
                    </div>
                </div>
                <div className="OptionsContent">
                    <div className="inputBlock">
                        <div className="inputLabel">
                            <label>Header background</label>
                        </div>
                        <input value={this.state.background} onChange={this.changeBackground}></input>
                    </div>
                </div>
                <div className="OptionsContent">
                    <div className="toggleBlock">
                        <div className="sectionDevider">
                            <label>Info panel</label>
                        </div>
                        <div className="infoBlock">
                            <label>Phone</label>
                            <input value={this.state.phone} onChange={this.changePhone}></input>
                        </div>
                        <div className="infoBlock">
                            <label>Contatct</label>
                            <input value={this.state.contact} onChange={this.changeContact}></input>
                        </div>
                        <div className="infoBlock">
                            <label>Date</label>
                            <input value={this.state.date} onChange={this.changeDate}></input>
                        </div>
                        <div className="infoBlock">
                            <label>Address</label>
                            <input value={this.state.address} onChange={this.changeAddress}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OptionsPanel