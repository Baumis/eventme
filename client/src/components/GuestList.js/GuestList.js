import React, { Component } from 'react'
import './GuestList.css'
import { FaTimes, FaUser } from 'react-icons/fa'

class GuestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStatus: 'going',
            modificationEnabled: props.mod
        }
    }

    changeActive = (status) => {
        this.setState({ activeStatus: status })
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
                <div
                    className="GuestList"
                    style={{ background: this.props.background, color: this.props.color }}
                >
                    {this.props.guests.map((guest, i) => {

                        let value = this.state.activeStatus === guest.status ?
                            (
                                <div className="Guest" key={i}>
                                    <div className="GuestUser"><FaUser /></div>
                                    <div className="GuestName">{guest.name}</div>
                                    {this.state.modificationEnabled ?
                                        <div className="GuestDelete"><FaTimes /></div>
                                        : null
                                    }
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

export default GuestList