import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import InfoPanel from './InfoPanel.js'
import StatusBar from '../StatusBar/StatusBar'
import './Header.css'

class Header extends Component {

    render() {
        const headerStyles = {
            color: 'white',
            backgroundImage: 'url(' + this.props.EventStore.event.background + ')'
        }
        return (
            <div style={headerStyles} className="event-header">
                <div className="event-header-content">
                    <div className="event-header-status-row">
                        <StatusBar />
                    </div>
                    <h1>{this.props.EventStore.event.label}</h1>
                </div>
                <InfoPanel data={this.props.EventStore.event.infoPanel} />
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))