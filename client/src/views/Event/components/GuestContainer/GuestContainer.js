import React, { Component } from 'react'
import './GuestContainer.css'
import GuestList from './Guests/GuestList'

class GuestContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: 'ALL'
        }
    }

    changeActive = (status) => {
        this.setState({ filter: status })
    }

    render() {
        return (
            <div className="guests-content">
                <GuestList
                    isCreator={this.props.isCreator()}
                    filter={this.state.filter}
                />
            </div>
        )
    }
}

export default GuestContainer