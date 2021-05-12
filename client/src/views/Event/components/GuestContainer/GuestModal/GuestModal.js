import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './GuestModal.css'
import { } from 'react-icons/fa'
import GuestList from '../GuestList/GuestList'

class GuestModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }
    }

    changeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {

        return (
            <div className="guest-modal">
                <div className="guest-modal-top-bar">
                    <div className="guest-modal-back-button" onClick={() => this.props.toggleGuestModal()}>
                        Close
                    </div>
                </div>
                <div className="guest-modal-search">
                    <input
                        value={this.state.filter}
                        placeholder={'Filter by name'}
                        onChange={this.changeFilter}
                    />
                </div>
                <GuestList
                    filter={this.state.filter}
                />
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(GuestModal)))