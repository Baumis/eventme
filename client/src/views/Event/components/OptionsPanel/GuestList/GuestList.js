import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GuestList.css'
import { FaTimes, FaUser, FaSearch } from 'react-icons/fa'

class GuestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStatus: 'GOING',
            filter: ''
        }
    }

    changeActive = (status) => {
        this.setState({ activeStatus: status })
    }

    changeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    removeGuest = (guest) => {
        const confirmation = window.confirm(`Do you want to delete user ${guest.name}?`)
        if (confirmation) {
            this.props.EventStore.removeGuest(this.props.EventStore.event._id, guest._id)
        }
    }

    render() {

        const guestsToShow = this.props.EventStore.event.guests.filter((guest) =>
            guest.status === this.state.activeStatus && guest.user.name.toLowerCase().includes(this.state.filter.toLowerCase())
        )

        return (
            <div className="GuestContainer">
                <div className="StatusButtons">
                    <div id={this.state.activeStatus === 'GOING' ? 'active' : 'normal'}
                        onClick={() => this.changeActive('GOING')}
                        className="StatusButton"
                    > Going </div>
                    <div id={this.state.activeStatus === 'PENDING' ? 'active' : 'normal'}
                        onClick={() => this.changeActive('PENDING')}
                        className="StatusButton"
                    > Pending </div>
                    <div id={this.state.activeStatus === 'DECLINED' ? 'active' : 'normal'}
                        onClick={() => this.changeActive('DECLINED')}
                        className="StatusButton"
                    > Declined</div>
                </div>
                <div className="GuestContent">
                    <div className="GuestList" style={{ background: this.props.background, color: this.props.color }}>
                        {guestsToShow.map((guest, i) => {
                            return (
                                <div className="Guest" key={i}>
                                    <a href={`/profile/${guest.user._id}`}>
                                        <div className="GuestUser"><FaUser /></div>
                                        <div className="GuestName">{guest.user.name}</div>
                                    </a>
                                    <div className="GuestDelete" onClick={() => this.removeGuest(guest.user)}><FaTimes /></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="GuestOptionsSearch">
                        <div className="GuestOptionsSearchField">
                            <input value={this.state.filter} onChange={this.changeFilter}></input>
                            <div id="OptionsSearchIcon"><FaSearch /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(GuestList))