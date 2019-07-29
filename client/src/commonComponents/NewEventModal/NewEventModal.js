import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './NewEventModal.css'
import { FaTimes } from 'react-icons/fa'

class NewEventModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: ''
        }
    }

    changeStateValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    create = async () => {
        const event = await this.props.EventStore.create({ label: this.state.eventName })
        event ?
            this.props.history.push(`/events/${event._id}`)
            : alert('The event could not be created')
    }

    render() {
        return (
            <div className="event-options-modal-bg">
                <div className="event-options-surface">
                    <div className="event-options-content">
                        <div className="event-options-top">
                            <div className="event-options-exit" onClick={() => this.props.hide()}>
                                <FaTimes />
                            </div>
                        </div>
                        <div className="event-options-input">
                            <p>{'Event title'}</p>
                            <input
                                name={'eventName'}
                                onChange={this.changeStateValue}
                                value={this.state.eventName}
                                placeholder={'my event'}
                            ></input>
                        </div>
                        <div className="event-options-button-row">
                            <div onClick={() => this.create()} className="event-options-button">
                                {'Create'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore')(observer(NewEventModal)))