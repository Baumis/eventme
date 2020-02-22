import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './Guests.css'
import { FaUserTimes, FaSignOutAlt, FaChevronRight } from 'react-icons/fa'
import GuestList from '../GuestList/GuestList'

class Guests extends Component {

    render() {
        return (
            <div className="event-guests-list">
                <GuestList 
                    guestAmount={4}
                />
                {this.props.EventStore.event.registrations.length > 4 ?
                    <div className="show-more-guests-button">
                        Show more
                        <div className="show-more-guests-button-icon">
                            <FaChevronRight />
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(Guests)))