import React from 'react'
import '../styles/InfoPanel.css'
import { FaPhone, FaCalendar, FaUser, FaMapMarker } from 'react-icons/fa'

const InfoPanel = (props) => {
    let displayCSS = (props.phone === '' && props.contact === '' && props.date === '' && props.address === '') ? 'none' : 'flex'
    let displayPhone = (props.phone === '') ? 'none' : 'flex'
    let displayContact = (props.contact === '') ? 'none' : 'flex'
    let displayDate = (props.date === '') ? 'none' : 'flex'
    let displayAddress = (props.address === '') ? 'none' : 'flex'

    const panelStyles = { display: displayCSS }
    const phoneStyles = { display: displayPhone }
    const contactStyles = { display: displayContact }
    const dateStyles = { display: displayDate }
    const addressStyles = { display: displayAddress }

    return (
        <div style={panelStyles} className="InfoPanel">
            <div style={phoneStyles} className="InfoField">
                <FaPhone />
                <p>{props.phone}</p>
            </div>
            <div style={contactStyles} className="InfoField">
                <FaUser />
                <p>{props.contact}</p>
            </div>
            <div style={dateStyles} className="InfoField">
                <FaCalendar />
                <p>{props.date}</p>
            </div>
            <div style={addressStyles} className="InfoField">
                <FaMapMarker />
                <p>{props.address}</p>
            </div>
        </div>
    )
}

export default InfoPanel