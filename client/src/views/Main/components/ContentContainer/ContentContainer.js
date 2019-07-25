import React, { Component } from 'react'
import './ContentContainer.css'
import CreateButton from '../CreateButton/CreateButton'

class ContentContainer extends Component {

    render() {
        return (
            <div className="content-container">
                <div className="content-container-event-panel">
                    <h1>{'Let\'s create your event!'}</h1>
                    <p>{'Get things started by clicking the button below and use your creativity!'}</p>
                    <CreateButton click={this.props.click} />
                </div>
                <div className="content-container-event-panel">
                    <h1>{'What is EvenMe?'}</h1>
                    <p>{'Eventme is a great tool for creating homes for your events. Share your events and invite your friends!'}</p>
                </div>
            </div>
        )
    }
}

export default ContentContainer