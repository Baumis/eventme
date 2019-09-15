import React, { Component } from 'react'
import './GuestContainer.css'
import Guests from '../contentTypes/Guests/Guests'

class GuestContainer extends Component {

    render() {
        return (
            <div className="discussion-content">
                <Guests isCreator={this.props.isCreator} />
            </div>
        )
    }
}

export default GuestContainer