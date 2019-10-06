import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './MessageTextArea.css'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'

class MessageTextArea extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messageInput: '',
            sending: false
        }
    }

    post = async () => {
        if (this.state.messageInput.length < 1) {
            return
        }

        if (!this.props.EventStore.saved) {
            alert('Please save your event before posting message.')
            return
        }

        this.setState({ sending: true })
        const event = await this.props.EventStore.postMessage(this.state.messageInput)
        this.setState({ sending: false })

        if (!event) {
            alert('The post could not be sent.')
        } else {
            this.setState({ messageInput: '' })
        }
    }

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

    changeInputValue = (event) => {
        this.setState({ messageInput: event.target.value })
    }

    isAuthor = (id) => {
        if (!this.props.UserStore.currentUser) {
            return false
        }
        return this.props.isCreator() || this.props.UserStore.currentUser._id === id
    }

    render() {

        if (!this.props.UserStore.currentUser) {
            return null
        }

        return (
            <div className="text-area-container">
                <div className="text-area-input">
                    <textarea
                        onChange={this.changeInputValue}
                        value={this.state.messageInput}
                        placeholder={'your message'}
                    />
                </div>
                <div className="text-area-button-row">
                    <div className="text-area-send-button" onClick={() => this.post()}>
                        {this.state.sending ?
                            <Spinner />
                            :
                            <div>post</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(MessageTextArea))