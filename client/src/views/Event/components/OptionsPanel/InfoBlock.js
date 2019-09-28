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
                EMPTY: null
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

    identifyIcon = (icon) => {
        const Match = this.state.icons[icon]
        return Match ? <Match /> : 'none'
    }

    render() {
        const Icon = this.state.icons[this.props.icon]
        return (
            <div className="options-panel-info-block">
                <div className="options-panel-info-input-row">
                    {this.state.displayMenu ?
                        <div className="options-panel-icon-menu">
                            {Object.keys(this.state.icons).map(iconName =>
                                <div key={iconName} className="options-panel-icon-menu-item" onClick={() => this.props.changeIcon(iconName, this.props.index)}>
                                    {this.identifyIcon(iconName)}
                                </div>
                            )}
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
                </div>
                <div className="options-panel-info-delete" onClick={this.props.deleteInfoField}>
                    <FaTimes />
                </div>
            </div>
        )
    }
}
export default InfoBlock