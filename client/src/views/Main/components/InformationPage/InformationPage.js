import React from 'react'
import './InformationPage.css'
import { FaRocket } from 'react-icons/fa'
import { GiOwl } from 'react-icons/gi'

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
                Fill out the short form to create a new event. Invite guests by sharing the link to the event page.
               </div>
        </div>
    )
}

export default InformationPage