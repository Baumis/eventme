import React, { Component } from 'react'
import './DiscussionContainer.css'
import Discussion from '../contentTypes/Discussion/EventDiscussion'

class DiscussionContainer extends Component {

    render() {
        return (
            <div className="discussion-content">
                <Discussion isCreator={this.props.isCreator} />
            </div>
        )
    }
}

export default DiscussionContainer