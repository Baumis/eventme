import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Guests.css'
import { FaUser, FaSearch } from 'react-icons/fa'

class Guests extends Component {
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

    render() {

        const guestsToShow = this.props.EventStore.event.guests.filter((guest) =>
            guest.status === this.state.activeStatus && guest.user.name.toLowerCase().includes(this.state.filter.toLowerCase())
        )

        return (
            <div className="GuestComponent">
                <div className="ComponentStatusButtons">
                    <div id={this.state.activeStatus === 'GOING' ? 'TabActive' : 'normal'}
                        onClick={() => this.changeActive('GOING')}
                        className="ComponentStatusButton"
                    > Going </div>
                    <div id={this.state.activeStatus === 'PENDING' ? 'TabActive' : 'normal'}
                        onClick={() => this.changeActive('PENDING')}
                        className="ComponentStatusButton"
                    > Pending </div>
                    <div id={this.state.activeStatus === 'DECLINED' ? 'TabActive' : 'normal'}
                        onClick={() => this.changeActive('DECLINED')}
                        className="ComponentStatusButton"
                    > Declined </div>
                </div>
                <div className="ComponentGuestList">
                    {guestsToShow.map((guest, i) =>
                        <div className="ComponentGuest" key={i}>
                            <div className="ComponentGuestUser"><FaUser /></div>
                            <div className="ComponentGuestName">{guest.user.name}</div>
                        </div>
                    )}
                </div>
                <div className="GuestSearchField">
                    <input value={this.state.filter} onChange={this.changeFilter}></input>
                    <div id="searchIcon"><FaSearch /></div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(Guests))