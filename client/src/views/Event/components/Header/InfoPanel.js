import React from 'react'
import './Header.css'
import { FaPhone, FaAt, FaInfo, FaCalendar, FaLocationArrow, FaClock, FaUser, FaEmptySet } from 'react-icons/fa'

const InfoPanel = ({ data }) => {

    const icons = {
        PHONE: FaPhone,
        EMAIL: FaAt,
        INFO: FaInfo,
        DATE: FaCalendar,
        LOCATION: FaLocationArrow,
        TIME: FaClock,
        CONTACT: FaUser,
    }

    const Icon = icons[data.icon || null]

    return (
        <div className="info-panel">
            <div className="info-panel-content">
                {data.map((info, i) =>
                    <div className="info-panel-content-field" key={i}>
                        {Icon ?
                            <Icon />
                            : null}
                        <p>{info.text}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InfoPanel