import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './GuestList.css'
import { FaUserTimes, FaSignOutAlt, FaChevronRight } from 'react-icons/fa'

class GuestList extends Component {

    getAvatar = (avatar) => {
        if (!avatar) {
            return { backgroundImage: `url(${require('../../../../../assets/avatar.png')})` }
        }
        return { backgroundImage: `url(${avatar})` }
    }

    removeRegistration = (guest) => {
        this.props.VisibilityStore.showAlert(
            'Confirm',
            `Do you want to remove ${guest.user.name} from the guestlist?`,
            'Remove',
            () => this.removeProcess(guest._id),
            'Cancel',
            () => this.props.VisibilityStore.closeAlert()
        )
    }

    removeProcess = (id) => {
        this.props.EventStore.removeGuest(id)
        this.props.VisibilityStore.closeAlert()
    }

    rightsToRemove = (guestId) => {
        if (this.props.UserStore.currentUser) {
            if (this.props.EventStore.event.creator._id !== guestId
                && this.props.EventStore.event.creator._id === this.props.UserStore.currentUser._id) {
                return true
            }
        }
        return false
    }

    toProfile = (id) => {
        if (!id) {
            return
        }
        this.props.history.push(`/profile/${id}`)
    }

    getUserClass = (id) => {
        return !id ? 'ghost-user ' : 'event-guests-guest-name'
    }

    getAmountOfGuests = () => {
        if (!this.props.guestAmount) {
            return this.props.EventStore.event.registrations
        }

        return this.props.EventStore.event.registrations.length > this.props.guestAmount ?
            this.props.EventStore.event.registrations.slice(0, this.props.guestAmount)
            :
            this.props.EventStore.event.registrations
    }

    filteredGuests = (guestList) => {
        if (!this.props.filter) {
            return guestList
        }

        return guestList.filter((guest) =>
            guest.user.name.toLowerCase().includes(this.props.filter.toLowerCase())
        )
    }

    render() {
        const registrationsToShow = this.filteredGuests(this.getAmountOfGuests())
        return (
            <div className="event-guests-list">
                {registrationsToShow.map((guest, i) =>
                    <div className="event-guests-guest-row" key={i}>
                        <div className="event-guests-guest-wrapper" onClick={() => this.toProfile(guest.user._id)}>
                            <div style={this.getAvatar(guest.user.avatar)} className="event-guests-guest-avatar"> </div>
                            <div className={this.getUserClass(guest.user._id)}>{guest.user.name}</div>
                        </div>
                        <div className="event-guests-right-column">
                            {this.rightsToRemove(guest.user._id) ?
                                <div className="event-guests-guest-remove" onClick={() => this.removeRegistration(guest)}>
                                    {this.props.UserStore.currentUser._id !== guest.user._id ?
                                        <div className="event-guests-guest-remove-label">
                                            <div className="event-guests-guest-remove-icon">
                                                <FaUserTimes />
                                            </div>
                                        </div>
                                        :
                                        <div className="event-guests-guest-remove-label">
                                            <div className="event-guests-guest-remove-icon">
                                                <FaSignOutAlt />
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <div className="event-guests-guest-remove-disabled"></div>
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(GuestList)))