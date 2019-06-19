import React from 'react'
import { inject, observer } from 'mobx-react'
import InfoPanel from '../InfoPanel/InfoPanel.js'
import './Header.css'

const Header = (props) => {

    const headerStyles = {
        color: 'white',
        backgroundImage: 'url(' + props.background + ')'
    }

    return (
        <div style={headerStyles} className="Header-container">
            <h1>{props.label}</h1>
            <InfoPanel
                showInfoBoolean={props.showInfoBoolean}
                date={props.date}
                contact={props.contact}
                phone={props.phone}
                address={props.address}
            />
        </div>
    )
}

export default inject('EventStore')(observer(Header))