import React from 'react'
import '../styles/HeaderStyles.css'

const Header = ({ label, background }) => {

    const headerStyles = {
        color: 'white',
        backgroundImage: 'url(' + background + ')'
    }

    return (
        <div style={headerStyles} className="Header-container">
            <h1>{label}</h1>
        </div>
    )
}

export default Header