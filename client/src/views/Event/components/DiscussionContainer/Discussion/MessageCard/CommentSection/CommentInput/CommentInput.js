import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './CommentInput.css'
import Spinner from '../../../../../../../../commonComponents/Spinner/Spinner'

class CommentInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commentInput: '',
            sending: false
        }
    }

    post = async () => {

        if (this.state.sending) {
            return
        }

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

    changeInputValue = (event) => {
        this.setState({ messageInput: event.target.value })
    }

    getAvatar = () => {
        if (!this.props.UserStore.currentUser.avatar) {
            return null
        }
        return { backgroundImage: `url(${this.props.UserStore.currentUser.avatar})` }
    }

    sendButtonClass = () => {
        let className = "comment-input-send-button"
        if (this.state.messageInput.length === 0) {
            className += " comment-input-send-button-disabled"
        }
        return className
    }

    render() {

        if (!this.props.UserStore.currentUser) {
            return null
        }

        return (
            <div className="comment-input-container">
                <div className="comment-input-avatar" style={this.getAvatar()}></div>
                <div className="comment-input-input">
                    <input
                        onChange={this.changeInputValue}
                        value={this.state.commentInput}
                        placeholder={'your message'}
                    />
                </div>
                <div className="comment-input-button-row">
                    <div className={this.sendButtonClass()} onClick={() => this.post()}>
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

export default inject('EventStore', 'UserStore')(observer(CommentInput))