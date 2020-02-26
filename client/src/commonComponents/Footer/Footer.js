import React from 'react'
import './Footer.css'

const Footer = (props) => {
    return (
        <div className="footer" style={{ background: props.background }}>
            <div className="footer-container">
                {'Footer'}
            </div>
        </div>
    )
}

export default Footer