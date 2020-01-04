import React from 'react'
import './InformationPage.css'
import { FaRocket } from 'react-icons/fa'

const InformationPage = (props) => {

    return (
        <div className="information-page">
            <div className="information-page-icon">
                <FaRocket />
            </div>
            <div className="information-page-title">
                Create events fast.
               </div>
            <div className="information-page-paragraph">
                Fill out this short form to create a new event. Invite guests by sharing a link to the event.
               </div>
        </div>
    )
}

export default InformationPage