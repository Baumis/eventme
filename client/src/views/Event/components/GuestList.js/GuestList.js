import React, { Component } from 'react'
import './GuestList.css'
import { FaTimes, FaUser, FaSearch } from 'react-icons/fa'

class GuestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            <div className="GuestContainer">
                <div className="StatusButtons">
                    <div id={this.state.activeStatus === 'going' ? 'active' : 'normal'}
                        onClick={() => this.changeActive('going')}
                        className="StatusButton"
                    >
                        Going
                    </div>
                    <div id={this.state.activeStatus === 'pending' ? 'active' : 'normal'}
                        onClick={() => this.changeActive('pending')}
                        className="StatusButton"
                    >
                        Pending
                    </div>
                    <div id={this.state.activeStatus === 'declined' ? 'active' : 'normal'}
                        onClick={() => this.changeActive('declined')}
                        className="StatusButton"
                    >
                        Declined
                    </div>
                </div>
                <div className="GuestContent">
                    <div className="GuestList" style={{ background: this.props.background, color: this.props.color }}>
                        {this.props.guests.map((guest, i) => {

                            let value = this.state.activeStatus === guest.status && guest.name.toLowerCase().includes(this.state.filter.toLowerCase()) ?
                                (
                                    <div className="Guest" key={i}>
                                        <div className="GuestUser"><FaUser /></div>
                                        <div className="GuestName">{guest.name}</div>
                                        <div className="GuestDelete"><FaTimes /></div>
                                    </div>
                                )
                                : (null)
                            return value
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

export default GuestList