import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventControlPanel.css'
import Tabs from '../Tabs/Tabs'
import { FaRegCalendarAlt, FaRegClock, FaRegUser } from 'react-icons/fa'
import moment from 'moment'
import JoinEventButton from '../JoinEventButton/JoinEventButton'

class EventControlPanel extends Component {

    getAvatar = (avatar) => {
        if (!avatar) {
            return null
        }
        return { backgroundImage: `url(${avatar})` }
    }

    renderJoinInviteStatus = () => {
        const creator = this.props.isCreator()
        const guest = this.props.isGuest()
        const full = this.props.EventStore.event.registrations.length >= this.props.EventStore.event.registrationLimit

        if (creator) {
            return (
                <div className="event-control-panel-info-item-invite" onClick={() => this.props.toggleInviteLink()}>
                    Invite
                </div>
            )
        } else if (!guest && !full) {
            return (
                <div className="event-control-panel-info-item">
                    <JoinEventButton
                        toggleRegisterModal={this.props.toggleRegisterModal}
                    />
                </div>
            )
        } else if (!guest && full) {
            return (
                <div className="event-control-panel-info-item">
                    <div className="event-control-panel-info-item-label">
                        Status
                    </div>
                    Event full
                </div>
            )
        } else if (guest) {
            return (
                <div className="event-control-panel-info-item">
                    <div className="event-control-panel-info-item-label">
                        Status
                    </div>
                    Joined
                </div>
            )
        }
    }

    render() {
        return (
            <div className="event-control-panel">
                <div className="event-control-panel-title-row">
                    <div className="event-control-panel-label">
                        {this.props.EventStore.event.label}
                    </div>
                    <div className="event-control-panel-host">
                        {`by ${this.props.EventStore.event.creator.name}`}
                    </div>
                </div>
                <div className="event-control-panel-info-row">
                    <div className="event-control-panel-info-item">
                        <div className="event-control-panel-info-item-label">
                            <div className="event-control-panel-info-icon">
                                <FaRegCalendarAlt />
                            </div>
                            When?
                        </div>
                        <div className="event-control-panel-info-item-content">
                            {`${moment(this.props.EventStore.event.startDate).format('D MMMM YYYY')} ${moment(this.props.EventStore.event.startDate).format('LT')}`}
                        </div>
                    </div>
                    {this.renderJoinInviteStatus()}
                </div>
                <Tabs
                    active={this.props.activeTab}
                    changeActive={this.props.changeActive}
                />
            </div >
        )
    }

}

export default inject('EventStore')(observer(EventControlPanel))