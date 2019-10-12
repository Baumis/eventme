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

    filterGuests = () => {
        let guests = this.props.EventStore.event.guests
        if (this.props.filter !== 'ALL') {
            guests = this.props.EventStore.event.guests.filter((guest) =>
                guest.status === this.props.filter
            )
        }
        return guests.sort(this.sorter)
    }

    styleStatus = (status) => {
        const color = status === 'GOING' ? 'rgba(46, 184, 46, 1)'
            : status === 'PENDING' ? 'orange'
                : status === 'DECLINED' ? 'red'
                    : 'black'
        status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        return <div style={{ color: color }}>{status}</div>
    }

    sorter = (guestA, guestB) => {
        if (guestA.status === guestB.status) {
            return guestA.user.name > guestB.user.name ? 1 : -1
        }
        if (guestA.status === 'GOING') {
            return -1
        }
        if (guestA.status === 'PENDING' && guestB.status === 'DECLINED') {
            return -1
        }
        return 1
    }

    render() {
        return (
            <div className="event-guests-list">
                {this.filterGuests().map((guest, i) =>
                    <div className="event-guests-guest-row" key={i}>
                        <a href={`/profile/${guest.user._id}`}>
                            <div style={this.getAvatar(guest.user.avatar)} className="event-guests-guest-avatar"> </div>
                            <div className="event-guests-guest-name">{guest.user.name}</div>
                        </a>
                        <div className="event-guests-right-column">
                            <div className="event-guests-guest-status">
                                {this.styleStatus(guest.status)}
                            </div>
                            {this.rightsToRemove(guest.user._id) ?
                                <div className="event-guests-guest-remove" onClick={() => this.removeGuest(guest.user)}><FaTimes /></div>
                                :
                                null
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Guests))