import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GuestContainer.css'
import Guests from './Guests/Guests'
import RegistrationResults from './RegisterResults/RegisterResults'
import { FaCheck, FaEdit } from 'react-icons/fa'

class GuestContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: false,

        }
    }

    toggleEditable = () => {
        this.setState({ editable: !this.state.editable })
    }

    displayAnswerSection = () => {
        if (this.props.EventStore.event.registrationQuestions.length < 1) return false
        if (this.props.EventStore.event.publicAnswers) return true
        if (this.props.UserStore.currentUser && this.props.isGuest()) return true
        return false;
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
                    {this.displayAnswerSection() ?
                        <div className="guests-columns-right">
                            <div className="guest-title">
                                {this.props.EventStore.event.publicAnswers || this.props.isCreator() ?
                                    'Answers'
                                    :
                                    'My answers'
                                }
                                {this.props.isCreator() &&
                                <div className="quest-title-edit-questions" onClick={this.toggleEditable}>
                                    {this.state.editable ?
                                        <div className="guest-green-icon"><FaCheck /></div>
                                        :
                                        <FaEdit />
                                    }
                                </div>
                                }
                            </div>
                            <RegistrationResults
                                toggleAnswerModal={this.props.toggleAnswerModal}
                                editable={this.state.editable}
                            />
                        </div>
                    :null}
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(GuestContainer))