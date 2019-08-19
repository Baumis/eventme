import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EventDiscussion.css'
import MessageCard from './MessageCard/MessageCard'
import Spinner from '../../../../commonComponents/Spinner/Spinner'

class EventDiscussion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messageInput: '',
            sending: false
        }
    }

    post = async () => {
        if(this.state.messageInput.length < 1){
            return
        }
        
        this.setState({ sending: true })
        const event = await this.props.EventStore.postMessage(this.state.messageInput)
        this.setState({ sending: false })

        if (!event) {
            alert('The post could not be sent.')
        } else{
            this.setState({messageInput: ''})
        }
    }

    changeInputValue = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    isAuthor = (id) => {
        return this.props.isCreator || this.props.UserStore.currentUser._id === id
    }

    render() {
        return (
            <div className="discussion-container">
                <div className="discussion-header">
                    <div className="discussion-header-title">
                        <h3>Discussion</h3>
                    </div>
                    <div className="discussion-input-row">
                        <input
                            name="messageInput"
                            onChange={this.changeInputValue}
                            value={this.state.messageInput}
                            placeholder={'your message'}
                        />
                        <div className="discussion-send-button" onClick={() => this.post()}>
                            {this.state.sending ?
                                <Spinner />
                                :
                                <div>post</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="discussion-content">
                    {this.props.EventStore.event.discussion.map(message =>
                        <MessageCard
                            message={message}
                            isAuthor={this.isAuthor(message.author._id)}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(EventDiscussion))