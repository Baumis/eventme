import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventDiscussion.css'
import MessageCard from './MessageCard/MessageCard'
import MessageTextArea from './MessageTextArea/MessageTextArea'

class EventDiscussion extends Component {

    delete = async (id) => {
        if (!this.props.EventStore.saved) {
            alert('Please save your event before deleting message.')
            return
        }

        const confirmation = window.confirm('Do you want to delete this message?')
        if (confirmation) {
            const event = await this.props.EventStore.deleteMessage(id)
            if (!event) {
                alert('The message could not be deleted right now.')
            }
        }
    }

    isAuthor = (id) => {
        if (!this.props.UserStore.currentUser) {
            return false
        }
        return this.props.isCreator() || this.props.UserStore.currentUser._id === id
    }

    render() {
        return (
            <div className="discussion-container">
                <MessageTextArea />
                <div className="discussion-messages">
                    {this.props.EventStore.event.discussion.length === 0 ?
                        <div className="no-messages">There are currently no messages</div> :
                        this.props.EventStore.event.discussion.map((message, i) =>
                            <MessageCard
                                key={i}
                                message={message}
                                isAuthor={this.isAuthor}
                                delete={this.delete}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(EventDiscussion))