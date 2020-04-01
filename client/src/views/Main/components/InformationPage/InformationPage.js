import React from 'react'
import './InformationPage.css'
import { FaEnvelope, FaCalendarAlt, FaUserFriends } from 'react-icons/fa'

const InformationPage = (props) => {

    return (
        <div className="information-page">
            <div className="information-page-icon-row">
                <div className="information-page-icon">
                    <FaEnvelope />
                </div>
                <div className="information-page-icon">
                    <FaUserFriends />
                </div>
                <div className="information-page-icon">
                    <FaCalendarAlt />
                </div>
            </div>
            <div className="information-page-title">
                Create events fast.
               </div>
            <div className="information-page-paragraph">
                Fill out the short form to create a new event. Invite guests by sharing the link to the event page.
               </div>
        </div>
    )
}

export default InformationPage