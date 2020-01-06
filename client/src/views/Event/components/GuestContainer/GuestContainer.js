import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GuestContainer.css'
import GuestList from './Guests/GuestList'

class GuestContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: 'ALL'
        }
    }

    changeFilter = (status) => {
        this.setState({ filter: status })
    }

    render() {
        return (
            <div className="guests-content">
                <div className="guest-title">
                    Guests
                    <span>{` (${this.props.EventStore.event.registrations.length})`}</span>
                </div>
                <GuestList
                    isCreator={this.props.isCreator()}
                    filter={this.state.filter}
                />
            </div>
        )
    }
}

export default inject('EventStore')(observer(GuestContainer))