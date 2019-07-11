import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import InfoPanel from './InfoPanel.js'
import './Header.css'

class Header extends Component {

    render() {
        const headerStyles = {
            color: 'white',
            backgroundImage: 'url(' + this.props.EventStore.event.background + ')'
        }
        return (
            <div style={headerStyles} className="Header-container">
                <h1>{this.props.EventStore.event.label}</h1>
                <InfoPanel data={this.props.EventStore.event.infoPanel} />
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))