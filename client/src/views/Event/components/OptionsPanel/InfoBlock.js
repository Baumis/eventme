import React, { Component } from 'react'
import './Options.css'
import { FaTimes, FaPhone, FaAt, FaInfo, FaCalendar, FaLocationArrow, FaClock, FaUser } from 'react-icons/fa'

class InfoBlock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayMenu: false,
            icons: {
                PHONE: FaPhone,
                EMAIL: FaAt,
                INFO: FaInfo,
                DATE: FaCalendar,
                LOCATION: FaLocationArrow,
                TIME: FaClock,
                CONTACT: FaUser,
            }
        }
    }

    openMenu = () => {
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideMenu)
        })
    }

    hideMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideMenu)
        })
    }

    render() {
        const Icon = this.state.icons[this.props.icon || null]
        return (
            <div className="options-panel-info-block">
                {this.state.displayMenu ?
                    <div className="options-panel-icon-menu">
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('EMAIL', this.props.index)}><FaAt /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('DATE', this.props.index)}><FaCalendar /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('CONTACT', this.props.index)}><FaUser /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('INFO', this.props.index)}><FaInfo /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('LOCATION', this.props.index)}><FaLocationArrow /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('PHONE', this.props.index)}><FaPhone /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('TIME', this.props.index)}><FaClock /></div>
                        <div className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon('EMPTY', this.props.index)}> none </div>
                    </div>
                    : null
                }
                <div className="options-panel-info-icon" onClick={this.openMenu}>
                    {Icon ?
                        <Icon />
                        : '-'}
                </div>
                <input
                    name={this.props.index}
                    value={this.props.value}
                    onChange={this.props.changeValue}>
                </input>
                <div className="options-panel-info-delete" onClick={this.props.deleteInfoField}>
                    <FaTimes />
                </div>
            </div>
        )
    }
}
export default InfoBlock