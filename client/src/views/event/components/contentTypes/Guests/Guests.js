import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Guests.css'
import { FaUser, FaSearch } from 'react-icons/fa'

class Guests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: this.props.EventStore.event.guests,
            activeStatus: 'going',
            filter: ''
        }
    }

    changeActive = (status) => {
        this.setState({ activeStatus: status })
    }

    changeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
            <div className="GuestComponent">
                <div className="ComponentStatusButtons">
                    <div id={this.state.activeStatus === 'going' ? 'TabActive' : 'normal'}
                        onClick={() => this.changeActive('going')}
                        className="ComponentStatusButton"
                    >
                        Going
                    </div>
                    <div id={this.state.activeStatus === 'pending' ? 'TabActive' : 'normal'}
                        onClick={() => this.changeActive('pending')}
                        className="ComponentStatusButton"
                    >
                        Pending
                    </div>
                    <div id={this.state.activeStatus === 'declined' ? 'TabActive' : 'normal'}
                        onClick={() => this.changeActive('declined')}
                        className="ComponentStatusButton"
                    >
                        Declined
                    </div>
                </div>
                <div
                    className="ComponentGuestList"
                    style={{ background: this.props.background, color: this.props.color }}
                >
                    {this.state.guests.map((guest, i) => {
                        let value = this.state.activeStatus === guest.status && guest.name.toLowerCase().includes(this.state.filter.toLowerCase())?
                            (
                                <div className="ComponentGuest" key={i}>
                                    <div className="ComponentGuestUser"><FaUser /></div>
                                    <div className="ComponentGuestName">{guest.name}</div>
                                </div>
                            )
                            : (null)
                        return value
                    })}
                </div>
                <div className="GuestSearch">
                    <div className="GuestSearchField">
                        <input value={this.state.filter} onChange={this.changeFilter}></input>
                        <div id="searchIcon"><FaSearch /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(Guests))