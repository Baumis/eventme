import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventControlPanel.css'
import Tabs from '../Tabs/Tabs'
import { FaCalendarDay, FaRegClock, FaUser } from 'react-icons/fa'
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
                        <div className="event-control-panel-info-item-label">
                            <div className="event-control-panel-info-icon">
                                <FaUser />
                            </div>
                            Host
                        </div>
                        <div className="event-control-panel-info-item-content">
                            {this.props.EventStore.event.creator.name}
                        </div>
                    </div>
                    <div className="event-control-panel-info-item">
                        <div className="event-control-panel-info-item-label">
                            <div className="event-control-panel-info-icon">
                                <FaCalendarDay />
                            </div>
                            Date
                        </div>
                        <div className="event-control-panel-info-item-content">
                            {moment(this.props.EventStore.event.startDate).format('D MMMM YYYY')}
                        </div>
                    </div>
                    <div className="event-control-panel-info-item">
                        <div className="event-control-panel-info-item-label">
                            <div className="event-control-panel-info-icon">
                                <FaRegClock />
                            </div>
                            Time
                        </div>
                        <div className="event-control-panel-info-item-content">
                            {moment(this.props.EventStore.event.startDate).format('LT')}
                        </div>
                    </div>
                    {!this.props.isGuest() ?
                        <div className="event-control-panel-info-item">
                            <JoinEventButton
                                toggleRegisterModal={this.props.toggleRegisterModal}
                            />
                        </div>
                        :
                        <div className="event-control-panel-info-item">
                            <div className="event-control-panel-info-item-label">
                                Status
                            </div>
                            Joined
                        </div>
                    }
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