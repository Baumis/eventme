import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import InfoPanel from '../InfoPanel/InfoPanel.js'
import './Header.css'

class Header extends Component {

    headerStyles = {
        color: 'white',
        backgroundImage: 'url(' + this.props.EventStore.event.settings.background + ')'
    }
    render() {
        return (
            <div style={this.headerStyles} className="Header-container">
                <h1>{this.props.EventStore.event.label}</h1>
                <InfoPanel
                    showInfoBoolean={this.props.showInfoBoolean}
                    date={this.props.EventStore.event.infoPanel.date}
                    contact={this.props.EventStore.event.infoPanel.contact}
                    phone={this.props.EventStore.event.infoPanel.phone}
                    address={this.props.EventStore.event.infoPanel.address}
                />
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))