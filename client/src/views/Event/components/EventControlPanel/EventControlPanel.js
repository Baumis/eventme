import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventControlPanel.css'
import Tabs from '../Tabs/Tabs'
import { FaCalendar, FaCalendarDay } from 'react-icons/fa'
import moment from 'moment'
import JoinEventButton from '../JoinEventButton/JoinEventButton'

class EventControlPanel extends Component {

    getAvatar = (avatar) => {
        if (!avatar) {
            return null
        }
        return { backgroundImage: `url(${avatar})` }
    }

    render() {
        return (
            <div className="event-control-panel">
                <div className="event-control-panel-label">
                    {this.props.EventStore.event.label}
                </div>
                <div className="event-control-panel-info-row">
                    <div className="event-control-panel-info-item">
                        <div style={this.getAvatar(this.props.EventStore.event.creator.avatar)}
                            className="event-control-panel-info-avatar">
                        </div>
                        {this.props.EventStore.event.creator.name}
                    </div>
                    <div className="event-control-panel-info-item">
                        <div className="event-control-panel-info-icon">
                            <FaCalendarDay />
                        </div>
                        {moment(this.props.EventStore.event.startDate).format('DD.MM.YYYY')}
                    </div>
                    <div className="event-control-panel-info-item">
                        <div className="event-content-status-row">
                            {!this.props.isGuest() ?
                                <JoinEventButton
                                    inviteKey={this.props.inviteKey}
                                /> : null}
                        </div>
                    </div>
                </div>
                {/*this.props.EventStore.event.description.length > 0 ?
                    <div className="event-control-panel-content">
                        <div className="event-control-panel-text">
                            {this.props.EventStore.event.description}
                        </div>
                    </div>
                    : null */}
                <Tabs
                    active={this.props.activeTab}
                    changeActive={this.props.changeActive}
                />
            </div >
        )
    }

}

export default inject('EventStore')(observer(EventControlPanel))