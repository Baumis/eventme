import React, { Component } from 'react'
import './EventOptions.css'
import { FaTimes } from 'react-icons/fa'

class EventOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: ''
        }
    }

    changeStateValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className="event-options-modal-bg">
                <div className="event-options-modal">
                    <div className="event-options-top">
                        <div className="event-options-exit" onClick={() => this.props.hide()}>
                            <FaTimes />
                        </div>
                    </div>
                    <div className="event-options-input">
                        <p>{'Event name'}</p>
                        <input
                            name={'eventName'}
                            onChange={this.changeStateValue}
                            value={this.state.eventName}
                            placeholder={'my event'}
                        ></input>
                    </div>
                    <div className="event-options-button-row">
                        <div className="event-options-button">
                            {'Create'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventOptions