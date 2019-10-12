import React, { Component } from 'react'
import './GuestContainer.css'
import GuestList from './Guests/GuestList'
import GuestFilter from './GuestFilter/GuestFilter'

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
                <GuestFilter 
                    currentFilter={this.state.filter}
                    changeFilter={this.changeFilter}
                />
                <GuestList
                    isCreator={this.props.isCreator()}
                    filter={this.state.filter}
                />
            </div>
        )
    }
}

export default GuestContainer