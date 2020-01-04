import React, { Component } from 'react'
import './DiscussionContainer.css'
import Discussion from './Discussion/EventDiscussion'

class DiscussionContainer extends Component {

    render() {
        return (
            <div className="discussion-content">
                <div className="discussion-title">
                    Discussion
                </div>
                <Discussion isCreator={this.props.isCreator} />
            </div>
        )
    }
}

export default DiscussionContainer