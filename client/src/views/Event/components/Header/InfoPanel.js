import React from 'react'
import './Header.css'
import { FaPhone, FaCalendar, FaUser, FaMapMarker } from 'react-icons/fa'

const InfoPanel = ({ data }) => {

    const { phone, contact, address, date } = data
    let displayCSS = (phone === '' && contact === '' && date === '' && address === '') ? 'none' : 'flex'
    let displayPhone = (phone === '') ? 'none' : 'flex'
    let displayContact = (contact === '') ? 'none' : 'flex'
    let displayDate = (date === '') ? 'none' : 'flex'
    let displayAddress = (address === '') ? 'none' : 'flex'

    const panelStyles = { display: displayCSS }
    const phoneStyles = { display: displayPhone }
    const contactStyles = { display: displayContact }
    const dateStyles = { display: displayDate }
    const addressStyles = { display: displayAddress }

    return (
        <div style={panelStyles} className="InfoPanel">
            <div style={phoneStyles} className="InfoField">
                <FaPhone />
                <p>{phone}</p>
            </div>
            <div style={contactStyles} className="InfoField">
                <FaUser />
                <p>{contact}</p>
            </div>
            <div style={dateStyles} className="InfoField">
                <FaCalendar />
                <p>{date}</p>
            </div>
            <div style={addressStyles} className="InfoField">
                <FaMapMarker />
                <p>{address}</p>
            </div>
        </div>
    )
}

export default InfoPanel