import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GuestContainer.css'
import Guests from './Guests/Guests'
import RegistrationResults from './RegisterResults/RegisterResults'

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
                <div className="guests-columns">
                    <div className="guests-columns-left">
                        <div className="guest-title">
                            Guests
                            <span>{` (${this.props.EventStore.event.registrations.length})`}</span>
                        </div>
                        <Guests
                            isCreator={this.props.isCreator()}
                            toggleGuestModal={this.props.toggleGuestModal}
                        />
                    </div>
                    <div className="guests-columns-right">
                        <div className="guest-title">
                            {this.props.isCreator() ?
                                'Answers'
                                :
                                'My answers'
                            }
                        </div>
                        <RegistrationResults
                            toggleAnswerModal={this.props.toggleAnswerModal}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(GuestContainer))