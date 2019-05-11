import React, { Component } from 'react'
import './Guests.css'
import { FaUser } from 'react-icons/fa'

class Guests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStatus: 'going',
        }
    }

    changeActive = (status) => {
        this.setState({ activeStatus: status })
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
                    {this.props.guests.map((guest, i) => {

                        let value = this.state.activeStatus === guest.status ?
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
            </div>
        )
    }
}

export default Guests