import React from 'react'
import '../styles/InfoPanel.css'
import { FaPhone, FaCalendar, FaUser, FaMapMarker } from 'react-icons/fa'

const InfoPanel = (props) => {
    let showCSS = 'none'
    if (props.showInfoBoolean) {
        showCSS = 'flex'
    }
    const panelStyles = {
        display: showCSS
    }

    return (
        <div style={panelStyles} className="InfoPanel">
            <div className="InfoField">
                <FaPhone />
                <p>{props.phone}</p>
            </div>
            <div className="InfoField">
                <FaUser />
                <p>{props.contact}</p>
            </div>
            <div className="InfoField">
                <FaCalendar />
                <p>{props.date}</p>
            </div>
            <div className="InfoField">
                <FaMapMarker />
                <p>{props.address}</p>
            </div>
        </div>
    )
}

export default InfoPanel