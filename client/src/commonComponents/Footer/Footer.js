import React from 'react'
import './Footer.css'
import { FaEnvelope } from 'react-icons/fa'

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-item">
                    <div className="footer-item-icon">
                        <FaEnvelope />
                    </div>
                    support@inviteowl.com
                </div>
                <div className="footer-item">
                    Privacy Policy
                </div>
            </div>
        </div>
    )
}

export default Footer