import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import InfoPanel from './InfoPanel.js'
import StatusBar from '../StatusBar/StatusBar'
import moment from 'moment'
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
                    <h1>{this.props.EventStore.event.label}</h1>
                    <h3>{moment(this.props.EventStore.event.startDate).format('MMM Do YY')}</h3>
                </div>
                {this.props.isGuest ?
                    <div className="event-header-status-row">
                        <StatusBar />
                    </div>
                    : null}
                <InfoPanel data={this.props.EventStore.event.infoPanel} />
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))