import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import EventControlPanel from '../EventControlPanel/EventControlPanel'
import './Header.css'

class Header extends Component {

    render() {
        const headerStyles = {
            color: 'white',
            backgroundImage: 'url(' + this.props.EventStore.event.background + ')'
        }
        return (
            <div className="event-header">
                <div style={headerStyles} className="event-header-cover">
                </div>
                <EventControlPanel
                    activeTab={this.props.activeTab}
                    changeActive={this.props.changeActive}
                    isGuest={this.props.isGuest}
                />
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))