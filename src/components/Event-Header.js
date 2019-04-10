import React from 'react'
import '../styles/HeaderStyles.css'

const Header = (props) => {

    const headerStyles = {
        color: props.headerData.color,
        backgroundImage: 'url(' + props.headerData.url + ')'
    };

    return (
        <div style={headerStyles} className="Header-container">
            <h1>{props.headerData.h1}</h1>
            <h2>{props.headerData.h2}</h2>
        </div>
    )
}

export default Header