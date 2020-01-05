import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GuestList.css'
import { FaTimes } from 'react-icons/fa'

class Guests extends Component {

    getAvatar = (avatar) => {
        if (!avatar) {
            return null
        }
        return { backgroundImage: `url(${avatar})` }
    }

    removeGuest = (guest) => {
        const confirmation = window.confirm(`Do you want to kick user ${guest.name}?`)
        if (confirmation) {
            this.props.EventStore.removeGuest(this.props.EventStore.event._id, guest._id)
        }
    }

    rightsToRemove = (guestId) => {
        if (this.props.UserStore.currentUser) {
            if (this.props.EventStore.event.creator._id !== guestId
                && this.props.EventStore.event.creator._id === this.props.UserStore.currentUser._id) {
                return true
            }
            return false
        }

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

    render() {
        return (
            <div className="event-guests-list">
                {this.props.EventStore.event.registrations.map((guest, i) =>
                    <div className="event-guests-guest-row" key={i}>
                        <div className="event-guests-guest-wrapper" onClick={() => this.toProfile(guest.user._id)}>
                            <div style={this.getAvatar(guest.user.avatar)} className="event-guests-guest-avatar"> </div>
                            <div className={this.getUserClass(guest.user._id)}>{guest.user.name}</div>
                        </div>
                        <div className="event-guests-right-column">
                            {this.rightsToRemove(guest.user._id) ?
                                <div className="event-guests-guest-remove" onClick={() => this.removeGuest(guest.user)}><FaTimes /></div>
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

export default inject('EventStore', 'UserStore')(observer(Guests))