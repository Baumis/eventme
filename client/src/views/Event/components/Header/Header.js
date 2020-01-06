import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import EventControlPanel from '../EventControlPanel/EventControlPanel'
import OptionsButton from '../OptionsButton/OptionsButton'
import './Header.css'

class Header extends Component {

    render() {
        const headerStyles = {
            color: 'white',
            backgroundImage: 'url(' + this.props.EventStore.event.background + ')'
        }
        return (
            <div className="event-header">
                {this.props.isCreator() ?
                    <OptionsButton
                        showPanel={this.props.togglePanel}
                    />
                    : null}
                <div style={headerStyles} className="event-header-cover">
                </div>
                <EventControlPanel
                    activeTab={this.props.activeTab}
                    changeActive={this.props.changeActive}
                    isGuest={this.props.isGuest}
                    toggleRegisterModal={this.props.toggleRegisterModal}
                />
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))