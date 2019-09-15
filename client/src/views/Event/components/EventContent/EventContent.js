import React, { Component } from 'react'
import './EventContent.css'
import ComponentContainer from '../ComponentContainer/ComponentContainer'
import DiscussionContainer from '../DiscussionContainer/DiscussionContainer'
import GuestContainer from '../GuestContainer/GuestContainer'

class EventContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cathegories: {
                Event: ComponentContainer,
                Discussion: DiscussionContainer,
                Guests: GuestContainer,
            }
        }
    }

    render() {
        const Content = this.state.cathegories[this.props.activeTab]
        return (
            <div className="event-content">
                <Content isCreator={this.props.isCreator} />
            </div>
        )
    }
}

export default EventContent