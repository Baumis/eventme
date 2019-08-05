import React, { Component } from 'react'
import './Header.css'
import { FaPhone, FaAt, FaInfo, FaCalendar, FaLocationArrow, FaClock, FaUser } from 'react-icons/fa'

class InfoPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
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

    identifyIcon = (icon) => {
        const Match = this.state.icons[icon || null]
        return Match ? <Match /> : ''
    }

    render() {
        return (
            <div className="info-panel">
                <div className="info-panel-content">
                    {this.props.data.map((info, i) =>
                        <div className="info-panel-content-field" key={i}>
                            {this.identifyIcon(info.icon) ?
                                this.identifyIcon(info.icon)
                                : null}
                            <p>{info.text}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default InfoPanel