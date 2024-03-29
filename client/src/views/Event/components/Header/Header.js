import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import EventControlPanel from '../EventControlPanel/EventControlPanel'
import OptionsButton from '../OptionsButton/OptionsButton'
import './Header.css'
import EventCoverPic from '../../../../assets/event_cover.jpg'

class Header extends Component {

    getCover = () => {
        if (!this.props.EventStore.event.background) {
            return { backgroundImage: `url(${EventCoverPic})` }
        }
        return ({
            backgroundImage: `url(${this.props.EventStore.event.background})`
        })
    }

    render() {
        return (
            <div className="event-header">
                <div className="event-header-block">
                    {this.props.isCreator() ?
                        <OptionsButton
                            showPanel={this.props.togglePanel}
                        />
                        : null}
                    <div style={this.getCover()} className="event-header-cover">
                    </div>
                    <EventControlPanel
                        activeTab={this.props.activeTab}
                        changeActive={this.props.changeActive}
                        isGuest={this.props.isGuest}
                        isCreator={this.props.isCreator}
                        toggleRegisterModal={this.props.toggleRegisterModal}
                        toggleInviteLink={this.props.toggleInviteLink}
                    />
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))